'use client'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const AREA_NAMES: Record<string, string> = {
  'cherry-creek': 'Cherry Creek',
  glendale: 'Glendale',
  downtown: 'Downtown Denver',
}

export function getAreaContext() {
  const pagePath = window.location.pathname
  const areaSlug = pagePath.match(/^\/areas\/([^/]+)/)?.[1]

  return {
    page_area: areaSlug ? AREA_NAMES[areaSlug] || areaSlug : 'Central Denver',
    page_path: pagePath,
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  window.gtag?.('event', name, { ...getAreaContext(), ...params })
}

export function trackLead(method: string, params: EventParams = {}) {
  trackEvent('generate_lead', { method, ...params })
}
