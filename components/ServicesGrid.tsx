'use client'
import Link from 'next/link'
import { useScrollAnimationMultiple } from '@/hooks/useScrollAnimation'

const services = [
  {
    slug: 'deep-cleaning',
    name: 'Deep Cleaning',
    description:
      'Thorough cleaning of every room, surface, and corner. We get to the hard-to-reach spots others miss.',
    price: 'Starting at $700',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    slug: 'standard-cleaning',
    name: 'Standard Cleaning',
    description:
      'Recurring maintenance cleaning to keep your home consistently pristine and welcoming.',
    price: 'Starting at $600',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    slug: 'house-cleaning',
    name: 'House Cleaning',
    description:
      'Complete residential cleaning covering kitchen, bathrooms, bedrooms, living areas, and laundry rooms.',
    price: 'Custom quote',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    slug: 'office-cleaning',
    name: 'Office Cleaning',
    description:
      'Professional workspace cleaning to create a productive, healthy environment for your team.',
    price: 'Custom quote',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    slug: 'move-in-out',
    name: 'Move In/Out Cleaning',
    description:
      'Deep clean before or after a move — leave your old place spotless and start fresh in your new home.',
    price: 'Custom quote',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>
    ),
  },
  {
    slug: 'airbnb-cleaning',
    name: 'Airbnb Cleaning',
    description:
      'Fast, thorough turnover cleaning between guest stays to maintain your 5-star host rating.',
    price: 'Custom quote',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    slug: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    description:
      'Specialized deep clean for the most-used room in your home — appliances, cabinets, counters, and floors.',
    price: 'Custom quote',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    slug: 'bathroom-cleaning',
    name: 'Bathroom Cleaning',
    description:
      'Detailed bathroom sanitization from floor to ceiling — tiles, grout, fixtures, mirrors, and more.',
    price: 'Custom quote',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
  },
  {
    slug: 'bedroom-cleaning',
    name: 'Bedroom Cleaning',
    description:
      'Full bedroom refresh: dusting all surfaces, vacuuming, fresh linens, and everything in between.',
    price: 'Custom quote',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    slug: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    description:
      'Deep extraction cleaning to remove stains, allergens, and embedded dirt — leaving your carpets fresh, soft, and like new.',
    price: 'Custom quote',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18M10 3v18M14 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
  },
]

const ServicesGrid = () => {
  const ref = useScrollAnimationMultiple(0.05)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-white"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
            From routine maintenance to deep restoration — we handle every corner of your space.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E0E0E0]">
          {services.map((service) => (
            <div
              key={service.slug}
              className="fade-in-up bg-white p-8 group hover:shadow-lg hover:z-10 relative transition-all duration-300 border-t-2 border-t-transparent hover:border-t-[#C8A96E]"
            >
              <div className="text-[#C8A96E] mb-5 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 tracking-tight">
                {service.name}
              </h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#C8A96E] tracking-wide">
                  {service.price}
                </span>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-[#0A0A0A] tracking-wide hover:text-[#C8A96E] transition-colors flex items-center gap-1"
                >
                  Learn More
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 fade-in-up">
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C8A96E] text-white font-semibold px-8 py-4 hover:bg-[#B8935A] transition-colors"
          >
            Book Any Service
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesGrid
