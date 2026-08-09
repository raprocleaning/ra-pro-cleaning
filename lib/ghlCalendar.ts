/**
 * Creates the booking on a GoHighLevel calendar so online bookings show up in
 * Calendar view, not just as a contact note.
 *
 * Calendars are found by name through the GHL API, so no IDs need to be copied
 * out of the dashboard and pasted into configuration. An environment variable
 * still wins when set, which covers renamed or duplicate calendars.
 *
 * If no calendar can be matched for a service, appointment creation is skipped
 * and the booking still lands as a contact — a lookup problem degrades the
 * experience instead of losing the job.
 */

const GHL_API = 'https://services.leadconnectorhq.com'

/** Env var holding an explicit calendar ID override for each service. */
const CALENDAR_ENV: Record<string, string> = {
  'Standard Cleaning':          'GHL_CALENDAR_ID_STANDARD',
  'Deep Cleaning':              'GHL_CALENDAR_ID_DEEP',
  'Move In/Out Cleaning':       'GHL_CALENDAR_ID_MOVE',
  'Airbnb Cleaning':            'GHL_CALENDAR_ID_AIRBNB',
  'Post-Construction Cleaning': 'GHL_CALENDAR_ID_POSTCONSTRUCTION',
}

/**
 * Calendar names to look for, most specific first. The dashboard names them a
 * little differently from the services on the site ("Standard Clean" versus
 * "Standard Cleaning"), so each service lists the spellings it accepts.
 */
const CALENDAR_NAMES: Record<string, string[]> = {
  'Standard Cleaning':    ['standard clean', 'standard cleaning', 'standard'],
  'Deep Cleaning':        ['deep cleaning', 'deep clean', 'deep'],
  'Move In/Out Cleaning': ['move in/out cleaning', 'move in/out', 'move in out', 'movein/out', 'move'],
  'Airbnb Cleaning':      ['airbnb / short-term rental', 'airbnb/short-term rental', 'airbnb', 'short-term rental'],
  'Post-Construction Cleaning': ['post-construction clean', 'post construction clean', 'post-construction', 'post construction'],
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

/** Explicit override from configuration, if one is set for this service. */
export function calendarIdFor(service: string): string | undefined {
  const key = CALENDAR_ENV[service]
  return (key ? process.env[key] : undefined) || process.env.GHL_CALENDAR_ID || undefined
}

type CalendarSummary = { id: string; name: string }

// Calendars change rarely; re-read occasionally so a rename or a newly created
// calendar is picked up without a redeploy.
const CACHE_MS = 10 * 60 * 1000
let cache: { at: number; calendars: CalendarSummary[] } | null = null

async function listCalendars(apiKey: string, locationId: string): Promise<CalendarSummary[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.calendars

  const res = await fetch(`${GHL_API}/calendars/?locationId=${encodeURIComponent(locationId)}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Version': '2021-04-15',
      'Accept': 'application/json',
    },
  })
  if (!res.ok) throw new Error(`GHL calendar list failed (${res.status}): ${await res.text()}`)

  const data = await res.json().catch(() => ({}))
  const calendars: CalendarSummary[] = (data?.calendars ?? [])
    .filter((c: { id?: string; name?: string }) => c?.id && c?.name)
    .map((c: { id: string; name: string }) => ({ id: c.id, name: c.name }))

  cache = { at: Date.now(), calendars }
  return calendars
}

/** Pick the calendar whose name best matches the service. */
export function matchCalendar(service: string, calendars: CalendarSummary[]): CalendarSummary | undefined {
  const aliases = CALENDAR_NAMES[service]
  if (!aliases) return undefined

  for (const alias of aliases) {
    const target = norm(alias)
    const exact = calendars.find((c) => norm(c.name) === target)
    if (exact) return exact
    const partial = calendars.find((c) => norm(c.name).includes(target))
    if (partial) return partial
  }
  return undefined
}

/** Configured override first, otherwise look the calendar up by name. */
export async function resolveCalendarId(
  apiKey: string,
  locationId: string,
  service: string
): Promise<{ id: string } | { error: string }> {
  const override = calendarIdFor(service)
  if (override) return { id: override }

  try {
    const calendars = await listCalendars(apiKey, locationId)
    const match = matchCalendar(service, calendars)
    if (!match) {
      const names = calendars.map((c) => c.name).join(', ') || 'none returned'
      return { error: `No calendar matched "${service}". Calendars found: ${names}` }
    }
    return { id: match.id }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Calendar lookup failed' }
  }
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
  const resolved = await resolveCalendarId(opts.apiKey, opts.locationId, opts.service)
  if ('error' in resolved) return { created: false, reason: resolved.error }
  const calendarId = resolved.id

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
