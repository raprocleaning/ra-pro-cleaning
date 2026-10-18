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

/**
 * `assignedUserId` carries the team member the appointment belongs to. GoHighLevel
 * rejects an appointment without one on calendars that have staff assigned, so
 * the calendar's own team members are captured here to fill it in.
 */
type CalendarSummary = { id: string; name: string; teamMemberIds: string[] }

// Calendars change rarely; re-read occasionally so a rename or a newly created
// calendar is picked up without a redeploy. The request itself is cached, not
// just its answer, so it can be started early (see warmCalendars) and shared by
// whoever asks while it is still in flight.
const CACHE_MS = 10 * 60 * 1000
let cache: { at: number; calendars: Promise<CalendarSummary[]> } | null = null

async function fetchCalendars(apiKey: string, locationId: string): Promise<CalendarSummary[]> {
  const res = await fetch(`${GHL_API}/calendars/?locationId=${encodeURIComponent(locationId)}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Version': '2021-04-15',
      'Accept': 'application/json',
    },
  })
  if (!res.ok) throw new Error(`GHL calendar list failed (${res.status}): ${await res.text()}`)

  const data = await res.json().catch(() => ({}))
  return (data?.calendars ?? [])
    .filter((c: { id?: string; name?: string }) => c?.id && c?.name)
    .map((c: { id: string; name: string; teamMembers?: { userId?: string }[] }) => ({
      id: c.id,
      name: c.name,
      teamMemberIds: (c.teamMembers ?? []).map((m) => m?.userId).filter((id): id is string => !!id),
    }))
}

function listCalendars(apiKey: string, locationId: string): Promise<CalendarSummary[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.calendars

  const calendars = fetchCalendars(apiKey, locationId)
  const entry = { at: Date.now(), calendars }
  cache = entry
  // A failed read is not worth remembering: the next booking should try again.
  calendars.catch(() => { if (cache === entry) cache = null })
  return calendars
}

/**
 * Start reading the calendar list without waiting for it, so it is already in
 * hand when createAppointment needs it. Never throws; createAppointment reports
 * a failed read itself.
 */
export function warmCalendars(apiKey: string, locationId: string): void {
  listCalendars(apiKey, locationId).catch(() => {})
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
): Promise<{ id: string; assignedUserId?: string; teamMemberIds: string[] } | { error: string }> {
  const envUser = process.env.GHL_ASSIGNED_USER_ID || undefined
  const override = calendarIdFor(service)

  try {
    const calendars = await listCalendars(apiKey, locationId)

    // With an override we still look the calendar up, to borrow its team member.
    const match = override
      ? calendars.find((c) => c.id === override)
      : matchCalendar(service, calendars)

    const teamMemberIds = match?.teamMemberIds ?? []
    if (override) return { id: override, assignedUserId: envUser ?? teamMemberIds[0], teamMemberIds }

    if (!match) {
      const names = calendars.map((c) => c.name).join(', ') || 'none returned'
      return { error: `No calendar matched "${service}". Calendars found: ${names}` }
    }
    return { id: match.id, assignedUserId: envUser ?? teamMemberIds[0], teamMemberIds }
  } catch (err) {
    // An override lets us still book even if the calendar list is unreadable.
    if (override) return { id: override, assignedUserId: envUser, teamMemberIds: [] }
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

// ─── WHICH CLEANER ───────────────────────────────────────────────────────────
//
// The form offers the same nine arrival windows every day and never asks the
// calendar, and the job always went to the calendar's first team member. Two
// customers picking 10 AM on the same Tuesday were both handed to the same
// cleaner while a second one sat free, and nobody was told.

type Job = { start: number; end: number; title: string }

/** Statuses that no longer hold a cleaner's time. */
const FREED = new Set(['cancelled', 'invalid', 'noshow'])

/** One cleaner's jobs on a day, across every calendar they work. */
async function cleanerDay(
  apiKey: string, locationId: string, userId: string, from: number, to: number
): Promise<Job[]> {
  const url =
    `${GHL_API}/calendars/events?locationId=${encodeURIComponent(locationId)}` +
    `&userId=${encodeURIComponent(userId)}&startTime=${from}&endTime=${to}`
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Version': '2021-04-15', 'Accept': 'application/json' },
  })
  if (!res.ok) throw new Error(`GHL events read failed (${res.status})`)

  const data = await res.json().catch(() => ({}))
  return ((data?.events ?? []) as Array<Record<string, unknown>>)
    .filter((e) => !FREED.has(String(e.appointmentStatus ?? '').toLowerCase()))
    .map((e) => ({
      start: new Date(e.startTime as string).getTime(),
      end: new Date(e.endTime as string).getTime(),
      title: typeof e.title === 'string' ? e.title : 'another job',
    }))
    .filter((j) => !isNaN(j.start) && !isNaN(j.end))
}

const clock = (ms: number, timeZone: string) =>
  new Date(ms).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone })

/**
 * The team member to give the job to: someone free for the whole window, the
 * one with the fewest jobs that day when several are (ties keep the
 * calendar's own order). When nobody is free the least-busy one still gets it
 * and `clash` says what it collides with — the booking is never refused, but
 * the office hears about it before the customer is promised the time.
 *
 * Best effort: if HighLevel will not show the day, the first team member gets
 * the job exactly as before.
 */
export async function pickCleaner(opts: {
  apiKey: string
  locationId: string
  candidates: string[]
  date: string
  window: { startTime: string; endTime: string }
  timeZone?: string
}): Promise<{ userId?: string; clash?: string }> {
  const { candidates } = opts
  if (candidates.length === 0) return {}
  const timeZone = opts.timeZone || process.env.GHL_TIMEZONE || 'America/Denver'

  const start = new Date(opts.window.startTime).getTime()
  const end = new Date(opts.window.endTime).getTime()
  const dayStart = new Date(`${opts.date}T00:00:00${zoneOffset(opts.date, timeZone)}`).getTime()

  let days: Job[][]
  try {
    days = await Promise.all(
      candidates.map((id) => cleanerDay(opts.apiKey, opts.locationId, id, dayStart, dayStart + 86_400_000))
    )
  } catch (err) {
    console.error('Could not read the cleaners\' day; giving the job to the first one:', err)
    return { userId: candidates[0] }
  }

  const ranked = candidates
    .map((userId, i) => ({
      userId,
      jobs: days[i].length,
      overlaps: days[i].filter((j) => j.start < end && start < j.end),
    }))
    .sort((a, b) => Number(a.overlaps.length > 0) - Number(b.overlaps.length > 0) || a.jobs - b.jobs)

  const best = ranked[0]
  if (best.overlaps.length === 0) return { userId: best.userId }

  const hit = best.overlaps[0]
  return {
    userId: best.userId,
    clash:
      (candidates.length > 1 ? 'Every cleaner on this calendar is already booked then' : 'The cleaner is already booked then') +
      ` — overlaps "${hit.title}" (${clock(hit.start, timeZone)}–${clock(hit.end, timeZone)}). Move one of the jobs or reassign it.`,
  }
}

export type AppointmentResult =
  | { created: true; appointmentId?: string; assignedUserId?: string; clash?: string }
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
  const { id: calendarId } = resolved

  const window = toAppointmentWindow(opts.date, opts.time)
  if (!window) {
    return { created: false, reason: `Could not read date/time "${opts.date} ${opts.time}"` }
  }

  // A fixed owner from configuration is still checked, so a clash is reported.
  const envUser = process.env.GHL_ASSIGNED_USER_ID
  const { userId, clash } = await pickCleaner({
    apiKey: opts.apiKey,
    locationId: opts.locationId,
    candidates: envUser ? [envUser] : resolved.teamMemberIds,
    date: opts.date,
    window,
  })
  const assignedUserId = userId ?? resolved.assignedUserId

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
        // GHL rejects an appointment with no owner on calendars that have staff
        // assigned, so pass the calendar's own team member when there is one.
        ...(assignedUserId ? { assignedUserId } : {}),
        // We call every customer within 24 hours; HighLevel must not send its
        // own confirmation on top of that.
        toNotify: false,
      }),
    })

    if (!res.ok) {
      return { created: false, reason: `GHL appointment failed (${res.status}): ${await res.text()}` }
    }

    const data = await res.json().catch(() => ({}))
    return { created: true, appointmentId: data?.id ?? data?.appointment?.id, assignedUserId, clash }
  } catch (err) {
    return { created: false, reason: err instanceof Error ? err.message : 'Unknown error' }
  }
}
