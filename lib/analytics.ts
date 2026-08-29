'use client'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

const AREA_NAMES: Record<string, string> = {
  aurora: 'Aurora',
  denver: 'Denver',
  lakewood: 'Lakewood',
  englewood: 'Englewood',
  littleton: 'Littleton',
  centennial: 'Centennial',
  'greenwood-village': 'Greenwood Village',
  arvada: 'Arvada',
  westminster: 'Westminster',
  thornton: 'Thornton',
}

/**
 * GA4 event name → Meta standard event.
 *
 * Only events Meta can actually optimize ad delivery against are mapped. Every
 * other GA4 event stays GA4-only rather than becoming a custom Meta event that
 * nobody reports on.
 *
 * `Lead` covers every enquiry (it rides on `generate_lead`, which `trackLead`
 * fires for all of them). `Schedule` fires additionally on a completed online
 * booking, so once there is enough volume the ads can optimize for booked jobs
 * rather than for enquiries.
 */
const META_EVENTS: Record<string, string> = {
  generate_lead: 'Lead',
  booking_submitted: 'Schedule',
  phone_call_click: 'Contact',
}

export function getAreaContext() {
  const pagePath = window.location.pathname
  const areaSlug = pagePath.match(/^\/areas\/([^/]+)/)?.[1]

  return {
    page_area: areaSlug ? AREA_NAMES[areaSlug] || areaSlug : 'Denver Metro',
    page_path: pagePath,
  }
}

/**
 * Meta only reads a handful of parameter names, and it ignores `value` unless
 * `currency` comes with it — so the GA4 payload is translated rather than
 * forwarded wholesale.
 */
function toMetaParams(params: EventParams) {
  const metaParams: Record<string, string | number> = {}

  if (typeof params.value === 'number' && Number.isFinite(params.value)) {
    metaParams.value = params.value
    metaParams.currency = 'USD'
  }
  if (typeof params.service === 'string') {
    metaParams.content_name = params.service
  }

  return metaParams
}

export function trackEvent(name: string, params: EventParams = {}) {
  const payload = { ...getAreaContext(), ...params }

  window.gtag?.('event', name, payload)

  const metaEvent = META_EVENTS[name]
  if (metaEvent) {
    window.fbq?.('track', metaEvent, toMetaParams(payload))
  }
}

export function trackLead(method: string, params: EventParams = {}) {
  trackEvent('generate_lead', { method, ...params })
}

/**
 * Sends a Meta PageView for a client-side navigation. The pixel counts one
 * PageView per script load, so without this Meta records a single page per
 * visit however far someone browses. The landing PageView comes from the pixel
 * snippet in the root layout, not from here. GA4 needs no equivalent — enhanced
 * measurement already tracks route changes.
 */
export function trackPageView() {
  window.fbq?.('track', 'PageView')
}
