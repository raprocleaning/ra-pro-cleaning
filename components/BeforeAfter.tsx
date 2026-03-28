'use client'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

const slides = [
  {
    label: 'Move-Out Magic',
    src: '/gallery/fridge-before-after.jpg',
    desc: 'Tenant move-out — full property restored to rental-ready condition',
    tag: 'Move-Out',
  },
  {
    label: 'Carpet Restoration',
    src: '/gallery/carpet-before-after.jpg',
    desc: 'Hot water extraction lifting deep stains and embedded dirt — looks brand new',
    tag: 'Carpet',
  },
  {
    label: 'Kitchen Deep Clean',
    src: '/gallery/kitchen-1.jpg',
    desc: 'Complete kitchen degreasing — oven, stovetop, cabinets, and floors',
    tag: 'Kitchen',
  },
  {
    label: 'Airbnb Turnover',
    src: '/gallery/fridge-before-after.jpg',
    desc: 'Fast professional turnover between guests — 5-star host rating guaranteed',
    tag: 'Airbnb',
  },
]

export default function BeforeAfter() {
  const [current, setCurrent] = useState(0)
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)
  const MIN_SWIPE = 50

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)), [])
  const next = useCallback(() => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)), [])

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.targetTouches[0].clientX }
  const onTouchMove = (e: React.TouchEvent) => { touchEnd.current = e.targetTouches[0].clientX }
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return
    const dist = touchStart.current - touchEnd.current
    if (Math.abs(dist) >= MIN_SWIPE) dist > 0 ? next() : prev()
    touchStart.current = null
    touchEnd.current = null
  }

  return (
    <section className="py-24 bg-[#F0FAFA] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,168,150,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Real Results
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F2240] tracking-tight mb-4">
            Before &amp; After
          </h2>
          <p className="text-[#4A6583] text-lg max-w-xl mx-auto">
            Every photo is from a real Denver client. Swipe to see the transformation.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex carousel-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.label} className="min-w-full">
                  <div className="group border border-[#B2DFDB] overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                    {/* Tag */}
                    <div className="absolute top-4 left-4 z-10 bg-[#00A896] text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5">
                      {slide.tag}
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={slide.src}
                        alt={`${slide.label} before and after cleaning`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 896px"
                        priority
                      />
                      {/* Before / After labels */}
                      <div className="absolute inset-0 flex">
                        <div className="flex-1 flex items-end p-5">
                          <span className="bg-[#0F2240]/80 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 backdrop-blur-sm">
                            Before
                          </span>
                        </div>
                        <div className="w-px bg-white/50" />
                        <div className="flex-1 flex items-end justify-end p-5">
                          <span className="bg-[#00A896]/90 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 backdrop-blur-sm">
                            After
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="bg-white px-6 py-5 flex items-center justify-between">
                      <div>
                        <p className="text-[#0F2240] font-bold text-base">{slide.label}</p>
                        <p className="text-[#4A6583] text-sm mt-0.5">{slide.desc}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 ml-4 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-[#00A896]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white border border-[#B2DFDB] shadow-lg w-12 h-12 flex items-center justify-center text-[#0F2240] hover:bg-[#00A896] hover:text-white hover:border-[#00A896] transition-all z-10 hidden md:flex"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white border border-[#B2DFDB] shadow-lg w-12 h-12 flex items-center justify-center text-[#0F2240] hover:bg-[#00A896] hover:text-white hover:border-[#00A896] transition-all z-10 hidden md:flex"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-[#00A896]' : 'w-2 bg-[#B2DFDB]'
              }`}
            />
          ))}
        </div>

        {/* Mobile swipe hint */}
        <p className="text-center text-[#4A6583] text-xs mt-3 md:hidden">Swipe to browse results</p>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 border-2 border-[#00A896] text-[#00A896] font-semibold px-8 py-4 hover:bg-[#00A896] hover:text-white transition-all duration-200"
          >
            See Full Gallery
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
