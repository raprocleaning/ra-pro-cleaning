import { NextRequest, NextResponse } from 'next/server'
import {
  paymentsEnabled, parseBooking, createDepositSession, recordCheckoutStarted,
} from '@/lib/payments'

export const runtime = 'nodejs'

/**
 * Starts a card deposit for an online booking and returns the Stripe page to
 * send the customer to. Nothing is booked here — that happens when Stripe
 * confirms the payment (see /api/stripe-webhook).
 */
export async function POST(req: NextRequest) {
  // Card payments are optional: with no Stripe key the form books directly.
  if (!paymentsEnabled()) return NextResponse.json({ ok: true, payments: false })

  try {
    const parsed = parseBooking(await req.json())
    if (!parsed.ok) return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 })

    const { booking, total, deposit, balance } = parsed

    // Saving the contact runs beside the Stripe call so it adds no waiting, and
    // never throws — see recordCheckoutStarted.
    const [session] = await Promise.all([
      createDepositSession({ booking, total, deposit, balance, origin: req.nextUrl.origin }),
      recordCheckoutStarted(booking, total, deposit),
    ])

    return NextResponse.json({ ok: true, payments: true, url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { ok: false, error: 'We could not start the payment. Please try again, or call us to book.' },
      { status: 502 }
    )
  }
}
