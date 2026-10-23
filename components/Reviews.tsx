'use client'
import { useState } from 'react'

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

const Reviews = () => {
  const [hovered, setHovered] = useState(false)
  // Set by the Pause button, so keyboard and screen-reader visitors can stop
  // the motion too, not only people with a mouse or a finger.
  const [stopped, setStopped] = useState(false)
  const paused = hovered || stopped

  return (
    <section className="py-24 bg-[#F0FAFA]" id="reviews">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Client Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F2240] tracking-tight mb-6">
            What Denver Metro Says
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
              <span className="font-bold text-[#0F2240]">48</span> Verified Five-Star Google Reviews
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {['Licensed & Insured', 'Professional Team', '5-Star Rated', 'Denver Metro Local'].map((b) => (
            <span key={b} className="inline-flex items-center gap-2 bg-white border border-[#B2DFDB] px-4 py-2 text-xs font-semibold text-[#0F2240] tracking-wide shadow-sm">
              <svg className="w-3.5 h-3.5 text-[#00A896]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {b}
            </span>
          ))}
        </div>

        {/* Every review rolls past on its own, phone and desktop alike. The
            list is drawn twice so the loop has no gap; the second copy is
            hidden from screen readers. Hovering, touching or the Pause button
            stops it. */}
        <div
          className="reviews-viewport -mx-6 lg:-mx-8"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setHovered(false)}
        >
          <div className={`reviews-marquee${paused ? ' is-paused' : ''}`}>
            {[0, 1].map((copy) =>
              reviews.map((review) => (
                <div key={`${copy}-${review.name}`} className="pr-5 md:pr-6" aria-hidden={copy === 1 || undefined}>
                  <figure className="w-[290px] md:w-[380px] h-full bg-white p-6 md:p-8 border border-[#B2DFDB] shadow-sm flex flex-col">
                    <div className="flex gap-0.5 mb-4 md:mb-5" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-[#00A896]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-[#0F2240] leading-relaxed text-sm mb-6 italic flex-1">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00A896] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {review.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#0F2240]">{review.name}</p>
                        <p className="text-xs text-[#4A6583]">Verified Google Review</p>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            aria-pressed={stopped}
            className="reviews-toggle inline-flex items-center gap-2 text-xs font-semibold text-[#0F2240] border border-[#B2DFDB] bg-white px-4 py-2 hover:border-[#00A896] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00A896]"
          >
            {stopped ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6 4l10 6-10 6V4z" /></svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 4h3v12H5zM12 4h3v12h-3z" /></svg>
            )}
            {stopped ? 'Play reviews' : 'Pause reviews'}
          </button>
        </div>

        {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-[#4A6583] text-sm mb-4">Join satisfied homeowners across Denver and Aurora</p>
            <a
              href="/book"
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
