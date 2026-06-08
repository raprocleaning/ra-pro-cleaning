'use client'
import { useState, useEffect } from 'react'

/**
 * Returns true when the current Mountain Time (America/Denver, DST-aware) is
 * outside business hours of 9 AM – 5 PM. Used to hide "Book Now" CTAs during
 * the day so customers call the office instead, and show them after hours.
 *
 * SSR-safe: defaults to false so server-rendered HTML matches initial client
 * render; the effect then reveals true on mount if currently after-hours.
 */
export function useAfterHours(): boolean {
  const [afterHours, setAfterHours] = useState(false)

  useEffect(() => {
    const check = () => {
      const denverHourStr = new Date().toLocaleString('en-US', {
        timeZone: 'America/Denver',
        hour: '2-digit',
        hour12: false,
      })
      const hour = parseInt(denverHourStr, 10)
      setAfterHours(hour < 9 || hour >= 17)
    }
    check()
    const interval = setInterval(check, 60_000)
    return () => clearInterval(interval)
  }, [])

  return afterHours
}
