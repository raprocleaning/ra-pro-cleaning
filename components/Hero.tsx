'use client'
import { useEffect, useRef } from 'react'

const Hero = () => {
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current]
    els.forEach((el, i) => {
      if (!el) return
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 100 + i * 150)
    })
    if (badgeRef.current) {
      setTimeout(() => {
        if (badgeRef.current) {
          badgeRef.current.style.opacity = '1'
          badgeRef.current.style.transform = 'translateY(0)'
        }
      }, 800)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background Photo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/gallery/kitchen-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(40%)',
        }}
      />

      {/* Light blue-white overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(235,244,255,0.75) 0%, rgba(240,248,255,0.65) 100%)',
        }}
      />

      {/* Sky blue accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#4A90D9] z-10" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 mb-8"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
            >
              <div className="w-8 h-[1px] bg-[#4A90D9]" />
              <span className="text-[#4A90D9] text-xs font-semibold tracking-[0.3em] uppercase">
                Denver&apos;s Premium Cleaning Experience
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1A2B4B] leading-[1.05] tracking-tight mb-6"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
            >
              Denver&apos;s Premier<br />
              <span className="text-[#4A90D9]">Cleaning</span> Service
            </h1>

            {/* Sub-headline */}
            <p
              ref={subRef}
              className="text-xl md:text-2xl text-[#4A6583] font-light tracking-wide mb-10"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
            >
              Residential. Commercial. <span className="text-[#1A2B4B] font-medium">Spotless.</span>
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
            >
              <a
                href="https://raprocleaningservices.bookingkoala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#4A90D9] text-white font-semibold text-base px-8 py-4 hover:bg-[#357ABD] transition-colors"
              >
                Book Your Clean
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:7206778799"
                className="inline-flex items-center justify-center gap-2 border border-[#C8DFEF] text-[#1A2B4B] font-medium text-base px-8 py-4 hover:border-[#4A90D9] hover:text-[#4A90D9] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                720-677-8799
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge Strip */}
      <div
        ref={badgeRef}
        className="relative z-10 border-t border-[#C8DFEF]"
        style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '24', label: 'Five-Star Reviews' },
              { value: '100%', label: 'Licensed & Insured' },
              { value: '5★', label: 'Google Rating' },
              { value: '24h', label: 'Booking Response' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <div className="w-[1px] h-8 bg-[#4A90D9]" />
                <div>
                  <div className="text-[#1A2B4B] font-bold text-lg leading-none">{badge.value}</div>
                  <div className="text-[#4A6583] text-xs tracking-wide mt-0.5">{badge.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
