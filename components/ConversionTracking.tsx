'use client'

import { useEffect } from 'react'
import { trackEvent, trackLead } from '@/lib/analytics'

export default function ConversionTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const link = target?.closest('a')
      if (!link) return

      const href = link.getAttribute('href') || ''
      if (href.startsWith('tel:')) {
        trackEvent('phone_call_click', { phone_number: '720-677-8799' })
        trackLead('phone_call')
      } else if (href.includes('bookingkoala.com')) {
        trackEvent('booking_click', { destination: href })
        trackLead('booking_click')
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
