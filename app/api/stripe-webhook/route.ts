import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe, paymentsEnabled, bookingFromMetadata, bookingToLeadBody } from '@/lib/payments'
import { submitLead } from '@/lib/submitLead'

export const runtime = 'nodejs'

/**
 * Stripe tells us a deposit has cleared; this is where the booking is made.
 *
 * Set up once in the Stripe Dashboard (Developers → Webhooks) pointing at
 * https://raprocleaningservices.com/api/stripe-webhook, listening for
 * `checkout.session.completed` — and `checkout.session.async_payment_succeeded`
 * if any delayed payment method is switched on — with its signing secret in
 * STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!paymentsEnabled() || !secret) {
    return NextResponse.json({ error: 'Card payments are not configured.' }, { status: 503 })
  }

  const stripe = getStripe()

  let event: Stripe.Event
  try {
    // The signature covers the exact bytes Stripe sent, so read the raw text.
    event = stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get('stripe-signature') ?? '',
      secret
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  // A card clears at once and is booked from checkout.session.completed. A
  // delayed method (a bank debit, say) completes the Session *unpaid* and says
  // so again, days later, in checkout.session.async_payment_succeeded — so both
  // are heard. Either way, only a Session that really is paid is ever booked.
  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  if (session.payment_status !== 'paid') return NextResponse.json({ received: true })

  // Only bookings this site made. The Stripe account may be shared with
  // HighLevel or anything else that takes payments, and their events arrive here
  // too — those are none of this endpoint's business.
  const booking = bookingFromMetadata(session.metadata)
  if (!booking) return NextResponse.json({ received: true })

  const total = Number(session.metadata?.ra_total) || 0
  const deposit = Math.round((session.amount_total ?? 0) / 100)
  const paymentIntentId =
    typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id

  try {
    // Stripe occasionally delivers an event twice. A payment that has already
    // been booked must not take a second calendar slot or send a second email.
    if (paymentIntentId) {
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId)
      if (intent.metadata?.ra_booked === '1') return NextResponse.json({ received: true, duplicate: true })
    }

    const result = await submitLead(bookingToLeadBody(booking, total), {
      deposit,
      balanceDue: Math.max(0, total - deposit),
      paymentIntentId,
    })

    if (result.status >= 400) {
      // The customer has paid, so do not swallow this: a non-2xx makes Stripe
      // retry for days and flags the endpoint in the Dashboard.
      console.error('A paid booking could not be saved:', result.json)
      return NextResponse.json({ error: 'The booking could not be saved.' }, { status: 500 })
    }

    if (paymentIntentId) {
      await stripe.paymentIntents
        .update(paymentIntentId, { metadata: { ra_booked: '1' } })
        .catch((err) => console.error('Could not mark the payment as booked:', err))
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 })
  }
}
