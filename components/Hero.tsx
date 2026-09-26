'use client'
import { useEffect, useRef } from 'react'
import ContactActions from '@/components/ContactActions'

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax on scroll
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Staggered entrance handled by CSS fadeInUp animation (see globals.css)
  // No JS needed — works in headless browsers and without hydration

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

        {/*
          Scrim tuned to the photo: this kitchen is bright white marble, so
          white type needs real coverage to stay readable. Lighter than a flat
          navy wash, but weighted behind the headline where the text sits.
        */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(180deg, rgba(15,34,64,0.58) 0%, rgba(15,34,64,0.52) 40%, rgba(15,34,64,0.50) 70%, rgba(15,34,64,0.72) 100%)',
          }}
        />

        {/* Teal accent top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00A896] z-10" />

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-24 w-full">
            <div className="max-w-4xl mx-auto text-center">
              {/* Eyebrow */}
              <div
                className="reveal inline-flex items-center gap-3 mb-6"
                style={{ animationDelay: '0ms' }}
              >
                <div className="w-10 h-px bg-white/70" />
                <span
                  className="text-white text-xs font-semibold tracking-[0.35em] uppercase"
                  style={{ textShadow: '0 1px 6px rgba(15,34,64,0.7)' }}
                >
                  Denver &amp; Aurora Cleaning Professionals
                </span>
                <div className="w-10 h-px bg-white/70" />
              </div>

              {/* H1 */}
              <h1
                className="reveal text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
                style={{
                  animationDelay: '120ms',
                  textShadow: '0 3px 24px rgba(15,34,64,0.75), 0 1px 3px rgba(15,34,64,0.5)',
                }}
              >
                Residential Cleaning<br className="hidden sm:inline" />
                {' '}Service Denver Metro
              </h1>

              {/* Italic tagline on a translucent band */}
              <p
                className="reveal inline-block bg-[#0F2240]/45 backdrop-blur-[2px] px-6 py-2.5 text-xl md:text-3xl font-light italic text-white leading-snug mb-9"
                style={{
                  animationDelay: '240ms',
                  textShadow: '0 2px 10px rgba(15,34,64,0.6)',
                }}
              >
                Spotless Results On YOUR Schedule!
              </p>

              {/* CTAs */}
              <div className="reveal" style={{ animationDelay: '360ms' }}>
                <ContactActions
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  bookLabel="Get A Free Quote"
                  primaryClassName="btn-book-now inline-flex items-center justify-center gap-2 bg-[#00A896] text-white font-bold text-base px-10 py-4 rounded-full shadow-lg"
                  secondaryClassName="inline-flex items-center justify-center gap-2 border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-white hover:text-[#0F2240] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge Strip */}
        <div
          className="reveal relative z-10 bg-[#0F2240]/45 backdrop-blur-sm border-t border-white/20"
          style={{ animationDelay: '500ms' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6 pb-36 sm:pb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '46', label: 'Five-Star Google Reviews' },
                { value: '100%', label: 'Licensed & Insured' },
                { value: '5.0★', label: 'Google Rating' },
                { value: '< 24h', label: 'Quote Response' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <div className="w-[2px] h-9 bg-[#00A896]" />
                  <div>
                    <div className="text-white font-bold text-lg leading-none">{b.value}</div>
                    <div className="text-white/75 text-xs tracking-wide mt-0.5">{b.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Hero
