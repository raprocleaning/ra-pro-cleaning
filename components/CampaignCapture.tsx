'use client'

import { useEffect } from 'react'
import { captureCampaign } from '@/lib/campaign'

/**
 * Records how the visitor arrived, once per session, as early as the page
 * mounts — before they navigate away from the link that brought them.
 */
export default function CampaignCapture() {
  useEffect(() => {
    captureCampaign()
  }, [])

  return null
}
