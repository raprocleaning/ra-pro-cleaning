import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getQuote, sqftFromText } from '@/lib/pricing'

export const runtime = 'nodejs'

/**
 * Anyone who found this URL could post to it and write contacts and notes
 * into the CRM. BookingKoala only lets you paste a URL, so the shared secret
 * rides in it: https://raprocleaningservices.com/api/booking-webhook?secret=…
 * (an `x-webhook-secret` header works too). Until BOOKING_WEBHOOK_SECRET is set
 * the endpoint stays open, so an integration still in use is not cut off by a
 * deploy — set it, then update the URL in BookingKoala.
 */
function authorised(req: NextRequest): boolean {
  const secret = process.env.BOOKING_WEBHOOK_SECRET
  if (!secret) {
    console.warn('BOOKING_WEBHOOK_SECRET is not set: /api/booking-webhook accepts posts from anyone')
    return true
  }
  const given = req.nextUrl.searchParams.get('secret') ?? req.headers.get('x-webhook-secret') ?? ''
  const a = Buffer.from(given), b = Buffer.from(secret)
  return a.length === b.length && timingSafeEqual(a, b)
}

/**
 * BookingKoala → GoHighLevel Webhook
 * Receives a new booking from BookingKoala and creates/updates a contact in GHL.
 *
 * Every booking carries a dollar value so revenue can be traced back to the
 * lead that produced it. When the payload omits a total — which it does for
 * anything quoted by phone — the value is derived from lib/pricing.ts rather
 * than left blank, because a booking with no number attached is invisible to
 * the money-flow ledger.
 */
export async function POST(req: NextRequest) {
  if (!authorised(req)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()

    // ── Parse BookingKoala payload ─────────────────────────────────────────
    // BookingKoala sends customer + booking details in the webhook body
    const firstName   = body.customer_first_name || body.first_name || ''
    const lastName    = body.customer_last_name  || body.last_name  || ''
    const email       = body.customer_email      || body.email      || ''
    const phone       = body.customer_phone      || body.phone      || ''
    const address     = body.service_address     || body.address    || ''
    const city        = body.service_city        || body.city       || ''
    const state       = body.service_state       || body.state      || ''
    const zip         = body.service_zip         || body.zip        || ''
    const serviceType = body.service_type        || body.frequency  || ''
    const bookingDate = body.booking_date        || body.date       || ''
    const bookingTime = body.booking_time        || body.time       || ''
    const totalPrice  = body.total               || body.price      || ''
    const bookingId   = body.booking_id          || body.id         || ''
    const sqftRaw     = body.square_footage      || body.sqft       || ''
    const cadence     = body.frequency           || body.recurrence || ''
    const extrasRaw   = body.extras              || body.addons     || []

    // ── Attach a dollar value to every booking ────────────────────────────
    // A quoted price from the payload always wins. The fallback runs the same
    // getQuote the booking form uses rather than a bare tier lookup, because a
    // recurring clean is discounted 30–40% and add-ons are charged on top —
    // pricing off the base tier alone would record a bi-weekly job in GHL at
    // half again what the customer was actually quoted.
    const sqft = typeof sqftRaw === 'number' ? sqftRaw : sqftFromText(String(sqftRaw))
    const extras = Array.isArray(extrasRaw) ? extrasRaw.map(String) : []
    const derived =
      sqft !== null
        ? getQuote({ service: serviceType, sqft, frequency: String(cadence), extras })
        : null
    const bookingValue = totalPrice || derived?.total || ''
    const valueIsEstimate = !totalPrice && derived !== null

    const ghlApiKey  = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID || 'pjyNLih2iktAcHvgpRiN'

    if (!ghlApiKey) {
      console.warn('GHL_API_KEY not set')
      return NextResponse.json({ ok: false, error: 'Missing API key' }, { status: 500 })
    }

    // ── 1. Create / update contact in GHL ─────────────────────────────────
    // Upsert, not create: HighLevel refuses a second contact with the same email
    // or phone, so every returning customer's booking used to fail here.
    const ghlPayload: Record<string, unknown> = {
      firstName,
      lastName,
      email,
      phone,
      locationId,
      address1: address,
      city,
      state,
      postalCode: zip,
      source: 'BookingKoala',
      tags: ['bookingkoala', 'booked-appointment', serviceType?.toLowerCase().replace(/\s+/g, '-')].filter(Boolean),
    }

    const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ghlApiKey}`,
        'Version': '2021-07-28',
      },
      body: JSON.stringify(ghlPayload),
    })

    if (!ghlRes.ok) {
      const errText = await ghlRes.text()
      console.error('GHL contact creation failed:', ghlRes.status, errText)
      return NextResponse.json({ ok: false, error: 'GHL contact failed' }, { status: 500 })
    }

    const ghlData  = await ghlRes.json()
    const contactId = ghlData?.contact?.id

    // ── 2. Add a note with full booking details ────────────────────────────
    if (contactId) {
      const noteLines = [
        `📅 NEW BOOKING FROM BOOKINGKOALA`,
        `──────────────────────────`,
        bookingId   ? `Booking ID:    ${bookingId}`   : null,
        bookingDate ? `Date:          ${bookingDate}` : null,
        bookingTime ? `Time:          ${bookingTime}` : null,
        serviceType ? `Service:       ${serviceType}` : null,
        sqft        ? `Square Feet:   ${sqft}`        : null,
        // Only break down a price this file worked out. When BookingKoala sent
        // its own total, its pricing is the authority — pairing that real
        // figure with a discount line derived from the site's tables would put
        // two contradictory stories in front of whoever reads the note.
        valueIsEstimate && derived && derived.discountPercent > 0
          ? `Recurring:     ${derived.discountPercent}% off (−$${derived.discountAmount})`
          : null,
        valueIsEstimate && derived && derived.extrasTotal > 0
          ? `Add-ons:       $${derived.extrasTotal}`
          : null,
        bookingValue
          ? `Total Price:   $${bookingValue}${valueIsEstimate ? '  (estimated from site pricing)' : ''}`
          : null,
        `──────────────────────────`,
        address     ? `Address:       ${address}`     : null,
        city        ? `City:          ${city}`         : null,
        state       ? `State:         ${state}`       : null,
        zip         ? `Zip:           ${zip}`         : null,
      ].filter(Boolean).join('\n')

      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ghlApiKey}`,
          'Version': '2021-07-28',
        },
        body: JSON.stringify({ body: noteLines, userId: '' }),
      })
    }

    return NextResponse.json({ ok: true, contactId, bookingValue, valueIsEstimate })
  } catch (err) {
    console.error('Booking webhook error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
