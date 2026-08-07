'use client'

import { useEffect, useState } from 'react'

const TIME_ZONE = 'America/Denver'

// TEMPORARY: extend the booking CTA's visible window to 9am-9pm on 2026-08-07 only.
// Safe to remove after that date — isAfterHours() falls back to normal logic automatically.
const EXTENDED_WINDOW_DATE = '2026-08-07'
const EXTENDED_WINDOW_START_HOUR = 9
const EXTENDED_WINDOW_END_HOUR = 21

function isAfterHours(date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)

  const weekday = parts.find((part) => part.type === 'weekday')?.value
  const hour = Number(parts.find((part) => part.type === 'hour')?.value)
  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value
  const isoDate = `${year}-${month}-${day}`

  if (
    isoDate === EXTENDED_WINDOW_DATE &&
    hour >= EXTENDED_WINDOW_START_HOUR &&
    hour < EXTENDED_WINDOW_END_HOUR
  ) {
    return true
  }

  const isWeekend = weekday === 'Sat' || weekday === 'Sun'

  return isWeekend || hour < 9 || hour >= 17
}

export function useAfterHours(): boolean {
  const [afterHours, setAfterHours] = useState(false)

  useEffect(() => {
    const updateSchedule = () => setAfterHours(isAfterHours())
    updateSchedule()

    const interval = window.setInterval(updateSchedule, 60_000)
    return () => window.clearInterval(interval)
  }, [])

  return afterHours
}
