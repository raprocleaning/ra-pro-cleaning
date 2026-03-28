'use client'
import { useState, useCallback, useRef } from 'react'

const reviews = [
  {
    name: 'Kelli Ramona',
    initials: 'KR',
    rating: 5,
    text: "Houda and her team did an AMAZING job deep cleaning our family home. We have 3 boys and needless to say, our house needed help! They cleaned every nook and cranny. Professional, friendly, positive and an absolute pleasure to work with. Highly recommend!",
  },
  {
    name: 'Angela Csargo',
    initials: 'AC',
    rating: 5,
    text: "Houda is the best cleaning lady I've ever had. She is detailed, precise, and has a high level of integrity. She is someone you can count on for a service that will exceed your expectations. I am so blessed she was referred to me.",
  },
  {
    name: 'Josh Hamilton',
    initials: 'JH',
    rating: 5,
    text: "We have been working with Houda for over a year now. She does an exceptional job going above and beyond! Our home always looks incredible after each visit. Highly recommend to anyone.",
  },
  {
    name: 'Regan Dean',
    initials: 'RD',
    rating: 5,
    text: "Highly recommend RA Pros! After maintenance work in our home, they were able to come in quickly and leave everything spotless and ready for future renters. Fast response time, friendly team, easy scheduling, and truly top-quality work.",
  },
  {
    name: 'Jeannie Smitheram',
    initials: 'JS',
    rating: 5,
    text: "She and her staff were very professional and got the entire house cleaned spotlessly. She even cleaned the windows and all the baseboards — details most cleaners skip entirely. Outstanding service.",
  },
  {
    name: 'Melanie Wheeler',
    initials: 'MW',
    rating: 5,
    text: "My new purchase was horrific with junk, dirt, grime, and trash. The team was professional and incredibly detailed. An overall great experience. Highly recommend.",
  },
  {
    name: 'Mack Limon',
    initials: 'ML',
    rating: 5,
    text: "She's professional, affordable, and reliable. Her team did so good — I'd definitely recommend RA Pro Cleaning to anyone looking for a trustworthy cleaning service.",
  },
  {
    name: 'Leah Stallone',
    initials: 'LS',
    rating: 5,
    text: "They left my house clean as can be. Very happy and will be a repeat client. Thank you!",
  },
]

const VISIBLE = 3

const Reviews = () => {
  const [current, setCurrent] = useState(0)
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)

  const maxIndex = reviews.length - VISIBLE
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, maxIndex)), [maxIndex])

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.targetTouches[0].clientX }
  const onTouchMove = (e: React.TouchEvent) => { touchEnd.current = e.targetTouches[0].clientX }
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return
    const dist = touchStart.current - touchEnd.current
    if (Math.abs(dist) >= 50) dist > 0 ? next() : prev()
    touchStart.current = null; touchEnd.current = null
  }

  return (
    <section className="py-24 bg-[#F0FAFA]" id="reviews">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Client Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F2240] tracking-tight mb-6">
            What Denver Says
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-7 h-7 text-[#00A896]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[#4A6583] text-base">
              <span className="font-bold text-[#0F2240]">41</span> Verified Five-Star Google Reviews
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {['Licensed & Insured', 'Background-Checked', '5-Star Rated', 'Denver Local'].map((b) => (
            <span key={b} className="inline-flex items-center gap-2 bg-white border border-[#B2DFDB] px-4 py-2 text-xs font-semibold text-[#0F2240] tracking-wide shadow-sm">
              <svg className="w-3.5 h-3.5 text-[#00A896]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {b}
            </span>
          ))}
        </div>

        {/* Desktop grid — 3 columns */}
        <div className="hidden md:block relative overflow-hidden">
          <div
            className="carousel-track gap-6"
            style={{ transform: `translateX(calc(-${current} * (33.333% + 8px)))` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="min-w-[calc(33.333%-16px)] bg-white p-8 border border-[#B2DFDB] hover:shadow-lg hover:border-[#00A896]/40 transition-all duration-300 flex-shrink-0"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#00A896]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#0F2240] leading-relaxed text-sm mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00A896] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0F2240]">{review.name}</p>
                    <p className="text-xs text-[#4A6583]">Verified Google Review</p>
                  </div>
                  <div className="ml-auto">
                    <svg className="w-5 h-5 text-[#DADADA]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop arrows */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white border border-[#B2DFDB] shadow-md w-12 h-12 flex items-center justify-center text-[#0F2240] hover:bg-[#00A896] hover:text-white hover:border-[#00A896] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white border border-[#B2DFDB] shadow-md w-12 h-12 flex items-center justify-center text-[#0F2240] hover:bg-[#00A896] hover:text-white hover:border-[#00A896] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile: vertical stack (first 4) */}
        <div className="md:hidden space-y-4">
          {reviews.slice(0, 4).map((review, idx) => (
            <div key={idx} className="bg-white p-6 border border-[#B2DFDB]">
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#00A896]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#0F2240] text-sm leading-relaxed italic mb-4">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#00A896] flex items-center justify-center text-white font-bold text-xs">
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0F2240]">{review.name}</p>
                  <p className="text-xs text-[#4A6583]">Verified Google Review</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[#4A6583] text-sm mb-4">Join hundreds of satisfied Denver homeowners</p>
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-book-now inline-flex items-center gap-2 bg-[#00A896] text-white font-bold px-10 py-4 shadow-md"
          >
            Book Your Clean Today
          </a>
        </div>
      </div>
    </section>
  )
}

export default Reviews
