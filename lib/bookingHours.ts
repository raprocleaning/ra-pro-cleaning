/**
 * Online booking is only open overnight, while nobody is at the phone.
 * During the day customers are sent to call or text instead.
 */
export const BOOKING_TIME_ZONE = 'America/Denver'
/** Hour (0–23, Denver time) online booking opens each evening. */
export const BOOKING_OPENS_HOUR = 18
/** Hour (0–23, Denver time) online booking closes each morning. */
export const BOOKING_CLOSES_HOUR = 8

function denverHour(now: Date): number {
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone: BOOKING_TIME_ZONE,
    hour: 'numeric',
    hourCycle: 'h23',
  }).format(now)
  return Number(hour)
}

/** True from 6 PM until 8 AM Denver time. */
export function isOnlineBookingOpen(now: Date = new Date()): boolean {
  const hour = denverHour(now)
  return hour >= BOOKING_OPENS_HOUR || hour < BOOKING_CLOSES_HOUR
}
