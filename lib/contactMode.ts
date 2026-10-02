/**
 * Which way we ask visitors to reach us, by time of day.
 *
 * Between 9 AM and 5 PM Denver time someone is at the phone, so the on-page
 * buttons lead with calling.
 *
 * Outside those hours nobody picks up, so a call button would only produce
 * voicemail. The buttons lead with Book Now instead, and texting survives until
 * morning.
 *
 * This only decides which button leads. Online booking itself (/book) is open
 * at every hour, and the menu's Book Now button is always there.
 */

export const CONTACT_TIME_ZONE = 'America/Denver'

/** Hour (0–23, Denver time) the phone starts being answered. */
export const PHONE_OPENS_HOUR = 9
/** Hour (0–23, Denver time) the phone stops being answered. */
export const PHONE_CLOSES_HOUR = 17

/**
 * `phone` — call and text lead (09:00–16:59).
 * `booking` — text and Book Now lead, no call (17:00–08:59).
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
