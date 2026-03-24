import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, phone, email, zipCode, squareFootage, propertyType, message, smsOptIn } = body

    // Split full name into first / last
    const nameParts = (fullName || '').trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const ghlApiKey = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID || 'pjyNLih2iktAcHvgpRiN'

    // ── 1. Create / update contact in GHL ──────────────────────────────────
    if (ghlApiKey) {
      const noteLines = [
        `Property Type: ${propertyType || 'N/A'}`,
        `Square Footage: ${squareFootage || 'N/A'}`,
        `Zip Code: ${zipCode || 'N/A'}`,
        message ? `Message: ${message}` : null,
        `SMS Opt-In: ${smsOptIn ? 'Yes' : 'No'}`,
        `Source: Website Contact Form`,
      ].filter(Boolean).join('\n')

      const ghlPayload: Record<string, unknown> = {
        firstName,
        lastName,
        email,
        phone,
        locationId,
        source: 'Website Contact Form',
        tags: ['website-lead', propertyType?.toLowerCase().replace(/\s+/g, '-') || 'unknown-type'],
      }

      // POST to GHL contacts (upsert by email/phone)
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

        // Add a note with the form details
        if (contactId && noteLines) {
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
        // Log but don't fail — still send email notification
        console.error('GHL contact creation failed:', ghlRes.status, await ghlRes.text())
      }
    } else {
      console.warn('GHL_API_KEY not set — skipping GHL contact creation')
    }

    // ── 2. Also forward to Formspree for email notification ───────────────
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/meerbldr'
    const formspreeRes = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        phone,
        email,
        zip: zipCode,
        squareFootage,
        propertyType,
        message,
        smsOptIn,
      }),
    })

    if (!formspreeRes.ok) {
      console.error('Formspree failed:', formspreeRes.status)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
