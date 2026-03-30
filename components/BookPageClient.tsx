'use client'
import { useEffect } from 'react'

const SERVICES = [
  { name: 'Standard Cleaning',       icon: '🏠', from: 155,  desc: 'Regular maintenance clean' },
  { name: 'Deep Cleaning',           icon: '✨', from: 200,  desc: 'Top-to-bottom thorough clean' },
  { name: 'Move In/Out Cleaning',    icon: '📦', from: 235,  desc: 'Full clean for transitions' },
  { name: 'Airbnb Cleaning',         icon: '🛎️', from: 90,   desc: 'Fast turnovers, 5-star ready' },
  { name: 'Office Cleaning',         icon: '🏢', from: 155,  desc: 'Professional commercial clean' },
  { name: 'Post-Construction',       icon: '🔨', from: 200,  desc: '$0.20/sqft — debris & dust' },
  { name: 'Carpet Cleaning',         icon: '🧹', from: null, desc: 'Custom quote by room' },
]

export default function BookPageClient() {
  // Auto-open the AI chat widget when this page loads
  useEffect(() => {
    const openChat = () => {
      // Find and click the "Get Instant Quote" button
      const btn = Array.from(document.querySelectorAll('button')).find(
        (b) => b.getAttribute('aria-label') === 'Get Instant Quote' || b.innerText?.trim() === 'Get Instant Quote'
      )
      if (btn) {
        btn.click()
      } else {
        // Retry after a short delay if widget not mounted yet
        setTimeout(openChat, 400)
      }
    }
    const timer = setTimeout(openChat, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-[#F8FFFE]">
      {/* ── HERO ── */}
      <section className="bg-[#0F2240] pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#00A896]" />
            <span className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase">
              Instant Quote · No Obligation
            </span>
            <div className="w-8 h-px bg-[#00A896]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Book Your Denver Cleaning<br />
            <span className="text-[#00A896]">Get a Price in 60 Seconds</span>
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Our AI assistant gives you an instant quote — no phone call needed.
            Licensed, insured &amp; 5-star rated across Denver.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-white/50 text-sm">
            {['⭐ 5.0 Google Rating', '✅ 50+ Reviews', '🔒 Licensed & Insured', '👩 Women-Owned'].map(b => (
              <span key={b} className="flex items-center gap-1">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES CARDS ── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[#0F2240] font-bold text-lg mb-8">
            Choose a service — our AI will give you an exact price instantly 👇
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <button
                key={s.name}
                onClick={() => {
                  // Open chat widget
                  const btn = Array.from(document.querySelectorAll('button')).find(
                    b => b.getAttribute('aria-label') === 'Get Instant Quote' || b.innerText?.trim() === 'Get Instant Quote'
                  )
                  btn?.click()
                }}
                className="bg-white border-2 border-[#B2DFDB] rounded-xl p-5 text-left hover:border-[#00A896] hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <p className="font-bold text-[#0F2240] text-sm group-hover:text-[#00A896] transition-colors leading-tight mb-1">
                  {s.name}
                </p>
                <p className="text-[#4A6583] text-xs mb-2">{s.desc}</p>
                {s.from ? (
                  <p className="text-[#00A896] font-black text-sm">From ${s.from}</p>
                ) : (
                  <p className="text-[#00A896] font-black text-sm">Custom quote</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F2240] text-center mb-10">
            Book in 3 Easy Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Get Instant Quote', desc: 'Tell our AI your service, home size, and preferences. Get a price in under 60 seconds.' },
              { step: '2', title: 'Share Your Details', desc: 'Give us your name, phone & preferred date. No credit card required upfront.' },
              { step: '3', title: 'We Confirm & Clean', desc: 'We call you within 24 hours to confirm. Our team shows up and delivers a spotless clean.' },
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

          <div className="mt-12 text-center">
            <button
              onClick={() => {
                const btn = Array.from(document.querySelectorAll('button')).find(
                  b => b.getAttribute('aria-label') === 'Get Instant Quote' || b.innerText?.trim() === 'Get Instant Quote'
                )
                btn?.click()
              }}
              className="inline-flex items-center gap-3 bg-[#00A896] hover:bg-[#007A6C] text-white font-bold px-10 py-4 rounded-none shadow-lg transition-colors text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              Get My Instant Quote Now
            </button>
            <p className="text-[#4A6583] text-sm mt-3">
              Or call us directly: <a href="tel:7206778799" className="text-[#00A896] font-semibold">(720) 677-8799</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICING SNAPSHOT ── */}
      <section className="py-14 px-6 bg-[#E6F7F5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F2240] text-center mb-2">
            Transparent Pricing — No Surprises
          </h2>
          <p className="text-[#4A6583] text-center mb-10 text-sm">
            10% below Denver market average. Prices based on square footage.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { service: 'Standard Cleaning', range: '$155 – $375', note: 'Based on sqft' },
              { service: 'Deep Cleaning',     range: '$200 – $490', note: 'Standard +30%' },
              { service: 'Move In/Out',        range: '$235 – $565', note: 'Standard +50%' },
              { service: 'Airbnb Cleaning',   range: '$90 – $340',  note: 'Quick turnovers' },
              { service: 'Office Cleaning',   range: '$155 – $520', note: 'Commercial spaces' },
              { service: 'Post-Construction', range: '$200 – $1,100', note: '~$0.20/sqft' },
            ].map((p) => (
              <div key={p.service} className="bg-white rounded-xl p-5 border border-[#B2DFDB]">
                <p className="font-bold text-[#0F2240] text-sm mb-1">{p.service}</p>
                <p className="text-[#00A896] font-black text-xl mb-1">{p.range}</p>
                <p className="text-[#4A6583] text-xs">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS STRIP ── */}
      <section className="py-12 px-6 bg-[#0F2240]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white font-black text-2xl mb-2">★★★★★</p>
          <p className="text-white text-lg font-bold mb-1">50+ Five-Star Google Reviews</p>
          <p className="text-white/50 text-sm mb-8">
            &ldquo;Fast response, friendly team, easy scheduling, and truly top-quality work.&rdquo;
          </p>
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00A896] text-white font-bold px-10 py-4 hover:bg-[#007A6C] transition-colors"
          >
            Book Online Now →
          </a>
        </div>
      </section>
    </main>
  )
}
