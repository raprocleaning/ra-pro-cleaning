import { NextResponse } from 'next/server'
import { matchCalendar } from '@/lib/ghlCalendar'
import { SERVICES, isQuoteOnRequest } from '@/lib/pricing'

/**
 * Read-only diagnostic for the booking → calendar link.
 *
 * Answers, without creating anything: can we reach GoHighLevel, which
 * calendars does it return, and which one does each service map to. Returns
 * names only — never calendar IDs or any part of the API key.
 */
export async function GET() {
  const apiKey     = process.env.GHL_API_KEY
  const locationId = process.env.GHL_LOCATION_ID || 'pjyNLih2iktAcHvgpRiN'

  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      problem: 'GHL_API_KEY is not set. Bookings save as contacts only.',
    }, { status: 200 })
  }

  const res = await fetch(
    `https://services.leadconnectorhq.com/calendars/?locationId=${encodeURIComponent(locationId)}`,
    { headers: { Authorization: `Bearer ${apiKey}`, Version: '2021-04-15', Accept: 'application/json' } }
  )

  if (!res.ok) {
    return NextResponse.json({
      ok: false,
      problem: `HighLevel refused the calendar list (HTTP ${res.status}).`,
      hint: res.status === 401 || res.status === 403
        ? 'The API key is valid for contacts but lacks calendar permission. Regenerate it with calendars.readonly and calendars/events.write scopes.'
        : 'Unexpected response from HighLevel.',
      detail: (await res.text()).slice(0, 500),
    }, { status: 200 })
  }

  const data = await res.json().catch(() => ({}))
  const calendars = (data?.calendars ?? [])
    .filter((c: { id?: string; name?: string }) => c?.id && c?.name)
    .map((c: { id: string; name: string; teamMembers?: { userId?: string }[] }) => ({
      id: c.id,
      name: c.name,
      teamMemberIds: (c.teamMembers ?? []).map((m) => m?.userId).filter((id): id is string => !!id),
    }))

  const mapping = SERVICES.map((service) => {
    if (isQuoteOnRequest(service)) {
      return { service, calendar: 'n/a — quote by phone, no calendar slot held' }
    }
    const match = matchCalendar(service, calendars)
    return {
      service,
      calendar: match ? match.name : '⚠️ NO MATCH',
      // GHL rejects appointments with no owner on calendars that have staff.
      assignedStaff: match ? (match.teamMemberIds.length || 'none on this calendar') : '—',
    }
  })

  const unmatched = mapping.filter((m) => m.calendar === '⚠️ NO MATCH')

  // Listing calendars only proves the token can read calendars. Creating an
  // appointment needs the separate events scopes, so probe those too — reading
  // events is harmless and fails the same way a write would when the scope is
  // missing.
  let eventAccess: Record<string, string> = { checked: 'no calendar available to test' }
  const probe = calendars[0]
  if (probe) {
    const now = Date.now()
    const url =
      `https://services.leadconnectorhq.com/calendars/events?locationId=${encodeURIComponent(locationId)}` +
      `&calendarId=${encodeURIComponent(probe.id)}&startTime=${now}&endTime=${now + 86_400_000}`

    const evRes = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}`, Version: '2021-04-15', Accept: 'application/json' },
    })

    eventAccess = evRes.ok
      ? { canReadEvents: 'yes', note: 'Event scopes look present. If bookings still do not appear, the failure is not a permission problem.' }
      : {
          canReadEvents: `NO — HTTP ${evRes.status}`,
          problem: 'The token cannot access calendar events, so it cannot create appointments.',
          fix: 'Create a Private Integration with calendars.readonly, calendars/events.readonly, calendars/events.write, contacts.readonly and contacts.write, then update GHL_API_KEY.',
          detail: (await evRes.text()).slice(0, 300),
        }
  }

  return NextResponse.json({
    ok: unmatched.length === 0 && eventAccess.canReadEvents === 'yes',
    calendarsInHighLevel: calendars.map((c: { name: string }) => c.name),
    mapping,
    eventAccess,
    problem: unmatched.length
      ? `${unmatched.length} service(s) have no matching calendar; those bookings save as contacts only.`
      : undefined,
  })
}
