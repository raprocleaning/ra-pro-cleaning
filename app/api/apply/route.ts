import { NextRequest, NextResponse } from 'next/server'
import { sendApplicationEmail, sendApplicantCopy, type Applicant } from '@/lib/applicantEmail'

// nodemailer needs the Node runtime; the CRM call is happy there too.
export const runtime = 'nodejs'

/**
 * Job applications from the careers page.
 *
 * Deliberately separate from /api/contact: an applicant is not a lead, and
 * tagging them as one puts a cleaner looking for work into the same follow-up
 * sequence as a customer looking for a quote.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName, phone, email, area, experience, availability,
      hasCar, legalToWork, englishLevel, message,
    } = body

    const cleanName = typeof fullName === 'string' ? fullName.trim() : ''
    const cleanPhone = typeof phone === 'string' ? phone.trim() : ''
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''

    // Phone is what actually gets someone hired, so it is required. Email is
    // not — plenty of good cleaners apply from a phone and do not use email,
    // and demanding an address loses them at the first field.
    if (!cleanName || !cleanPhone) {
      return NextResponse.json(
        { ok: false, error: 'Name and phone are required.' },
        { status: 400 }
      )
    }

    const availabilityList: string[] = Array.isArray(availability)
      ? availability.filter((slot: unknown): slot is string => typeof slot === 'string')
      : []

    const applicant: Applicant = {
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      area: typeof area === 'string' ? area.trim() : '',
      experience: typeof experience === 'string' ? experience.trim() : '',
      availability: availabilityList,
      hasCar: !!hasCar,
      legalToWork: !!legalToWork,
      englishLevel: typeof englishLevel === 'string' ? englishLevel.trim() : '',
      message: typeof message === 'string' ? message.trim() : '',
      source: 'Careers page',
    }

    const nameParts = cleanName.split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const ghlApiKey = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID || 'pjyNLih2iktAcHvgpRiN'

    // ── Tags ─────────────────────────────────────────────────────────────────
    // 'job-applicant' is the one that matters: it keeps applicants out of every
    // customer automation that fires on 'website-lead'.
    const tags: string[] = ['job-applicant', 'hiring']
    if (applicant.hasCar) tags.push('has-transport')
    if (applicant.experience) {
      tags.push(`experience-${applicant.experience.toLowerCase().replace(/[\s/+]+/g, '-')}`)
    }
    if (availabilityList.length) tags.push('has-availability')

    const noteLines = [
      `🧽 CLEANER APPLICATION`,
      `📍 Area: ${applicant.area || 'Not given'}`,
      `🧹 Experience: ${applicant.experience || 'Not given'}`,
      availabilityList.length ? `🗓️ Available: ${availabilityList.join(', ')}` : null,
      `🚗 Own transport: ${applicant.hasCar ? 'Yes' : 'No'}`,
      `📄 Legally able to work in the US: ${applicant.legalToWork ? 'Yes' : 'No'}`,
      applicant.englishLevel ? `🗣️ English: ${applicant.englishLevel}` : null,
      applicant.message ? `💬 Notes: ${applicant.message}` : null,
    ].filter(Boolean).join('\n')

    // ── 1. Save to the CRM ───────────────────────────────────────────────────
    let crmSaved = false
    let crmError = ''

    if (ghlApiKey) {
      const ghlPayload: Record<string, unknown> = {
        firstName,
        lastName,
        phone: cleanPhone,
        locationId,
        source: 'Careers Page',
        tags,
      }
      // GHL rejects a blank email string, and email is optional here.
      if (cleanEmail) ghlPayload.email = cleanEmail

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
        if (contactId) {
          await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${ghlApiKey}`,
              'Version': '2021-07-28',
            },
            body: JSON.stringify({ body: noteLines, userId: '' }),
          }).catch((err) => {
            console.error('Could not add the application note:', err)
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

    // ── 2. Email the office, and the applicant ───────────────────────────────
    // The applicant's copy runs alongside: their application stands whether or
    // not it arrives, so it never gates the response.
    const [officeResult, applicantResult] = await Promise.all([
      sendApplicationEmail(applicant),
      sendApplicantCopy(applicant),
    ])

    const emailError = [officeResult.error, applicantResult.error].filter(Boolean).join(' | ')
    if (emailError) console.error(emailError)

    // Only a total loss is an error. If the application reached the CRM or the
    // office mailbox, someone can still call them back.
    if (!crmSaved && !officeResult.sent) {
      return NextResponse.json(
        { ok: false, error: 'We could not send your application. Please call or text us on (720) 677-8799.', crmError, emailError },
        { status: 502 }
      )
    }

    return NextResponse.json({
      ok: true,
      crmSaved,
      emailSent: officeResult.sent,
      applicantEmailSent: applicantResult.sent,
    })
  } catch (err) {
    console.error('Apply API error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
