/**
 * Catches bot submissions before they reach the CRM, the office inbox or a
 * customer confirmation email.
 *
 * The bots hitting the site fill every box with random letters ("Stmdeocy",
 * square footage "cxrwxjfhQjamoOwLs", notes "dSHfQiZRBLPfqBnO"), use an
 * out-of-state zip and a Gmail address with a dot between every letter. Each
 * check below targets one of those habits. A lead is dropped only on one strong
 * sign or two weak ones, so a real customer who mistypes one field still gets
 * through.
 */

/** The hidden field name. Real visitors never see it; bots fill every input. */
export const HONEYPOT_FIELD = 'company_website'

type SpamInput = Record<string, unknown>

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

/**
 * One run of letters with random capitals in the middle: "cxrwxjfhQjamoOwLs".
 * Real words and names have at most one such capital ("McKinley", "iPhone").
 */
export function isGibberish(value: string): boolean {
  if (!/^[A-Za-z]{8,}$/.test(value)) return false
  const midCaps = value.slice(1).match(/[a-z][A-Z]/g)?.length ?? 0
  return midCaps >= 2
}

/** "o.li.v.e.r.asht.o.n.20@gmail.com" — dots scattered through a Gmail name. */
export function isDottedEmail(email: string): boolean {
  const [local, domain] = email.toLowerCase().split('@')
  if (!local || !domain || !/(^|\.)(gmail|googlemail)\.com$/.test(domain)) return false
  const parts = local.split('.')
  if (parts.length < 4) return false
  const short = parts.filter((p) => p.length <= 2).length
  return short / parts.length >= 0.5
}

export type SpamVerdict = { spam: boolean; reasons: string[] }

export function checkSpam(body: SpamInput): SpamVerdict {
  const strong: string[] = []
  const weak: string[] = []

  if (str(body[HONEYPOT_FIELD])) strong.push('hidden field filled')

  const freeText: [string, unknown][] = [
    ['name', body.fullName],
    ['square footage', body.squareFootage],
    ['sqft', body.sqft],
    ['notes', body.message],
    ['zip', body.zipCode],
    ['address', body.address],
  ]
  for (const [label, value] of freeText) {
    if (isGibberish(str(value))) strong.push(`random letters in ${label}`)
  }

  const sqftText = str(body.squareFootage) || (typeof body.sqft === 'string' ? str(body.sqft) : '')
  if (sqftText && !/\d/.test(sqftText)) weak.push('square footage has no number')

  const zip = str(body.zipCode)
  if (zip && !/^8[01]\d{3}(-\d{4})?$/.test(zip)) weak.push(`zip ${zip} is outside Colorado`)

  if (isDottedEmail(str(body.email))) weak.push('dotted Gmail address')

  const reasons = [...strong, ...weak]
  return { spam: strong.length > 0 || weak.length >= 2, reasons }
}
