'use client'
import { useEffect, useState } from 'react'
import { getContactMode, type ContactMode } from '@/lib/contactMode'

/**
 * The current contact mode, or null until the component has mounted.
 *
 * Every page here is prerendered at build time, so the clock can only be read
 * in the browser — reading it during the render would freeze whichever mode
 * happened to be true when the build ran. Callers render their buttons hidden
 * while this is null so the layout does not jump once the answer arrives.
 *
 * Re-checked every minute, so the buttons swap at 9 AM and 5 PM on a page that
 * has been left open.
 */
export function useContactMode(): ContactMode | null {
  const [mode, setMode] = useState<ContactMode | null>(null)

  useEffect(() => {
    const check = () => setMode(getContactMode())
    check()
    const id = setInterval(check, 60_000)
    return () => clearInterval(id)
  }, [])

  return mode
}
