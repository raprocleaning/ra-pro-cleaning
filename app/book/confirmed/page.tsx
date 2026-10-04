import type { Metadata } from 'next'
import Link from 'next/link'
import { bookingFromMetadata, getStripe, paymentsEnabled } from '@/lib/payments'
import ConfirmedTracker from '@/components/ConfirmedTracker'

export const metadata: Metadata = {
  title: 'Booking Confirmed | R A Pro Cleaning Services',
  robots: { index: false, follow: false },
}

// Reads the payment from Stripe on every visit; there is nothing to prerender.
export const dynamic = 'force-dynamic'

type Outcome =
  | {
      kind: 'paid'
      sessionId: string
      first: string
      service: string
      when: string
      total: number
      deposit: number
      balance: number
    }
  | { kind: 'processing' }
  | { kind: 'unpaid' }
  | { kind: 'unknown' }

/** "2026-10-08" and "12:00 PM" as "Thursday, October 8, 2026 at 12:00 PM". */
function whenLabel(date: string, time: string): string {
  const day = new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  })
  return `${day} at ${time}`
}

/**
 * What Stripe says happened. The page reads the Session itself rather than
 * waiting on the webhook, which can land a moment after the customer does.
 */
async function lookup(sessionId: string | undefined): Promise<Outcome> {
  if (!sessionId || !paymentsEnabled()) return { kind: 'unknown' }
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    const booking = bookingFromMetadata(session.metadata) // null for anything this site did not create
    if (!booking) return { kind: 'unknown' }
    if (session.payment_status !== 'paid') {
      // A delayed method (a bank debit) finishes Checkout before the money lands.
      return session.status === 'complete' ? { kind: 'processing' } : { kind: 'unpaid' }
    }

    const total = Number(session.metadata?.ra_total) || 0
    const deposit = Math.round((session.amount_total ?? 0) / 100)
    return {
      kind: 'paid',
      sessionId,
      first: booking.name.split(/\s+/)[0],
      service: booking.service,
      when: whenLabel(booking.date, booking.time),
      total,
      deposit,
      balance: Math.max(0, total - deposit),
    }
  } catch (err) {
    console.error('Could not look up the checkout session:', err)
    return { kind: 'unknown' }
  }
}

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const outcome = await lookup(session_id)

  return (
    <main className="min-h-screen bg-[#F8FFFE] pt-32 pb-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        {outcome.kind === 'paid' && (
          <>
            <ConfirmedTracker sessionId={outcome.sessionId} service={outcome.service} value={outcome.total} />
            <div className="w-20 h-20 rounded-full bg-[#E6F7F5] flex items-center justify-center mx-auto mb-7">
              <svg className="w-10 h-10 text-[#00A896]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#0F2240] tracking-tight mb-4">You’re booked!</h1>
            <p className="text-[#4A6583] leading-relaxed mb-9">
              Thanks {outcome.first} — your deposit has been received for your{' '}
              <strong className="text-[#0F2240]">{outcome.service}</strong> on{' '}
              <strong className="text-[#0F2240]">{outcome.when}</strong>.
              <br />
              We’ll call you within 24 hours to confirm the details.
            </p>

            <div className="bg-white border-2 border-[#B2DFDB] rounded-2xl p-7 mb-9 shadow-sm text-left space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[#4A6583] text-sm">Deposit paid today</span>
                <span className="text-[#00A896] font-black text-3xl tracking-tight">${outcome.deposit}</span>
              </div>
              {outcome.total > 0 && (
                <>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-[#4A6583]">Due after the clean</span>
                    <span className="text-[#0F2240] font-semibold">${outcome.balance}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 text-sm pt-3 border-t border-[#E6F7F5]">
                    <span className="text-[#4A6583]">Total</span>
                    <span className="text-[#0F2240] font-semibold">${outcome.total}</span>
                  </div>
                </>
              )}
            </div>
            <p className="text-[#4A6583] text-sm mb-2">A confirmation is on its way to your email, and Stripe will send your receipt.</p>
          </>
        )}

        {outcome.kind === 'processing' && (
          <>
            <h1 className="text-3xl font-black text-[#0F2240] tracking-tight mb-4">Your payment is processing</h1>
            <p className="text-[#4A6583] leading-relaxed mb-8">
              Thank you — your bank is still confirming your deposit. We’ll book your cleaning as soon as it clears and let you
              know. If you’d rather not wait, call us and we’ll sort it out right away.
            </p>
          </>
        )}

        {outcome.kind === 'unpaid' && (
          <>
            <h1 className="text-3xl font-black text-[#0F2240] tracking-tight mb-4">We haven’t received your payment</h1>
            <p className="text-[#4A6583] leading-relaxed mb-8">
              Your booking isn’t placed yet. You can{' '}
              <Link href="/book" className="text-[#00A896] font-bold hover:underline">try again</Link>, or call us and we’ll book you by phone.
            </p>
          </>
        )}

        {outcome.kind === 'unknown' && (
          <>
            <h1 className="text-3xl font-black text-[#0F2240] tracking-tight mb-4">Thank you</h1>
            <p className="text-[#4A6583] leading-relaxed mb-8">
              If you just paid your deposit, a confirmation will reach your email shortly. If you don’t see one, call us and
              we’ll check your booking right away.
            </p>
          </>
        )}

        <p className="text-[#4A6583] text-sm">
          Questions? Call us at{' '}
          <a href="tel:7206778799" className="text-[#00A896] font-bold hover:underline">(720) 677-8799</a>
        </p>
      </div>
    </main>
  )
}
