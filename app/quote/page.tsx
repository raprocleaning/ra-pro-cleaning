import type { Metadata } from 'next'
import QuoteForm from '@/components/QuoteForm'
import { NEW_CLIENT_CALL_OFFER as OFFER } from '@/lib/offers'

export const metadata: Metadata = {
  title: 'Get a Free Cleaning Quote | R A Pro Cleaning Services Denver',
  description:
    'Get a free house cleaning quote in Denver and Aurora. Leave your name, email and phone — we call or text you back fast. Standard, deep, move-in/out and commercial cleaning.',
  alternates: { canonical: 'https://raprocleaningservices.com/quote' },
}

/**
 * Where every "Get a Free Quote" button outside the homepage leads, and where
 * the old /book address now forwards (see next.config.js). Online booking is
 * switched off; the office prices each job when it calls back.
 */
export default function QuotePage() {
  return (
    <main className="pt-20">
      <section className="relative bg-[#0F2240] py-16 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 50%, rgba(0,168,150,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00A896]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
                Free, No-Obligation Quote
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                Get Your Free Cleaning Quote
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Tell us how to reach you and we&apos;ll call or text you back to ask about your home and
                give you an exact price. Serving Denver, Aurora and the surrounding metro.
              </p>
              <ul className="space-y-2.5 text-white text-base md:text-lg text-left max-w-md mx-auto lg:mx-0 mb-8">
                {[
                  'Standard, deep, move-in/out, commercial & post-construction',
                  'Licensed, insured, women-owned local team',
                  'Rated 4.9★ on Google',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 mt-0.5 text-[#5EEAD4] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {line}
                  </li>
                ))}
              </ul>
              <a
                href={OFFER.phoneHref}
                className="inline-flex flex-wrap items-center justify-center gap-x-2 bg-[#FFD166] text-[#0F2240] font-bold text-sm sm:text-base px-5 py-2.5 rounded-full shadow-lg hover:bg-[#FFC233] transition-colors"
              >
                New clients: ${OFFER.amount} off your first cleaning · call {OFFER.phoneDisplay}
              </a>
            </div>

            <div className="w-full max-w-md mx-auto lg:max-w-none">
              <QuoteForm id="quote" placement="quote_page" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
