/**
 * Remembers how a visitor reached the site, so a booking can say which ad,
 * post or search produced it.
 *
 * Without this every lead in the CRM reads "Online Booking Form" and money
 * spent on ads cannot be told apart from a free Maps listing. The details are
 * captured on the first page a visitor lands on and kept for the rest of the
 * session — a customer usually reads a few pages before booking, and by then
 * the original link is long gone from the address bar.
 */

const STORAGE_KEY = 'ra-campaign'

export type Campaign = {
  /** google, instagram, nextdoor, a UTM value, or 'direct'. */
  source: string
  /** cpc, organic, social, email… */
  medium?: string
  campaign?: string
  content?: string
  term?: string
  /** Google or Meta click id, when the visit came from an ad. */
  clickId?: string
  /** The page they arrived on — tells a service ad from a homepage ad. */
  landingPage?: string
  referrer?: string
}

/** Sites we can name on sight, so the CRM does not fill up with hostnames. */
const KNOWN_REFERRERS: Array<[RegExp, string, string]> = [
  [/(^|\.)google\./,     'google',    'organic'],
  [/(^|\.)bing\./,       'bing',      'organic'],
  [/duckduckgo\./,       'duckduckgo','organic'],
  [/(^|\.)yahoo\./,      'yahoo',     'organic'],
  [/instagram\./,        'instagram', 'social'],
  [/(facebook\.|fb\.me)/,'facebook',  'social'],
  [/nextdoor\./,         'nextdoor',  'social'],
  [/yelp\./,             'yelp',      'referral'],
  [/thumbtack\./,        'thumbtack', 'referral'],
  [/angi\.|angieslist\./,'angi',      'referral'],
]

const clean = (value: string | null): string | undefined => {
  const trimmed = (value ?? '').trim()
  // Long enough for a real campaign name, short enough to stay readable in a
  // CRM field, and never long enough to be worth passing on unbounded.
  return trimmed ? trimmed.slice(0, 80) : undefined
}

/** What the current URL and referrer say about this visit. */
function readFromPage(): Campaign {
  const params = new URLSearchParams(window.location.search)

  const utmSource = clean(params.get('utm_source'))
  const clickId = clean(params.get('gclid')) || clean(params.get('fbclid')) || clean(params.get('msclkid'))

  let source = utmSource
  let medium = clean(params.get('utm_medium'))

  if (!source && clickId) {
    // An ad click with no tagging still says which network sent it.
    source = params.get('gclid') ? 'google' : params.get('msclkid') ? 'bing' : 'facebook'
    medium = medium || 'cpc'
  }

  const referrer = document.referrer || ''
  if (!source && referrer) {
    try {
      const host = new URL(referrer).hostname
      if (host && host !== window.location.hostname) {
        const known = KNOWN_REFERRERS.find(([pattern]) => pattern.test(host))
        source = known ? known[1] : host.replace(/^www\./, '')
        medium = medium || (known ? known[2] : 'referral')
      }
    } catch {
      // A malformed referrer is not worth failing a page load over.
    }
  }

  return {
    source: source || 'direct',
    medium,
    campaign: clean(params.get('utm_campaign')),
    content: clean(params.get('utm_content')),
    term: clean(params.get('utm_term')),
    clickId,
    landingPage: window.location.pathname,
    referrer: referrer ? referrer.slice(0, 200) : undefined,
  }
}

/**
 * Records the visit if this is the first page of the session. First touch
 * wins: someone who arrives from an ad and later returns from a bookmark
 * should still be credited to the ad that paid for them.
 */
export function captureCampaign(): void {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      const previous: Campaign = JSON.parse(stored)
      // A direct hit placeholder gives way to anything more specific.
      if (previous.source !== 'direct') return
    }
    const current = readFromPage()
    if (stored && current.source === 'direct') return
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    // Private browsing blocks sessionStorage. Attribution is a nice-to-have;
    // the booking is not.
  }
}

/** The stored visit, for a form about to be submitted. */
export function getCampaign(): Campaign | undefined {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
    return readFromPage()
  } catch {
    return undefined
  }
}

/** "google / cpc / summer-deep-clean" — one line for a CRM field or an email. */
export function describeCampaign(c?: Campaign | null): string {
  if (!c) return ''
  return [c.source, c.medium, c.campaign].filter(Boolean).join(' / ')
}
