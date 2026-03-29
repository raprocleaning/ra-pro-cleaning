'use client'
import { useEffect, useRef, useState } from 'react'

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [showStickyBtn, setShowStickyBtn] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax on scroll
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.35}px)`
      }
      // Show sticky CTA after scrolling past hero
      setShowStickyBtn(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Staggered entrance
  useEffect(() => {
    const els = contentRef.current?.querySelectorAll('[data-animate]')
    els?.forEach((el, i) => {
      setTimeout(() => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'translateY(0)'
      }, 120 + i * 160)
    })
  }, [])

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            ref={parallaxRef}
            className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
            style={{ backgroundImage: 'url(/gallery/kitchen-3.jpg)' }}
          />
        </div>

        {/* Dark gradient overlay — luxury feel */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(120deg, rgba(15,34,64,0.82) 0%, rgba(15,34,64,0.55) 60%, rgba(0,168,150,0.15) 100%)',
          }}
        />

        {/* Teal accent top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00A896] z-10" />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 flex-1 flex items-center"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-36 w-full">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div
                data-animate
                className="inline-flex items-center gap-3 mb-8"
                style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
              >
                <div className="w-10 h-px bg-[#00A896]" />
                <span className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase">
                  Denver&apos;s Premier Cleaning Experience
                </span>
              </div>

              {/* H1 */}
              <h1
                data-animate
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
                style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
              >
                Denver&apos;s Premier<br />
                <span className="text-[#00A896]">Cleaning</span> &bull;<br />
                <span className="text-white/90 text-4xl md:text-5xl font-light">Residential &amp; Commercial</span>
              </h1>

              {/* Sub */}
              <p
                data-animate
                className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-10"
                style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
              >
                Spotless Results — Every Time. Licensed, Insured &amp; 5-Star Rated.
              </p>

              {/* CTAs */}
              <div
                data-animate
                className="flex flex-col sm:flex-row gap-4"
                style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
              >
                <a
                  href="https://raprocleaningservices.bookingkoala.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-book-now inline-flex items-center justify-center gap-2 bg-[#00A896] text-white font-bold text-base px-10 py-4 rounded-none shadow-lg"
                >
                  Book Your Clean Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="tel:7206778799"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-medium text-base px-8 py-4 hover:border-white hover:bg-white/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (720) 677-8799
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge Strip */}
        <div
          data-animate
          className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/20"
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '41+', label: 'Five-Star Reviews' },
                { value: '100%', label: 'Licensed & Insured' },
                { value: '5.0★', label: 'Google Rating' },
                { value: '< 24h', label: 'Quote Response' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <div className="w-[2px] h-9 bg-[#00A896]" />
                  <div>
                    <div className="text-white font-bold text-lg leading-none">{b.value}</div>
                    <div className="text-white/60 text-xs tracking-wide mt-0.5">{b.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING STICKY CTA ──────────────────────────────────── */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showStickyBtn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="https://raprocleaningservices.bookingkoala.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-book-now flex items-center gap-2 bg-[#00A896] text-white font-bold px-6 py-4 shadow-2xl text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book Now
        </a>
      </div>
    </>
  )
}

export default Hero
