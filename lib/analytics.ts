'use client'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  window.gtag?.('event', name, params)
}

export function trackLead(method: string, params: EventParams = {}) {
  trackEvent('generate_lead', { method, ...params })
}
