'use client'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
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

export function getAreaContext() {
  const pagePath = window.location.pathname
  const areaSlug = pagePath.match(/^\/areas\/([^/]+)/)?.[1]

  return {
    page_area: areaSlug ? AREA_NAMES[areaSlug] || areaSlug : 'Denver Metro',
    page_path: pagePath,
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  window.gtag?.('event', name, { ...getAreaContext(), ...params })
}

export function trackLead(method: string, params: EventParams = {}) {
  trackEvent('generate_lead', { method, ...params })
}
