'use client'
import { useScrollAnimationMultiple } from '@/hooks/useScrollAnimation'

const reasons = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Competitive Pricing',
    description:
      'Premium results at fair, transparent rates. No hidden fees — you always know exactly what you\'re paying for.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Professional Staff',
    description:
      'Trained, licensed, insured, and background-checked. Every member of our team is vetted for your peace of mind.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    title: 'Customized Service',
    description:
      'Every clean is tailored to your home, preferences, and specific needs. We listen before we start.',
  },
]

const WhyChooseUs = () => {
  const ref = useScrollAnimationMultiple(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#E6F7F5]"
      id="why-us"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="fade-in-up">
            <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F2240] tracking-tight leading-tight">
              The R A Pro<br />
              <span className="text-[#00A896]">Difference</span>
            </h2>
          </div>
          <div className="fade-in-up">
            <p className="text-[#4A6583] text-lg leading-relaxed">
              We don&apos;t just clean — we transform your space. With over 41 five-star reviews
              and years of experience serving Denver, our commitment to excellence speaks for itself.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#00A896]/10 border-2 border-[#00A896] flex items-center justify-center"
                  >
                    <span className="text-[#00A896] text-xs">★</span>
                  </div>
                ))}
              </div>
              <span className="text-[#4A6583] text-sm">41 verified 5-star reviews</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="fade-in-up group border border-[#B2DFDB] p-10 hover:border-[#00A896]/40 transition-all duration-300 relative overflow-hidden bg-white"
            >
              {/* Background hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A896]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="text-[#00A896] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F2240] mb-3 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-[#4A6583] leading-relaxed text-sm">{reason.description}</p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#00A896]/0 group-hover:border-[#00A896]/30 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-20 pt-16 border-t border-[#B2DFDB] grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { stat: '41', label: '5-Star Reviews' },
            { stat: '100%', label: 'Insured & Licensed' },
            { stat: '5+', label: 'Years Serving Denver' },
            { stat: '200+', label: 'Homes Cleaned' },
          ].map((item) => (
            <div key={item.label} className="fade-in-up text-center">
              <div className="text-4xl font-black text-[#00A896] mb-2">{item.stat}</div>
              <div className="text-[#4A6583] text-sm tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
