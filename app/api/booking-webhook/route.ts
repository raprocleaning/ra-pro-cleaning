import { NextRequest, NextResponse } from 'next/server'

/**
 * BookingKoala → GoHighLevel Webhook
 * Receives a new booking from BookingKoala and creates/updates a contact in GHL.
 */
export async function POST(req: NextRequest) {
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

    const ghlApiKey  = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID || 'pjyNLih2iktAcHvgpRiN'

    if (!ghlApiKey) {
      console.warn('GHL_API_KEY not set')
      return NextResponse.json({ ok: false, error: 'Missing API key' }, { status: 500 })
    }

    // ── 1. Create / update contact in GHL ─────────────────────────────────
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

    const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
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
        totalPrice  ? `Total Price:   $${totalPrice}` : null,
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

    return NextResponse.json({ ok: true, contactId })
  } catch (err) {
    console.error('Booking webhook error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
