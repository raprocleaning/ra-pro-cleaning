/**
 * Card deposits for online bookings, through Stripe Checkout.
 *
 * The customer pays on Stripe's own page, so card numbers never reach this site.
 * The flow is:
 *
 *   1. /book posts the booking to /api/checkout, which re-prices it here (the
 *      browser's price is never trusted), opens a Checkout Session for the
 *      deposit and sends the customer to it.
 *   2. Stripe confirms payment to /api/stripe-webhook, which runs the normal
 *      booking pipeline — CRM contact, calendar slot, emails — marked as paid.
 *
 * Nothing is booked until step 2, so an abandoned payment never holds a slot.
 * The booking itself rides through Stripe in the Session's metadata, which is
 * how the webhook gets it back without this site needing a database.
 *
 * Everything is off until STRIPE_SECRET_KEY is set: with no key, /book books
 * directly with no payment, exactly as it did before.
 */

import Stripe from 'stripe'
import {
  SERVICES, SQFT_OPTIONS, FREQUENCIES, EXTRAS, getQuote, isQuoteOnRequest,
} from '@/lib/pricing'
import { toAppointmentWindow } from '@/lib/ghlCalendar'
import { depositFor } from '@/lib/deposit'
import type { Attribution } from '@/lib/attribution'

export function paymentsEnabled(): boolean {
  return !!process.env.STRIPE_SECRET_KEY
}

let client: Stripe | null = null

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  // The fetch client runs anywhere Next does, and is what lets the whole flow
  // be exercised offline against a stubbed fetch.
  client ??= new Stripe(key, { httpClient: Stripe.createFetchHttpClient() })
  return client
}

// ─── THE BOOKING ─────────────────────────────────────────────────────────────

export type Booking = {
  name: string
  phone: string
  email: string
  zip: string
  address: string
  service: string
  /** The label the customer picked, e.g. "1,800 – 2,099 sq ft". */
  sqft: string
  frequency: string
  extras: string[]
  /** YYYY-MM-DD */
  date: string
  /** "1:00 PM" */
  time: string
  notes: string
  smsOptIn: boolean
  smsMarketingOptIn: boolean
  attribution?: Attribution
}

export type ParsedBooking =
  | { ok: true; booking: Booking; total: number; deposit: number; balance: number }
  | { ok: false; error: string }

const clip = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

/** Campaign tags are shown as text only, so keep strings and cap their size. */
function cleanAttribution(value: unknown): Attribution | undefined {
  if (!value || typeof value !== 'object') return undefined
  const out: Record<string, string> = {}
  for (const key of ['source', 'medium', 'campaign', 'term', 'content', 'gclid', 'referrer', 'landingPage', 'firstSeen']) {
    const v = clip((value as Record<string, unknown>)[key], 120)
    if (v) out[key] = v
  }
  return Object.keys(out).length ? (out as Attribution) : undefined
}

/** Today's date in the business timezone, as YYYY-MM-DD. */
function today(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: process.env.GHL_TIMEZONE || 'America/Denver',
  }).format(new Date())
}

/**
 * Validates what the browser sent and works out what to charge from our own
 * price list. The price the browser displayed is deliberately not an input.
 */
export function parseBooking(body: unknown): ParsedBooking {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>

  const name  = clip(b.fullName, 100)
  const phone = clip(b.phone, 30)
  const email = clip(b.email, 120).toLowerCase()
  if (name.length < 2)                       return { ok: false, error: 'Please enter your name.' }
  if (phone.replace(/\D/g, '').length < 10)  return { ok: false, error: 'Please enter a phone number.' }
  if (!/^\S+@\S+\.\S+$/.test(email))         return { ok: false, error: 'Please enter a valid email address.' }

  const service = clip(b.service, 60)
  if (!(SERVICES as readonly string[]).includes(service) || isQuoteOnRequest(service)) {
    return { ok: false, error: 'Please choose a service we can price online.' }
  }

  const sqftOption = SQFT_OPTIONS.find((o) => o.label === clip(b.sqft, 40))
  if (!sqftOption) return { ok: false, error: 'Please choose your home size.' }

  const frequency = clip(b.frequency, 30) || 'One-Time'
  if (!FREQUENCIES.some((f) => f.label === frequency)) {
    return { ok: false, error: 'Please choose how often you would like us.' }
  }

  const rawExtras = Array.isArray(b.extras) ? b.extras : []
  const extras = [...new Set(rawExtras.map((e) => clip(e, 60)))]
  if (extras.some((label) => !EXTRAS.some((x) => x.label === label))) {
    return { ok: false, error: 'One of the add-ons you chose is no longer available.' }
  }

  const date = clip(b.bookingDate, 10)
  const time = clip(b.bookingTime, 10)
  if (!toAppointmentWindow(date, time)) {
    return { ok: false, error: 'Please choose a date and arrival window.' }
  }
  if (date <= today()) {
    return { ok: false, error: 'Please choose a date from tomorrow onward.' }
  }

  const quote = getQuote({ service, sqft: sqftOption.value, frequency, extras })
  if (!quote) return { ok: false, error: 'We could not price that booking. Please call us.' }

  const deposit = depositFor(quote.total)
  return {
    ok: true,
    total: quote.total,
    deposit,
    balance: quote.total - deposit,
    booking: {
      name, phone, email,
      zip: clip(b.zipCode, 10),
      address: clip(b.address, 200),
      service,
      sqft: sqftOption.label,
      frequency,
      extras,
      date, time,
      notes: clip(b.message, 800),
      smsOptIn: b.smsOptIn === true,
      smsMarketingOptIn: b.smsMarketingOptIn === true,
      attribution: cleanAttribution(b.attribution),
    },
  }
}

