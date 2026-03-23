import Link from 'next/link'

const plans = [
  {
    name: 'Standard Cleaning',
    price: 'From $200',
    highlight: false,
    desc: 'Perfect for regular maintenance — keeps your home consistently clean between deep cleans.',
    features: [
      'All rooms dusted & vacuumed',
      'Kitchen surfaces & appliances wiped',
      'Bathrooms sanitized',
      'Floors mopped',
      'Weekly, bi-weekly, or monthly',
    ],
    href: '/services/standard-cleaning',
  },
  {
    name: 'Deep Cleaning',
    price: 'From $300',
    highlight: true,
    desc: 'A thorough top-to-bottom clean — every surface, corner, cabinet interior, baseboard, and appliance.',
    features: [
      'Everything in Standard Clean',
      'Inside cabinets & appliances',
      'Baseboards, vents & ceiling fans',
      'Window sills & tracks',
      'Ideal for first-time clients',
    ],
    href: '/services/deep-cleaning',
  },
  {
    name: 'Specialty Services',
    price: 'Custom Quote',
    highlight: false,
    desc: 'Tailored for moves, Airbnb turnovers, office spaces, and carpet cleaning.',
    features: [
      'Move In / Move Out',
      'Airbnb Turnover Cleaning',
      'Office & Commercial',
      'Carpet Hot-Water Extraction',
      'Priced by size & scope',
    ],
    href: '/contact',
  },
]

export default function Pricing() {
  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tight mb-4">
            Simple, Honest Rates
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
            No hidden fees, no surprises. Every job is done right the first time.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col border transition-shadow duration-300 hover:shadow-lg ${
                plan.highlight
                  ? 'border-[#C8A96E] shadow-md relative'
                  : 'border-[#E0E0E0]'
              }`}
            >
              {plan.highlight && (
                <div className="bg-[#C8A96E] text-white text-xs font-bold tracking-[0.2em] uppercase text-center py-2">
                  Most Popular
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                <p className="text-xs font-semibold text-[#C8A96E] tracking-[0.2em] uppercase mb-2">
                  {plan.name}
                </p>
                <p className="text-3xl font-black text-[#0A0A0A] mb-3">{plan.price}</p>
                <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">{plan.desc}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#0A0A0A]">
                      <svg className="w-4 h-4 text-[#C8A96E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.name === 'Specialty Services' ? '/contact' : 'https://raprocleaningservices.bookingkoala.com'}
                  target={plan.name === 'Specialty Services' ? undefined : '_blank'}
                  rel={plan.name === 'Specialty Services' ? undefined : 'noopener noreferrer'}
                  className={`w-full text-center py-3.5 font-semibold text-sm tracking-wide transition-colors ${
                    plan.highlight
                      ? 'bg-[#C8A96E] text-white hover:bg-[#B8935A]'
                      : 'border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E] hover:text-white'
                  }`}
                >
                  {plan.name === 'Specialty Services' ? 'Get a Free Quote' : 'Book Now'}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#6B6B6B] mt-8">
          All prices vary based on home size and condition. Free estimates available —
          <Link href="/contact" className="text-[#C8A96E] hover:underline ml-1">contact us</Link>.
        </p>
      </div>
    </section>
  )
}
