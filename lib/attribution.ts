/**
 * Where a lead actually came from.
 *
 * GA4 already reports traffic by channel, but that lives in a dashboard nobody
 * opens and it cannot tell you that *this* booking, the one in the inbox right
 * now, came from the Google Business Profile. So the campaign tags are captured
 * when a visitor first lands and travel with them to whichever form they
 * eventually submit.
 *
 * Two details matter:
 *
 *  - It is captured on the FIRST page of the visit and then left alone. A
 *    visitor who lands on /areas/denver from the Business Profile and clicks
 *    through to /book must still be credited to the Business Profile, so a
 *    later same-site page view never overwrites what is already stored.
 *  - It lives in sessionStorage, not a cookie. Nothing is sent anywhere until
 *    the visitor submits a form themselves, and it is gone when the tab closes.
 */

const KEY = 'rapro_attribution'

export type Attribution = {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  /** Google Ads / Local Services click id, when present. */
  gclid?: string
  /** Where they came from, when the browser tells us. */
  referrer?: string
  /** The first page of the visit. */
  landingPage?: string
  /** ISO timestamp of first arrival. */
  firstSeen?: string
}

function safeSession(): Storage | null {
  try {
    const s = window.sessionStorage
    // Private-mode Safari hands back a Storage that throws on write.
    s.setItem('__t', '1')
    s.removeItem('__t')
    return s
  } catch {
    return null
  }
}

/**
 * Records the campaign tags for this visit, once. Safe to call on every page
 * view — after the first it is a no-op.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  const store = safeSession()
  if (!store) return
  if (store.getItem(KEY)) return // first touch wins

  const params = new URLSearchParams(window.location.search)
  const referrer = document.referrer || ''
  const sameSite = referrer.startsWith(window.location.origin)

  const data: Attribution = {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
    term: params.get('utm_term') || undefined,
    content: params.get('utm_content') || undefined,
    gclid: params.get('gclid') || undefined,
    referrer: referrer && !sameSite ? referrer : undefined,
    landingPage: window.location.pathname || undefined,
    firstSeen: new Date().toISOString(),
  }

  try {
    store.setItem(KEY, JSON.stringify(data))
  } catch {
    // Out of quota or blocked — the lead still submits, just without a channel.
  }
}

/** What was captured at the start of this visit, if anything. */
export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  const store = safeSession()
  if (!store) return null
  try {
    const raw = store.getItem(KEY)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
  }
}

/**
 * A short human label for the office, e.g. "Google Business Profile" or
 * "google / organic". This is what lands in the lead email, so it is written
 * for somebody reading their inbox, not for a report.
 */
export function describeAttribution(a: Attribution | null | undefined): string {
  if (!a) return ''

  if (a.source || a.medium) {
    const parts = [a.source, a.medium].filter(Boolean).join(' / ')
    return a.campaign ? `${parts} — ${a.campaign}` : parts
  }
  if (a.gclid) return 'Google Ads (click id)'

  if (a.referrer) {
    try {
      const host = new URL(a.referrer).hostname.replace(/^www\./, '')
      return `Referred by ${host}`
    } catch {
      return 'Referred'
    }
  }
  return 'Direct or untagged'
}
