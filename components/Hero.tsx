'use client'
import { useEffect, useRef } from 'react'
import QuoteForm from '@/components/QuoteForm'

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

        {/* Content: the pitch on the left, the free-quote form on the right
            (stacked on phones, form second so the headline is seen first). */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12 sm:py-24 w-full">
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
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
                </div>

                {/* H1 */}
                <h1
                  className="reveal text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6"
                  style={{
                    animationDelay: '120ms',
                    textShadow: '0 3px 24px rgba(15,34,64,0.75), 0 1px 3px rgba(15,34,64,0.5)',
                  }}
                >
                  House Cleaning Services in the Denver Metro
                </h1>

                {/* Italic tagline on a translucent band */}
                <p
                  className="reveal inline-block bg-[#0F2240]/45 backdrop-blur-[2px] px-6 py-2.5 text-xl md:text-2xl font-light italic text-white leading-snug mb-7"
                  style={{
                    animationDelay: '240ms',
                    textShadow: '0 2px 10px rgba(15,34,64,0.6)',
                  }}
                >
                  Spotless Results On YOUR Schedule!
                </p>

                {/* Why us, in four lines */}
                <ul
                  className="reveal hidden sm:block space-y-2.5 mb-7 text-white text-base md:text-lg text-left max-w-md mx-auto lg:mx-0"
                  style={{ animationDelay: '280ms', textShadow: '0 1px 6px rgba(15,34,64,0.7)' }}
                >
                  {[
                    'Licensed, insured, women-owned local team',
                    'Standard, deep, move-in/out & commercial cleaning',
                    'Rated 4.9★ on Google',
                    'Free quote — we call or text you back fast',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <svg className="w-5 h-5 mt-0.5 text-[#5EEAD4] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {line}
                    </li>
                  ))}
                </ul>

              </div>

              {/* Free-quote form */}
              <div className="reveal w-full max-w-md mx-auto lg:max-w-none" style={{ animationDelay: '360ms' }}>
                <QuoteForm id="quote" placement="hero" heading="Get Your Free Quote Today" />
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
                { value: '49', label: 'Google Reviews' },
                { value: '100%', label: 'Licensed & Insured' },
                { value: '4.9★', label: 'Google Rating' },
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
