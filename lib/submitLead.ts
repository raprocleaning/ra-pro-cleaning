import { createAppointment, warmCalendars } from '@/lib/ghlCalendar'
import { sendLeadEmail, sendCustomerEmail } from '@/lib/leadEmail'
import { describeAttribution, type Attribution } from '@/lib/attribution'

/**
 * What a form submission becomes: a CRM contact with a note, a calendar slot for
 * a confirmed booking, and the emails to the office and the customer.
 *
 * Shared by /api/contact (the contact form, the chat, and bookings that take no
 * payment) and /api/stripe-webhook (a booking whose deposit has just cleared) —
 * which is why it returns a status and body instead of a Response.
 */

export type LeadBody = {
  fullName?: string
  phone?: string
  email?: string
  zipCode?: string
  squareFootage?: string
  propertyType?: string
  message?: string
  smsOptIn?: boolean
  smsMarketingOptIn?: boolean
  // AI booking widget + booking form fields
  service?: string
  sqft?: string
  price?: number | string | null
  extras?: string[] | string
  preferredDate?: string
  frequency?: string
  address?: string
  quoteOnRequest?: boolean
  // The booking form sends the requested slot as separate machine-readable
  // fields so it can be placed on a GHL calendar.
  bookingDate?: string
  bookingTime?: string
  source?: string
  // Campaign tags captured when the visitor first landed.
  attribution?: unknown
}

/** A deposit that has already been taken by card, in whole dollars. */
export type PaymentInfo = {
  deposit: number
  balanceDue: number
  paymentIntentId?: string
}

export type LeadResult = { status: number; json: Record<string, unknown> }

