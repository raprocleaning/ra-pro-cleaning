'use client'

type CTABandProps = {
  eyebrow?: string
  heading: string
  subheading?: string
  /** Dark navy reads as a section break; teal reads as a push. Alternate them down the page. */
  variant?: 'teal' | 'navy'
}

const CTABand = ({
  eyebrow,
  heading,
  subheading,
  variant = 'teal',
}: CTABandProps) => {
  const isTeal = variant === 'teal'

  return (
    <section className={isTeal ? 'py-20 bg-[#00A896]' : 'py-20 bg-[#0F2240]'}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {eyebrow && (
            <p
              className={`text-xs font-semibold tracking-[0.35em] uppercase mb-4 ${
                isTeal ? 'text-white/80' : 'text-[#00A896]'
              }`}
            >
              {eyebrow}
            </p>
          )}

          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {heading}
          </h2>

          {subheading && (
            <p
              className={`text-lg leading-relaxed mb-9 ${
                isTeal ? 'text-white/85' : 'text-white/70'
              }`}
            >
              {subheading}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-book-now inline-flex items-center justify-center gap-2 font-bold px-10 py-4 rounded-full shadow-lg ${
                isTeal ? 'bg-white text-[#00A896]' : 'bg-[#00A896] text-white'
              }`}
            >
              Get A Free Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="tel:7206778799"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-[#0F2240] hover:border-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (720) 677-8799
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTABand
