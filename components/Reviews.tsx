'use client'
import { useScrollAnimationMultiple } from '@/hooks/useScrollAnimation'

const reviews = [
  {
    name: 'Ali Sandoval',
    initials: 'AS',
    rating: 5,
    text: "I'm thoroughly impressed with the service. They dusted places I've never thought of dusting, my shower and toilet looked brand new, and every surface sparkled. Absolutely worth every penny — will be booking regularly.",
  },
  {
    name: 'Josh Hamilton',
    initials: 'JH',
    rating: 5,
    text: "We have been working with Houda for over a year now. She does an exceptional job going above and beyond! Our home always looks incredible after each visit. Highly recommend to anyone.",
  },
  {
    name: 'Jeannie Smitheram',
    initials: 'JS',
    rating: 5,
    text: "She and her staff were very professional and got the entire house cleaned spotlessly. She even cleaned the windows and all the baseboards — details most cleaners skip entirely. Outstanding service.",
  },
  {
    name: 'Kaltoum Loraoui',
    initials: 'KL',
    rating: 5,
    text: "The team did a wonderful job — Alex and Nicolas worked hard, were very efficient and left our home sparkling. Communication was excellent from start to finish. Five stars without hesitation.",
  },
]

const Reviews = () => {
  const ref = useScrollAnimationMultiple(0.05)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#F5F5F5]"
      id="reviews"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Client Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tight mb-6">
            What Denver Says
          </h2>

          {/* Star display */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-8 h-8 text-[#C8A96E]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[#6B6B6B] text-base">
              <span className="font-bold text-[#0A0A0A]">24</span> Five-Star Google Reviews
            </p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="fade-in-up bg-white p-8 border border-[#E0E0E0] hover:shadow-md hover:border-[#C8A96E]/30 transition-all duration-300 group"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#C8A96E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <p className="text-[#0A0A0A] leading-relaxed text-sm mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C8A96E] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0A0A0A]">{review.name}</p>
                  <p className="text-xs text-[#6B6B6B]">Verified Google Review</p>
                </div>
                <div className="ml-auto">
                  <svg className="w-6 h-6 text-[#E0E0E0]" viewBox="0 0 24 24" fill="currentColor">
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

        {/* CTA */}
        <div className="text-center mt-12 fade-in-up">
          <p className="text-[#6B6B6B] text-sm mb-4">
            Join hundreds of satisfied Denver homeowners
          </p>
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C8A96E] text-white font-semibold px-8 py-4 hover:bg-[#B8935A] transition-colors"
          >
            Experience the Difference
          </a>
        </div>
      </div>
    </section>
  )
}

export default Reviews