export async function submitLead(body: LeadBody, payment?: PaymentInfo): Promise<LeadResult> {
  try {
    const {
      fullName, phone, email, zipCode, squareFootage,
      propertyType, message, smsOptIn, smsMarketingOptIn,
      // AI booking widget + booking form fields
      service, sqft, price, extras, preferredDate, frequency, address, quoteOnRequest,
      // Booking form sends the requested slot as separate machine-readable
      // fields so it can be placed on a GHL calendar.
      bookingDate, bookingTime,
      source: bodySource,
      // Campaign tags captured when the visitor first landed.
      attribution,
    } = body

    const cleanName = typeof fullName === 'string' ? fullName.trim() : ''
    const cleanPhone = typeof phone === 'string' ? phone.trim() : ''
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''

    if (!cleanName || !cleanPhone || !cleanEmail) {
      return {
        status: 400,
        json: { ok: false, error: 'Name, phone, and email are required.' },
      }
    }

    const nameParts = cleanName.split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName  = nameParts.slice(1).join(' ') || ''

    const ghlApiKey   = process.env.GHL_API_KEY
    const locationId  = process.env.GHL_LOCATION_ID || 'pjyNLih2iktAcHvgpRiN'
    const isBookingForm = bodySource === 'booking-form'
    const isAIBooking   = bodySource === 'ai-chat' || (!!service && !isBookingForm)

    // Which marketing channel produced this lead, as opposed to which form
    // they filled in. Comes from the browser, so treat it as untrusted: it is
    // only ever shown as text and never drives a decision here.
    const attr: Attribution | null =
      attribution && typeof attribution === 'object' ? (attribution as Attribution) : null
    const channel = describeAttribution(attr)

    // ── Build tags ────────────────────────────────────────────────────────────
    const tags: string[] = ['website-lead']
    if (isAIBooking)   tags.push('ai-booking')
    if (isBookingForm) tags.push('online-booking', 'booked-appointment')
    if (quoteOnRequest) tags.push('needs-quote')
    const svcTag = (service || propertyType || '').toLowerCase().replace(/[\s/]+/g, '-')
    if (svcTag) tags.push(svcTag)
    if (preferredDate) tags.push('has-preferred-date')
    if (extras?.length) tags.push('has-extras')
    // A campaign tag on the lead makes the CRM filterable by channel.
    if (attr?.source) {
      tags.push(`src-${String(attr.source).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`)
    }
    if (smsOptIn && cleanPhone) {
      tags.push('sms-opt-in')
      tags.push('needs-follow-up')
    } else {
      tags.push('phone-calls-only')
    }
    if (smsMarketingOptIn && cleanPhone) tags.push('sms-marketing-opt-in')
    if (payment) tags.push('deposit-paid')

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
      payment   ? `💳 Deposit paid by card: $${payment.deposit}${payment.paymentIntentId ? ` (Stripe ${payment.paymentIntentId})` : ''} — balance due after the cleaning: $${payment.balanceDue}` : null,
      extras?.length ? `✨ Extras: ${Array.isArray(extras) ? extras.join(', ') : extras}` : null,
      preferredDate ? `📅 Requested Date: ${preferredDate}` : null,
      address   ? `🏠 Address: ${address}` : null,
      zipCode   ? `📍 Zip: ${zipCode}` : null,
      message   ? `💬 Notes: ${message}` : null,
      `📱 SMS Opt-In (reminders): ${smsOptIn ? 'Yes' : 'No'}`,
      `📣 SMS Opt-In (offers): ${smsMarketingOptIn ? 'Yes' : 'No'}`,
      channel ? `📣 Came from: ${channel}` : null,
      attr?.landingPage ? `🔗 Landed on: ${attr.landingPage}` : null,
    ].filter(Boolean).join('\n')

    // ── 1. Create / update contact in GHL ────────────────────────────────────
    // Runs alongside the emails in step 2, not before them: the two do not depend
    // on each other, and a Stripe webhook only has a few seconds to answer. One
    // after the other they took 5–9 seconds, too close to Stripe's limit.
    //
    // Quote requests are not confirmed jobs, so they do not take a calendar slot.
    const slotWhen =
      isBookingForm && !quoteOnRequest && bookingDate && bookingTime
        ? { date: bookingDate, time: bookingTime }
        : null

    const saveToCrm = async () => {
      const out = { crmSaved: false, crmError: '', appointmentCreated: false, appointmentError: '' }

      if (!ghlApiKey) {
        out.crmError = 'GHL_API_KEY is not configured'
        console.warn(out.crmError)
        return out
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ghlApiKey}`,
        'Version': '2021-07-28',
      }

      try {
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

        // The calendar list is needed once the contact is saved; read it now so
        // that is not one more wait.
        if (slotWhen) warmCalendars(ghlApiKey, locationId)

        const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
          method: 'POST',
          headers,
          body: JSON.stringify(ghlPayload),
        })

        if (!ghlRes.ok) {
          out.crmError = `GHL contact upsert failed (${ghlRes.status}): ${await ghlRes.text()}`
          console.error(out.crmError)
          return out
        }

        out.crmSaved = true
        const contactId = (await ghlRes.json())?.contact?.id
        if (!contactId) return out

        // A note that will not save must not lose the contact or the booking.
        const addNote = (text: string) =>
          fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ body: text, userId: '' }),
          }).catch((err) => {
            console.error('Could not add a note to the contact:', err)
          })

        // The detailed note and the calendar slot do not depend on each other. A
        // failure placing the job must not lose the booking — the contact is
        // already saved.
        const [, slot] = await Promise.all([
          addNote(noteLines),
          slotWhen
            ? createAppointment({
                apiKey: ghlApiKey,
                locationId,
                contactId,
                service: service ?? '',
                date: slotWhen.date,
                time: slotWhen.time,
                title: `${service} — ${cleanName}${price ? ` ($${price})` : ''}`,
              })
            : null,
        ])

        if (slot) {
          out.appointmentCreated = slot.created
          if (!slot.created) {
            out.appointmentError = slot.reason
            console.error('GHL appointment not created:', slot.reason)

            // Say so on the contact itself. A booking that never reached the
            // calendar looks identical to one that did from the Contacts
            // list, so the only warning used to be a server log nobody reads
            // — and the job quietly went unscheduled.
            await addNote([
              `⚠️ NOT ON A CALENDAR — add this job by hand.`,
              `📅 Requested: ${slotWhen?.date} at ${slotWhen?.time}`,
              `❗ Reason: ${slot.reason}`,
            ].join('\n'))
          }
        }
      } catch (err) {
        // HighLevel being unreachable must not stop the emails below going out.
        const msg = `GHL request failed: ${err instanceof Error ? err.message : 'Unknown error'}`
        console.error(msg)
        if (!out.crmSaved) out.crmError = msg
      }

      return out
    }

    const crmWork = saveToCrm()

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
      // The booking form sends null for a quote-on-request job.
      price: price ?? undefined,
      extras,
      preferredDate,
      address,
      zip: zipCode,
      message,
      source: sourceLabel,
      channel,
      landingPage: attr?.landingPage,
      smsOptIn: !!smsOptIn,
      smsMarketingOptIn: !!smsMarketingOptIn,
      // Shapes the customer's copy: a confirmed slot reads differently from a
      // general enquiry, and a phone-quoted job must not claim a total.
      hasSlot: !!(preferredDate || (bookingDate && bookingTime)),
      hasPrice: !!price && !quoteOnRequest,
      depositPaid: payment?.deposit,
      balanceDue: payment?.balanceDue,
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
    const [formspreeResult, smtpResult, customerResult, crm] = await Promise.all([
      formspree,
      sendLeadEmail(lead),
      isNewsletter ? Promise.resolve({ sent: false, error: '' }) : sendCustomerEmail(lead),
      crmWork,
    ])

    const { crmSaved, crmError, appointmentCreated, appointmentError } = crm
    const emailSent = formspreeResult.sent || smtpResult.sent
    const customerEmailSent = customerResult.sent
    const emailError = [formspreeResult.error, smtpResult.error, customerResult.error].filter(Boolean).join(' | ')
    if (emailError) console.error(emailError)

    if (!crmSaved && !emailSent) {
      return {
        status: 502,
        json: { ok: false, error: 'We could not submit your information. Please try again.', crmError, emailError },
      }
    }

    return {
      status: 200,
      json: {
        ok: true, crmSaved, emailSent, customerEmailSent, appointmentCreated, appointmentError,
        // Reason text goes only to the Stripe webhook (which Stripe signs for us), never to the public form.
        ...(payment ? { crmError, emailError } : {}),
      },
    }
  } catch (err) {
    console.error('Contact API error:', err)
    return { status: 500, json: { ok: false, error: 'Internal error' } }
  }
}
