import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName, phone, email, zipCode, squareFootage,
      propertyType, message, smsOptIn,
      // AI booking widget + booking form fields
      service, sqft, price, extras, preferredDate, frequency, address,
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
      price     ? `💰 Quoted Total: $${price}` : null,
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
    let crmError = ''
    let emailError = ''

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
        }
      } else {
        crmError = `GHL contact upsert failed (${ghlRes.status}): ${await ghlRes.text()}`
        console.error(crmError)
      }
    } else {
      crmError = 'GHL_API_KEY is not configured'
      console.warn(crmError)
    }

    // ── 2. Formspree email notification ───────────────────────────────────────
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/meerbldr'
    try {
      const formspreeRes = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          service: service || propertyType,
          sqft: sqft || squareFootage,
          frequency: frequency || 'One-Time',
          price: price ? `$${price}` : 'Custom quote',
          extras: Array.isArray(extras) ? extras.join(', ') : (extras || 'None'),
          preferredDate: preferredDate || 'Flexible',
          address,
          zip: zipCode,
          message,
          source: sourceLabel,
        }),
      })
      emailSent = formspreeRes.ok
      if (!formspreeRes.ok) {
        emailError = `Formspree notification failed (${formspreeRes.status}): ${await formspreeRes.text()}`
        console.error(emailError)
      }
    } catch (err) {
      emailError = `Formspree notification failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      console.error(emailError)
    }

    if (!crmSaved && !emailSent) {
      return NextResponse.json(
        { ok: false, error: 'We could not submit your information. Please try again.', crmError, emailError },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, crmSaved, emailSent })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
