'use client'

import { useEffect } from 'react'
import { trackEvent, trackLead } from '@/lib/analytics'
import { BOOKING_DRAFT_KEY } from '@/lib/deposit'

/**
 * Counts the booking as a conversion — once — and clears the saved form.
 *
 * With card payment the customer leaves the site to pay, so this page, not the
 * form's submit button, is where a booking is really complete. The events keep
 * the names the form always used so existing GA4 conversions carry on.
 */
export default function ConfirmedTracker({
  sessionId, service, value,
}: { sessionId: string; service: string; value: number }) {
  useEffect(() => {
    const key = `rapro_paid_${sessionId}`
    let counted = false
    try {
      counted = !!window.sessionStorage.getItem(key)
    } catch {
      // Storage blocked: count it rather than lose the conversion.
    }

    if (!counted) {
      trackEvent('booking_submitted', { service, value })
      trackLead('booking-form', { service, value })
    }

    try {
      window.sessionStorage.setItem(key, '1')
      window.sessionStorage.removeItem(BOOKING_DRAFT_KEY)
    } catch {
      // Nothing to clear if storage is unavailable.
    }
  }, [sessionId, service, value])

  return null
}
