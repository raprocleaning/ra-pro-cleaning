'use client'

import { useEffect, useState } from 'react'

const TIME_ZONE = 'America/Denver'

function isAfterHours(date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)

  const weekday = parts.find((part) => part.type === 'weekday')?.value
  const hour = Number(parts.find((part) => part.type === 'hour')?.value)
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
