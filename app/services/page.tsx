import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Services | R A Pro Cleaning Services Denver',
  description:
    'Professional cleaning services in Denver: deep cleaning, standard cleaning, house cleaning, office cleaning, Airbnb turnover, move in/out, and more.',
}

const services = [
  {
    slug: 'deep-cleaning',
    name: 'Deep Cleaning',
    description:
      'Our most thorough service — every room, surface, and corner gets the full treatment. Ideal for spring cleaning, post-renovation, or homes that need a reset.',
    price: 'Starting at $700',
    badge: 'Most Popular',
  },
  {
    slug: 'standard-cleaning',
    name: 'Standard Cleaning',
    description:
      'Recurring maintenance cleaning that keeps your home consistently clean and welcoming. Choose weekly, bi-weekly, or monthly visits.',
    price: 'Starting at $600',
    badge: 'Best Value',
  },
  {
    slug: 'house-cleaning',
    name: 'House Cleaning',
    description:
      'Complete residential cleaning covering every room in your home — kitchen, bathrooms, bedrooms, living areas, and laundry rooms.',
    price: 'Custom quote',
    badge: null,
  },
  {
    slug: 'office-cleaning',
    name: 'Office Cleaning',
    description:
      'Professional commercial cleaning for offices, retail spaces, and workplaces. Keep your team productive and your clients impressed.',
    price: 'Custom quote',
    badge: null,
  },
  {
    slug: 'move-in-out',
    name: 'Move In/Out Cleaning',
    description:
      "Deep clean before or after a move. Leave your old place in perfect condition and start fresh in your new home.",
    price: 'Custom quote',
    badge: null,
  },
  {
    slug: 'airbnb-cleaning',
    name: 'Airbnb Cleaning',
    description:
      'Fast, thorough turnover cleaning between guest stays. Maintain your 5-star host rating with a consistently pristine property.',
    price: 'Custom quote',
    badge: null,
  },
  {
    slug: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    description:
      'Specialized deep clean for your kitchen: appliances inside and out, cabinets, countertops, sink, backsplash, and floors.',
    price: 'Custom quote',
    badge: null,
  },
  {
    slug: 'bathroom-cleaning',
    name: 'Bathroom Cleaning',
    description:
      'Detailed bathroom sanitization from floor to ceiling: tiles, grout, toilet, tub, shower, vanity, mirrors, and fixtures.',
    price: 'Custom quote',
    badge: null,
  },
  {
    slug: 'bedroom-cleaning',
    name: 'Bedroom Cleaning',
    description:
      'Full bedroom refresh: dusting all surfaces, vacuuming, changing linens, cleaning under furniture, and organizing.',
    price: 'Custom quote',
    badge: null,
  },
]

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="bg-[#1A2B4B] py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 50%, rgba(200,169,110,0.3) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[#4A90D9] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            What We Offer
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Professional cleaning solutions for every space in Denver and the surrounding metro area.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.slug}
                className="border border-[#C8DFEF] p-8 hover:shadow-lg hover:border-[#4A90D9] transition-all duration-300 group relative"
              >
                {service.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#4A90D9] text-white text-xs font-semibold px-3 py-1 tracking-wide">
                      {service.badge}
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-bold text-[#1A2B4B] mb-3 tracking-tight group-hover:text-[#4A90D9] transition-colors">
                  {service.name}
                </h2>
                <p className="text-[#4A6583] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#4A90D9] font-semibold text-sm">{service.price}</span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm font-semibold text-[#1A2B4B] hover:text-[#4A90D9] transition-colors flex items-center gap-1"
                  >
                    Details
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#4A90D9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready for a Spotless Space?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book online in 60 seconds or call us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://link.msgsndr.com/widget/booking/a9pioIsReFA47or9v8G3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#4A90D9] font-bold px-8 py-4 hover:bg-[#EBF4FF] transition-colors"
            >
              Book Now
            </a>
            <a
              href="tel:7206778799"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 hover:bg-white/10 transition-colors"
            >
              720-677-8799
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
