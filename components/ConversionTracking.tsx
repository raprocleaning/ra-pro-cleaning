'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent, trackLead, trackPageView } from '@/lib/analytics'

export default function ConversionTracking() {
  const pathname = usePathname()
  const isLandingRender = useRef(true)

  useEffect(() => {
    // The landing PageView is sent by the pixel snippet itself, so only
    // navigations away from the entry page are counted here.
    if (isLandingRender.current) {
      isLandingRender.current = false
    } else {
      trackPageView()
    }

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
      } else if (href.includes('leadconnectorhq.com') || href.includes('bookingkoala.com')) {
        trackEvent('booking_click', { destination: href })
        trackLead('booking_click')
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
