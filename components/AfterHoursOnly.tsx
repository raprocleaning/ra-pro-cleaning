'use client'
import { ReactNode } from 'react'
import { useAfterHours } from '@/lib/useAfterHours'

/**
 * Renders children only when the current Mountain Time is outside business
 * hours (9 AM – 5 PM, America/Denver). Used to hide "Book Now" CTAs during
 * the work day so customers call the office instead.
 */
export default function AfterHoursOnly({ children }: { children: ReactNode }) {
  const afterHours = useAfterHours()
  if (!afterHours) return null
  return <>{children}</>
}
