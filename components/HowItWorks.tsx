'use client'
import { useScrollAnimationMultiple } from '@/hooks/useScrollAnimation'

const steps = [
  {
    number: '01',
    title: 'Book Online',
    description:
      'Schedule in 60 seconds through our easy online booking portal. Choose your service, date, and any special instructions.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Clean',
    description:
      'Our professional, background-checked team arrives on time and gets to work. Every nook, cranny, and surface — done right.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Enjoy',
    description:
      'Come home to a spotless, fresh space. Relax and enjoy your time while we handle all the cleaning.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
]

const HowItWorks = () => {
  const ref = useScrollAnimationMultiple(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-white"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 fade-in-up">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            The Process
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F2240] tracking-tight">
            How It Works
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16.666%] right-[16.666%] h-[1px] bg-[#E0E0E0] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="fade-in-up flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative mb-8">
                  <div className="w-32 h-32 border-2 border-[#B2DFDB] bg-white flex flex-col items-center justify-center group hover:border-[#00A896] transition-colors duration-300">
                    <div className="text-[#00A896] mb-1">{step.icon}</div>
                    <span className="text-xs text-[#4A6583] font-medium tracking-widest">{step.number}</span>
                  </div>
                  {/* Gold dot connector */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 translate-x-full -translate-y-1/2 w-full h-[1px]" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#0F2240] mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#4A6583] text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 fade-in-up">
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0F2240] text-white font-semibold px-8 py-4 hover:bg-[#00A896] transition-colors duration-300"
          >
            Start Now — Book in 60 Seconds
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
