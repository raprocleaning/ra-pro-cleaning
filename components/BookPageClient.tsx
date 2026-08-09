'use client'
import BookingForm from '@/components/BookingForm'

export default function BookPageClient() {
  return (
    <main className="min-h-screen bg-[#F8FFFE]">
      {/* ── HERO ── */}
      <section className="bg-[#0F2240] pt-32 pb-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#00A896]" />
            <span className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase">
              Instant Price · No Obligation
            </span>
            <div className="w-8 h-px bg-[#00A896]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Book Your Denver Metro Cleaning<br />
            <span className="text-[#00A896]">See Your Exact Price First</span>
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Pick your service and home size — your total updates instantly. No phone
            call needed, no card required. Licensed, insured &amp; 5-star rated across
            Denver and Aurora.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-white/50 text-sm">
            {['⭐ 5.0 Google Rating', '✅ 45 Google Reviews', '🔒 Licensed & Insured', '👩 Women-Owned'].map(b => (
              <span key={b} className="flex items-center gap-1">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE BOOKING FORM ── */}
      <BookingForm />

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-6 bg-white border-t border-[#E6F7F5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F2240] text-center mb-10">
            What Happens Next
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'You Book Above', desc: 'Choose your service, home size and time. Your exact price is shown before you confirm.' },
              { step: '2', title: 'We Call to Confirm', desc: 'We reach out within 24 hours to lock in your slot and answer any questions.' },
              { step: '3', title: 'We Clean', desc: 'Our insured team arrives on time and delivers a spotless, 5-star clean.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#00A896] text-white text-2xl font-black flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#0F2240] mb-2">{item.title}</h3>
                <p className="text-[#4A6583] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[#4A6583] text-sm mt-10 text-center">
            Prefer to talk it through?{' '}
            <a href="tel:7206778799" className="text-[#00A896] font-semibold">(720) 677-8799</a>
          </p>
        </div>
      </section>

      {/* ── REVIEWS STRIP ── */}
      <section className="py-12 px-6 bg-[#0F2240]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white font-black text-2xl mb-2">★★★★★</p>
          <p className="text-white text-lg font-bold mb-1">45 Five-Star Google Reviews</p>
          <p className="text-white/50 text-sm">
            &ldquo;Fast response, friendly team, easy scheduling, and truly top-quality work.&rdquo;
          </p>
        </div>
      </section>
    </main>
  )
}
