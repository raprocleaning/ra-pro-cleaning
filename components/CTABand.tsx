'use client'
import ContactActions from '@/components/ContactActions'

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

          <ContactActions
            className="flex flex-col sm:flex-row gap-4 justify-center"
            bookLabel="Get A Free Quote"
            primaryClassName={`btn-book-now inline-flex items-center justify-center gap-2 font-bold px-10 py-4 rounded-full shadow-lg ${
              isTeal ? 'bg-white text-[#00A896]' : 'bg-[#00A896] text-white'
            }`}
            secondaryClassName="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-[#0F2240] hover:border-white transition-all"
          />
        </div>
      </div>
    </section>
  )
}

export default CTABand
