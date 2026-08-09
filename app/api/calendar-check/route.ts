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
    .map((c: { id: string; name: string }) => ({ id: c.id, name: c.name }))

  const mapping = SERVICES.map((service) => {
    if (isQuoteOnRequest(service)) {
      return { service, calendar: 'n/a — quote by phone, no calendar slot held' }
    }
    const match = matchCalendar(service, calendars)
    return { service, calendar: match ? match.name : '⚠️ NO MATCH' }
  })

  const unmatched = mapping.filter((m) => m.calendar === '⚠️ NO MATCH')

  return NextResponse.json({
    ok: unmatched.length === 0,
    calendarsInHighLevel: calendars.map((c: { name: string }) => c.name),
    mapping,
    problem: unmatched.length
      ? `${unmatched.length} service(s) have no matching calendar; those bookings save as contacts only.`
      : undefined,
  })
}
