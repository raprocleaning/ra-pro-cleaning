/**
 * Creates the booking on a GoHighLevel calendar so online bookings show up in
 * Calendar view, not just as a contact note.
 *
 * Each service maps to its own calendar via an environment variable. If the
 * calendar for a service is not configured, appointment creation is skipped —
 * the booking still lands as a contact, so a missing variable degrades the
 * experience instead of losing the job.
 */

const GHL_API = 'https://services.leadconnectorhq.com'

/** Env var holding the calendar ID for each service. */
const CALENDAR_ENV: Record<string, string> = {
  'Standard Cleaning':          'GHL_CALENDAR_ID_STANDARD',
  'Deep Cleaning':              'GHL_CALENDAR_ID_DEEP',
  'Move In/Out Cleaning':       'GHL_CALENDAR_ID_MOVE',
  'Airbnb Cleaning':            'GHL_CALENDAR_ID_AIRBNB',
  'Post-Construction Cleaning': 'GHL_CALENDAR_ID_POSTCONSTRUCTION',
}

export function calendarIdFor(service: string): string | undefined {
  const key = CALENDAR_ENV[service]
  return (key ? process.env[key] : undefined) || process.env.GHL_CALENDAR_ID || undefined
}

/**
 * UTC offset for the business timezone on a given calendar date, e.g. "-06:00".
 * Derived per-date so bookings either side of a DST change stay correct.
 */
function zoneOffset(date: string, timeZone: string): string {
  const noonUTC = new Date(`${date}T12:00:00Z`)
  const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
    .formatToParts(noonUTC)
    .find((p) => p.type === 'timeZoneName')?.value
  // Intl renders UTC itself as plain "GMT" with no offset.
  const offset = name?.replace('GMT', '') ?? ''
  return offset || '+00:00'
}

/** "1:00 PM" → { hour: 13, minute: 0 } */
function parse12Hour(time: string): { hour: number; minute: number } | null {
  const m = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!m) return null
  let hour = parseInt(m[1], 10)
  const minute = parseInt(m[2], 10)
  const meridiem = m[3].toUpperCase()
  if (hour < 1 || hour > 12 || minute > 59) return null
  if (meridiem === 'PM' && hour !== 12) hour += 12
  if (meridiem === 'AM' && hour === 12) hour = 0
  return { hour, minute }
}

/**
 * Build ISO start/end timestamps anchored to the business timezone.
 * Returns null if the date or time is missing or unparseable.
 */
export function toAppointmentWindow(
  date: string,
  time: string,
  durationHours = 3,
  timeZone = process.env.GHL_TIMEZONE || 'America/Denver'
): { startTime: string; endTime: string } | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? '')) return null
  const parsed = parse12Hour(time ?? '')
  if (!parsed) return null

  const offset = zoneOffset(date, timeZone)
  const pad = (n: number) => String(n).padStart(2, '0')
  const startTime = `${date}T${pad(parsed.hour)}:${pad(parsed.minute)}:00${offset}`

  const end = new Date(new Date(startTime).getTime() + durationHours * 3600_000)
  if (isNaN(end.getTime())) return null

  return { startTime, endTime: end.toISOString() }
}

export type AppointmentResult =
  | { created: true; appointmentId?: string }
  | { created: false; reason: string }

export async function createAppointment(opts: {
  apiKey: string
  locationId: string
  contactId: string
  service: string
  date: string
  time: string
  title: string
}): Promise<AppointmentResult> {
  const calendarId = calendarIdFor(opts.service)
  if (!calendarId) {
    return { created: false, reason: `No calendar configured for "${opts.service}"` }
  }

  const window = toAppointmentWindow(opts.date, opts.time)
  if (!window) {
    return { created: false, reason: `Could not read date/time "${opts.date} ${opts.time}"` }
  }

  try {
    const res = await fetch(`${GHL_API}/calendars/events/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${opts.apiKey}`,
        'Version': '2021-04-15',
      },
      body: JSON.stringify({
        calendarId,
        locationId: opts.locationId,
        contactId: opts.contactId,
        startTime: window.startTime,
        endTime: window.endTime,
        title: opts.title,
        appointmentStatus: 'confirmed',
        // The customer picked a window on our own form, so GHL's slot rules
        // should not reject it.
        ignoreFreeSlotValidation: true,
      }),
    })

    if (!res.ok) {
      return { created: false, reason: `GHL appointment failed (${res.status}): ${await res.text()}` }
    }

    const data = await res.json().catch(() => ({}))
    return { created: true, appointmentId: data?.id ?? data?.appointment?.id }
  } catch (err) {
    return { created: false, reason: err instanceof Error ? err.message : 'Unknown error' }
  }
}
