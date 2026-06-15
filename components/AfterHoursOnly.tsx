'use client'
import { ReactNode } from 'react'
import { useAfterHours } from '@/lib/useAfterHours'

export default function AfterHoursOnly({ children }: { children: ReactNode }) {
  const afterHours = useAfterHours()

  return afterHours ? <>{children}</> : null
}
