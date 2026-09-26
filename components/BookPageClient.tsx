'use client'
import { useEffect, useState } from 'react'
import BookingForm from '@/components/BookingForm'
import { isOnlineBookingOpen } from '@/lib/contactMode'

/**
 * Whether online booking is open right now. Null until mounted: the page is
 * prerendered, so the clock can only be read in the browser. Re-checked every
 * minute so the form appears at 6 PM without a reload.
 */
function useBookingOpen(): boolean | null {
  const [open, setOpen] = useState<boolean | null>(null)
  useEffect(() => {
    const check = () => setOpen(isOnlineBookingOpen())
    check()
    const id = setInterval(check, 60_000)
    return () => clearInterval(id)
  }, [])
  return open
}

/** Shown in place of the form during the day, when someone can pick up the phone. */
function BookingClosed() {
  return (
    <section className="px-6 pb-8">
      <div className="max-w-xl mx-auto bg-white border border-[#E3F1EF] rounded-3xl shadow-sm p-8 md:p-10 text-center">
        <p className="text-[#00A896] text-[11px] font-bold tracking-[0.28em] uppercase mb-4">
          We&rsquo;re open — talk to us now
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-[#0F2240] tracking-tight mb-3">
          Call or text for a quick quote
        </h2>
        <p className="text-[#4A6583] leading-relaxed mb-8">
          During the day our team books you directly by phone. Online booking
          opens every evening from <strong>5&nbsp;PM to 9&nbsp;AM</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:7206778799"
            className="bg-[#00A896] text-white font-bold px-8 py-4 rounded-full hover:bg-[#007A6C] transition-colors"
          >
            📞 Call (720) 677-8799
          </a>
          <a
            href="sms:7206778799"
            className="border-2 border-[#00A896] text-[#007A6C] font-bold px-8 py-4 rounded-full hover:bg-[#E6F7F5] transition-colors"
          >
            💬 Text us
          </a>
        </div>
      </div>
    </section>
  )
}

export default function BookPageClient() {
  const bookingOpen = useBookingOpen()

  return (
    <main className="min-h-screen bg-[#F8FFFE]">
      {/* ── HERO ── */}
      <section className="relative bg-[#0F2240] pt-32 pb-24 px-6 overflow-hidden">
        {/* Soft teal glow, purely decorative */}
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[46rem] h-[46rem] rounded-full opacity-[0.13] blur-3xl"
          style={{ background: 'radial-gradient(circle, #00A896 0%, transparent 65%)' }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-[#4ADEC8] text-[11px] font-bold tracking-[0.28em] uppercase mb-6">
            Instant Price · No Obligation
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
            Book your cleaning.<br />
            <span className="text-[#4ADEC8]">See the price first.</span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {bookingOpen === false
              ? 'Call or text now and we’ll price and schedule your cleaning in minutes.'
              : 'Pick your service and home size — your total updates as you go. No phone call, no card, no surprises.'}
          </p>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2.5 text-white/60 text-[13px]">
            {['⭐ 5.0 Google Rating', '46 Reviews', '🔒 Licensed & Insured', '👩 Women-Owned'].map(b => (
              <span key={b} className="bg-white/[0.07] border border-white/10 rounded-full px-4 py-1.5">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE BOOKING FORM ── A light sheet lifted over the hero */}
      <div className="relative z-10 -mt-12 bg-[#F8FFFE] rounded-t-[2.5rem] pt-12">
        {bookingOpen === null ? (
          <div className="min-h-[24rem]" aria-busy="true" />
        ) : bookingOpen ? (
          <BookingForm />
        ) : (
          <BookingClosed />
        )}
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 bg-white border-t border-[#EEF6F5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-[#0F2240] text-center tracking-tight mb-12">
            What happens next
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: '1', title: 'You book above', desc: 'Choose your service, home size and time. Your exact price is shown before you confirm.' },
              { step: '2', title: 'We call to confirm', desc: 'We reach out within 24 hours to lock in your slot and answer any questions.' },
              { step: '3', title: 'We clean', desc: 'Our insured team arrives on time and delivers a spotless, 5-star clean.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#00A896] text-xl font-black flex items-center justify-center mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#0F2240] mb-2">{item.title}</h3>
                <p className="text-[#4A6583] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[#4A6583] text-sm mt-14 text-center">
            Prefer to talk it through?{' '}
            <a href="tel:7206778799" className="text-[#00A896] font-bold hover:underline">
              (720) 677-8799
            </a>
          </p>
        </div>
      </section>

      {/* ── REVIEWS STRIP ── */}
      <section className="py-16 px-6 bg-[#0F2240]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#4ADEC8] text-xl tracking-[0.3em] mb-5">★★★★★</p>
          <p className="text-white text-xl md:text-2xl font-bold leading-snug mb-5">
            &ldquo;Fast response, friendly team, easy scheduling, and truly top-quality work.&rdquo;
          </p>
          <p className="text-white/45 text-sm">46 five-star Google reviews across Denver &amp; Aurora</p>
        </div>
      </section>
    </main>
  )
}
