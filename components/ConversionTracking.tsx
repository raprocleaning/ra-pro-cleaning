'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent, trackLead } from '@/lib/analytics'

export default function ConversionTracking() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/areas/')) {
      trackEvent('service_area_page_view')
    }
  }, [pathname])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const areaCard = target?.closest<HTMLElement>('[data-service-area]')
      const link = target?.closest('a')

      if (areaCard) {
        trackEvent('service_area_interest', {
          selected_area: areaCard.dataset.serviceArea,
        })
      }

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
