import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName, phone, email, zipCode, squareFootage,
      propertyType, message, smsOptIn,
      // AI booking widget fields
      service, sqft, price, extras, preferredDate,
      source: bodySource,
    } = body

    const nameParts = (fullName || '').trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName  = nameParts.slice(1).join(' ') || ''

    const ghlApiKey   = process.env.GHL_API_KEY
    const locationId  = process.env.GHL_LOCATION_ID || 'pjyNLih2iktAcHvgpRiN'
    const isAIBooking = bodySource === 'ai-chat' || !!service

    // ── Build tags ────────────────────────────────────────────────────────────
    const tags: string[] = ['website-lead']
    if (isAIBooking) tags.push('ai-booking')
    const svcTag = (service || propertyType || '').toLowerCase().replace(/[\s/]+/g, '-')
    if (svcTag) tags.push(svcTag)
    if (preferredDate) tags.push('has-preferred-date')
    if (extras?.length) tags.push('has-extras')
    if (smsOptIn && phone) tags.push('sms-opt-in')   // only tag if user explicitly consented AND provided a number
    tags.push('needs-follow-up')   // triggers immediate follow-up workflow in HL
    tags.push('request-review')    // triggers review request workflow after cleaning

    // ── Build note ────────────────────────────────────────────────────────────
    const noteLines = [
      `📋 Source: ${isAIBooking ? 'AI Chat Widget' : 'Contact Form'}`,
      `🧹 Service: ${service || propertyType || 'N/A'}`,
      sqft      ? `📐 Sqft: ${sqft}` : squareFootage ? `📐 Sqft: ${squareFootage}` : null,
      price     ? `💰 Est. Price: $${price}` : null,
      extras?.length ? `✨ Extras: ${Array.isArray(extras) ? extras.join(', ') : extras}` : null,
      preferredDate ? `📅 Preferred Date: ${preferredDate}` : null,
      zipCode   ? `📍 Zip: ${zipCode}` : null,
      message   ? `💬 Message: ${message}` : null,
      `📱 SMS Opt-In: ${smsOptIn ? 'Yes' : 'No'}`,
    ].filter(Boolean).join('\n')

    // ── 1. Create / update contact in GHL ────────────────────────────────────
    if (ghlApiKey) {
      const ghlPayload: Record<string, unknown> = {
        firstName,
        lastName,
        email,
        phone,
        locationId,
        source: isAIBooking ? 'AI Chat Widget' : 'Website Contact Form',
        tags,
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

      if (ghlRes.ok) {
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
        console.error('GHL contact creation failed:', ghlRes.status, await ghlRes.text())
      }
    } else {
      console.warn('GHL_API_KEY not set — skipping GHL contact creation')
    }

    // ── 2. Formspree email notification ───────────────────────────────────────
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/meerbldr'
    await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        phone,
        email,
        service: service || propertyType,
        sqft: sqft || squareFootage,
        price: price ? `$${price}` : 'Custom quote',
        extras: Array.isArray(extras) ? extras.join(', ') : (extras || 'None'),
        preferredDate: preferredDate || 'Flexible',
        zip: zipCode,
        message,
        source: isAIBooking ? 'AI Chat Widget' : 'Contact Form',
      }),
    }).catch(() => {})

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
