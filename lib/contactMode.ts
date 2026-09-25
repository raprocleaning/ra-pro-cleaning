/**
 * Which way we ask visitors to reach us, by time of day.
 *
 * Between 9 AM and 5 PM Denver time someone is at the phone, so the site leads
 * with calling and does not offer self-serve booking — a booking that lands
 * mid-day competes with the schedule the office is already building by hand.
 *
 * Outside those hours nobody picks up, so a call button would only produce
 * voicemail. The site offers texting and online booking instead, both of which
 * survive until morning.
 */

export const CONTACT_TIME_ZONE = 'America/Denver'

/** Hour (0–23, Denver time) the phone starts being answered. */
export const PHONE_OPENS_HOUR = 9
/** Hour (0–23, Denver time) the phone stops being answered. */
export const PHONE_CLOSES_HOUR = 17

/**
 * `phone` — call and text, no online booking (09:00–16:59).
 * `booking` — text and online booking, no call (17:00–08:59).
 */
export type ContactMode = 'phone' | 'booking'

function denverHour(now: Date): number {
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone: CONTACT_TIME_ZONE,
    hour: 'numeric',
    hourCycle: 'h23',
  }).format(now)
  return Number(hour)
}

export function getContactMode(now: Date = new Date()): ContactMode {
  const hour = denverHour(now)
  return hour >= PHONE_OPENS_HOUR && hour < PHONE_CLOSES_HOUR ? 'phone' : 'booking'
}

/** True whenever the booking form should be reachable — every hour outside 9–5. */
export function isOnlineBookingOpen(now: Date = new Date()): boolean {
  return getContactMode(now) === 'booking'
}