// ─── CARRYING THE BOOKING THROUGH STRIPE ─────────────────────────────────────
//
// Stripe metadata allows 500 characters per value, so the booking is stored as
// JSON split across numbered keys and stitched back together by the webhook.

/** Marks a Session as one this site made — the Stripe account may be shared. */
export const FLOW = 'book'

const CHUNK = 450
const MAX_CHUNKS = 12

export function bookingMetadata(booking: Booking, total: number, deposit: number): Record<string, string> {
  const json = JSON.stringify(booking)
  const chunks: Record<string, string> = {}
  for (let i = 0, n = 0; i < json.length; i += CHUNK, n++) chunks[`b${n}`] = json.slice(i, i + CHUNK)
  if (Object.keys(chunks).length > MAX_CHUNKS) throw new Error('Booking details are too long.')

  return {
    ra_flow: FLOW,
    ra_total: String(total),
    ra_deposit: String(deposit),
    // Readable at a glance in the Stripe Dashboard.
    service: booking.service,
    when: `${booking.date} ${booking.time}`,
    customer: `${booking.name} · ${booking.phone}`.slice(0, 500),
    ...chunks,
  }
}

/** The booking back out of a Session's metadata, or null if it is not ours. */
export function bookingFromMetadata(metadata: Record<string, string> | null | undefined): Booking | null {
  if (!metadata || metadata.ra_flow !== FLOW) return null
  let json = ''
  for (let n = 0; n < MAX_CHUNKS && metadata[`b${n}`] !== undefined; n++) json += metadata[`b${n}`]
  try {
    const parsed = JSON.parse(json)
    return parsed && typeof parsed === 'object' ? (parsed as Booking) : null
  } catch {
    return null
  }
}

/** The booking in the shape /api/contact (and so submitLead) already takes. */
export function bookingToLeadBody(booking: Booking, total: number) {
  return {
    source: 'booking-form',
    fullName: booking.name,
    phone: booking.phone,
    email: booking.email,
    zipCode: booking.zip,
    address: booking.address,
    service: booking.service,
    sqft: booking.sqft,
    frequency: booking.frequency,
    price: total,
    quoteOnRequest: false,
    extras: booking.extras,
    preferredDate: `${booking.date} at ${booking.time}`,
    bookingDate: booking.date,
    bookingTime: booking.time,
    message: booking.notes,
    smsOptIn: booking.smsOptIn,
    smsMarketingOptIn: booking.smsMarketingOptIn,
    attribution: booking.attribution,
  }
}

// ─── CHECKOUT ────────────────────────────────────────────────────────────────

export async function createDepositSession(opts: {
  booking: Booking
  total: number
  deposit: number
  balance: number
  origin: string
}): Promise<{ id: string; url: string }> {
  const { booking, total, deposit, balance, origin } = opts
  const metadata = bookingMetadata(booking, total, deposit)

  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    // Card only. This filters Checkout's own choices, so Apple Pay and Google
    // Pay still appear (they are cards) but bank debits and the like do not.
    allowed_payment_method_types: ['card'],
    customer_email: booking.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: deposit * 100,
          product_data: {
            name: `Booking deposit — ${booking.service}`,
            description:
              `${booking.sqft} · ${booking.date} at ${booking.time}.` +
              (balance > 0 ? ` The remaining $${balance} is due after the cleaning.` : ''),
          },
        },
      },
    ],
    metadata,
    // Carried on the payment too, so it shows beside the charge in the Dashboard
    // and so the webhook can mark a payment as already booked.
    payment_intent_data: {
      description: `${booking.service} — ${booking.name} (${booking.date} ${booking.time})`,
      metadata: { ra_flow: FLOW, service: booking.service, when: `${booking.date} ${booking.time}` },
    },
    success_url: `${origin}/book/confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/book?canceled=1`,
  })

  if (!session.url) throw new Error('Stripe did not return a checkout URL.')
  return { id: session.id, url: session.url }
}

// ─── ABANDONED CHECKOUTS ─────────────────────────────────────────────────────

/**
 * Nothing is booked until the deposit clears, so someone who types in their
 * details and then leaves the payment page would otherwise vanish. Saving the
 * contact as soon as checkout opens keeps them as a lead the office can call.
 * A `deposit-pending` tag with no `deposit-paid` tag beside it is one of those.
 *
 * Best effort: it never blocks, or fails, the checkout.
 */
export async function recordCheckoutStarted(booking: Booking, total: number, deposit: number): Promise<void> {
  const apiKey = process.env.GHL_API_KEY
  if (!apiKey) return
  const locationId = process.env.GHL_LOCATION_ID || 'pjyNLih2iktAcHvgpRiN'
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Version': '2021-07-28',
  }

  try {
    const [firstName, ...rest] = booking.name.split(/\s+/)
    const res = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        firstName,
        lastName: rest.join(' '),
        email: booking.email,
        phone: booking.phone,
        locationId,
        source: 'Online Booking Form',
        tags: ['website-lead', 'deposit-pending'],
        ...(booking.address ? { address1: booking.address } : {}),
        ...(booking.zip ? { postalCode: booking.zip } : {}),
      }),
    })
    if (!res.ok) throw new Error(`contact upsert failed (${res.status})`)

    const contactId = (await res.json())?.contact?.id
    if (!contactId) return

    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        userId: '',
        body: [
          `⏳ STARTED AN ONLINE BOOKING — deposit not paid yet.`,
          `If no "deposit-paid" tag follows, they left at the payment page: worth a call.`,
          `🧹 ${booking.service} · ${booking.sqft} · ${booking.frequency}`,
          `📅 ${booking.date} at ${booking.time}`,
          `💰 Total $${total} · deposit $${deposit}`,
        ].join('\n'),
      }),
    })
  } catch (err) {
    console.error('Could not record the started checkout:', err)
  }
}
