import { NextRequest, NextResponse } from 'next/server'
import { submitLead, type LeadBody } from '@/lib/submitLead'
import { paymentsEnabled } from '@/lib/payments'
import { isQuoteOnRequest } from '@/lib/pricing'

// nodemailer needs the Node runtime; the CRM and calendar calls are happy there too.
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body: LeadBody = await req.json()

    // With card payments on, a priced online booking only exists once its
    // deposit has cleared (see /api/stripe-webhook). Without this, anyone could
    // post a booking straight here and take a calendar slot without paying.
    // Quote-on-request jobs are not charged online, and the contact form and
    // chat are not bookings, so neither is affected.
    if (paymentsEnabled() && body.source === 'booking-form' && !isQuoteOnRequest(body.service ?? '')) {
      return NextResponse.json(
        { ok: false, error: 'Online bookings now take a card deposit. Please refresh the page and book again.' },
        { status: 402 }
      )
    }

    const result = await submitLead(body)
    return NextResponse.json(result.json, { status: result.status })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
