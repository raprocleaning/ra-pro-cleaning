import { NextRequest, NextResponse } from 'next/server'
import { createAppointment } from '@/lib/ghlCalendar'
import { sendLeadEmail, sendCustomerEmail } from '@/lib/leadEmail'

// nodemailer needs the Node runtime; the CRM and calendar calls are happy there too.
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName, phone, email, zipCode, squareFootage,
      propertyType, message, smsOptIn,
      // AI booking widget + booking form fields
      service, sqft, price, extras, preferredDate, frequency, address, quoteOnRequest,
      // Booking form sends the requested slot as separate machine-readable
      // fields so it can be placed on a GHL calendar.
      bookingDate, bookingTime,
      source: bodySource,
    } = body

    const cleanName = typeof fullName === 'string' ? fullName.trim() : ''
    const cleanPhone = typeof phone === 'string' ? phone.trim() : ''
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''

    if (!cleanName || !cleanPhone || !cleanEmail) {
      return NextResponse.json(
        { ok: false, error: 'Name, phone, and email are required.' },
        { status: 400 }
      )
    }

    const nameParts = cleanName.split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName  = nameParts.slice(1).join(' ') || ''

    const ghlApiKey   = process.env.GHL_API_KEY
    const locationId  = process.env.GHL_LOCATION_ID || 'pjyNLih2iktAcHvgpRiN'
    const isBookingForm = bodySource === 'booking-form'
    const isAIBooking   = bodySource === 'ai-chat' || (!!service && !isBookingForm)

    // ── Build tags ────────────────────────────────────────────────────────────
    const tags: string[] = ['website-lead']
    if (isAIBooking)   tags.push('ai-booking')
    if (isBookingForm) tags.push('online-booking', 'booked-appointment')
    if (quoteOnRequest) tags.push('needs-quote')
    const svcTag = (service || propertyType || '').toLowerCase().replace(/[\s/]+/g, '-')
    if (svcTag) tags.push(svcTag)
    if (preferredDate) tags.push('has-preferred-date')
    if (extras?.length) tags.push('has-extras')
    if (smsOptIn && cleanPhone) {
      tags.push('sms-opt-in')
      tags.push('needs-follow-up')
    } else {
      tags.push('phone-calls-only')
    }

    // ── Build note ────────────────────────────────────────────────────────────
    const sourceLabel = isBookingForm
      ? 'Online Booking Form'
      : isAIBooking
        ? 'AI Chat Widget'
        : 'Contact Form'

    const noteLines = [
      `📋 Source: ${sourceLabel}`,
      `🧹 Service: ${service || propertyType || 'N/A'}`,
      sqft      ? `📐 Sqft: ${sqft}` : squareFootage ? `📐 Sqft: ${squareFootage}` : null,
      frequency ? `🔁 Frequency: ${frequency}` : null,
      price     ? `💰 Quoted Total: $${price}`
                : quoteOnRequest ? `💰 NEEDS A QUOTE — no price shown to customer` : null,
      extras?.length ? `✨ Extras: ${Array.isArray(extras) ? extras.join(', ') : extras}` : null,
      preferredDate ? `📅 Requested Date: ${preferredDate}` : null,
      address   ? `🏠 Address: ${address}` : null,
      zipCode   ? `📍 Zip: ${zipCode}` : null,
      message   ? `💬 Notes: ${message}` : null,
      `📱 SMS Opt-In: ${smsOptIn ? 'Yes' : 'No'}`,
    ].filter(Boolean).join('\n')

    // ── 1. Create / update contact in GHL ────────────────────────────────────
    let crmSaved = false
    let emailSent = false
    let customerEmailSent = false
    let crmError = ''
    let emailError = ''
    let appointmentCreated = false
    let appointmentError = ''

    if (ghlApiKey) {
      const ghlPayload: Record<string, unknown> = {
        firstName,
        lastName,
        email: cleanEmail,
        phone: cleanPhone,
        locationId,
        source: sourceLabel,
        tags,
      }
      if (address) ghlPayload.address1   = address
      if (zipCode) ghlPayload.postalCode = zipCode

      const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ghlApiKey}`,
          'Version': '2021-07-28',
        },
        body: JSON.stringify(ghlPayload),
      })

      if (ghlRes.ok) {
        crmSaved = true
        const ghlData = await ghlRes.json()
        const contactId = ghlData?.contact?.id

        // Add detailed note
        if (contactId) {
          await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${ghlApiKey}`,
              'Version': '2021-07-28',
            },
            body: JSON.stringify({ body: noteLines, userId: '' }),
          })

          // Place the job on the matching GHL calendar. A failure here must not
          // lose the booking — the contact and note are already saved.
          // Quote requests are not confirmed jobs, so they do not take a slot.
          if (isBookingForm && !quoteOnRequest && bookingDate && bookingTime) {
            const result = await createAppointment({
              apiKey: ghlApiKey,
              locationId,
              contactId,
              service,
              date: bookingDate,
              time: bookingTime,
              title: `${service} — ${cleanName}${price ? ` ($${price})` : ''}`,
            })
            appointmentCreated = result.created
            if (!result.created) {
              appointmentError = result.reason
              console.error('GHL appointment not created:', result.reason)

              // Say so on the contact itself. A booking that never reached the
              // calendar looks identical to one that did from the Contacts
              // list, so the only warning used to be a server log nobody reads
              // — and the job quietly went unscheduled.
              await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${ghlApiKey}`,
                  'Version': '2021-07-28',
                },
                body: JSON.stringify({
                  body: [
                    `⚠️ NOT ON A CALENDAR — add this job by hand.`,
                    `📅 Requested: ${bookingDate} at ${bookingTime}`,
                    `❗ Reason: ${result.reason}`,
                  ].join('\n'),
                  userId: '',
                }),
              }).catch((err) => {
                console.error('Could not record the calendar failure on the contact:', err)
              })
            }
          }
        }
      } else {
        crmError = `GHL contact upsert failed (${ghlRes.status}): ${await ghlRes.text()}`
        console.error(crmError)
      }
    } else {
      crmError = 'GHL_API_KEY is not configured'
      console.warn(crmError)
    }

    // ── 2. Email the office ───────────────────────────────────────────────────
    // Two independent paths, because they fail for different reasons: Formspree
    // picks its own recipients in a dashboard, while SMTP delivers to the
    // addresses in LEAD_NOTIFY_TO (the office mailbox). One delivering is
    // enough to consider the lead notified.
    const lead = {
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      service: service || propertyType,
      sqft: sqft || squareFootage,
      frequency: frequency || 'One-Time',
      price,
      extras,
      preferredDate,
      address,
      zip: zipCode,
      message,
      source: sourceLabel,
      smsOptIn: !!smsOptIn,
      // Shapes the customer's copy: a confirmed slot reads differently from a
      // general enquiry, and a phone-quoted job must not claim a total.
      hasSlot: !!(preferredDate || (bookingDate && bookingTime)),
      hasPrice: !!price && !quoteOnRequest,
    }

    // A newsletter box is not a booking, so nobody gets a booking confirmation.
    const isNewsletter = propertyType === 'Newsletter'

    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/meerbldr'
    const formspree = fetch(formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        // hasSlot / hasPrice only shape the customer's copy; they would read as
        // noise in a Formspree submission.
        ...(({ hasSlot, hasPrice, ...rest }) => rest)(lead),
        price: price ? `$${price}` : 'Custom quote',
        extras: Array.isArray(extras) ? extras.join(', ') : (extras || 'None'),
        preferredDate: preferredDate || 'Flexible',
      }),
    })
      .then(async (res) =>
        res.ok
          ? { sent: true, error: '' }
          : { sent: false, error: `Formspree notification failed (${res.status}): ${await res.text()}` }
      )
      .catch((err) => ({
        sent: false,
        error: `Formspree notification failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
      }))

    // The customer's own copy goes out alongside — their booking stands whether
    // or not it arrives, so it never gates the response.
    const [formspreeResult, smtpResult, customerResult] = await Promise.all([
      formspree,
      sendLeadEmail(lead),
      isNewsletter ? Promise.resolve({ sent: false, error: '' }) : sendCustomerEmail(lead),
    ])

    emailSent = formspreeResult.sent || smtpResult.sent
    customerEmailSent = customerResult.sent
    emailError = [formspreeResult.error, smtpResult.error, customerResult.error].filter(Boolean).join(' | ')
    if (emailError) console.error(emailError)

    if (!crmSaved && !emailSent) {
      return NextResponse.json(
        { ok: false, error: 'We could not submit your information. Please try again.', crmError, emailError },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, crmSaved, emailSent, customerEmailSent, appointmentCreated, appointmentError })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
