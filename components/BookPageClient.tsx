'use client'
import BookingForm from '@/components/BookingForm'

export default function BookPageClient() {
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
            Pick your service and home size — your total updates as you go.
            No phone call, no card, no surprises.
          </p>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2.5 text-white/60 text-[13px]">
            {['⭐ 5.0 Google Rating', '45 Reviews', '🔒 Licensed & Insured', '👩 Women-Owned'].map(b => (
              <span key={b} className="bg-white/[0.07] border border-white/10 rounded-full px-4 py-1.5">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE BOOKING FORM ── A light sheet lifted over the hero */}
      <div className="relative z-10 -mt-12 bg-[#F8FFFE] rounded-t-[2.5rem] pt-12">
        <BookingForm />
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
          <p className="text-white/45 text-sm">45 five-star Google reviews across Denver &amp; Aurora</p>
        </div>
      </section>
    </main>
  )
}
