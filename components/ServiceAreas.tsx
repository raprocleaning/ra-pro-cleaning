'use client'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'

// `slug` means we publish a landing page for that city, so the tile links to it.
// Neighborhood tiles have no page of their own and stay as plain text.
const AREAS: { name: string; desc: string; slug?: string }[] = [
  { name: 'Denver', desc: 'All Denver neighborhoods', slug: 'denver' },
  { name: 'Aurora', desc: 'Homes & commercial spaces', slug: 'aurora' },
  { name: 'Lakewood', desc: 'Mid-century homes & recurring', slug: 'lakewood' },
  { name: 'Englewood', desc: 'Houses & Airbnb properties', slug: 'englewood' },
  { name: 'Littleton', desc: 'Deep clean & recurring', slug: 'littleton' },
  { name: 'Centennial', desc: 'Luxury homes & offices', slug: 'centennial' },
  { name: 'Greenwood Village', desc: 'Premium residential', slug: 'greenwood-village' },
  { name: 'Arvada', desc: 'New builds & post-construction', slug: 'arvada' },
  { name: 'Westminster', desc: 'Townhomes & rental turnovers', slug: 'westminster' },
  { name: 'Thornton', desc: 'New builds & move-ins', slug: 'thornton' },
  { name: 'Cherry Creek', desc: 'Luxury residential & condos' },
  { name: 'Country Club', desc: 'Historic estates & townhomes' },
  { name: 'Belcaro', desc: 'Established homes & estates' },
  { name: 'Washington Park', desc: 'Residential & deep cleans' },
  { name: 'Observatory Park', desc: 'Family homes & deep cleans' },
  { name: 'Bonnie Brae', desc: 'Character homes & recurring' },
  { name: 'University Hills', desc: 'Residential & recurring' },
  { name: 'Hilltop', desc: 'Premium homes & move-outs' },
  { name: 'Crestmoor', desc: 'Large homes & recurring' },
  { name: 'Lowry', desc: 'Modern homes & townhouses' },
  { name: 'Stapleton / Central Park', desc: 'New builds & move-ins' },
  { name: 'Capitol Hill', desc: 'Apartments & historic homes' },
  { name: 'Highlands', desc: 'Homes & short-term rentals' },
  { name: 'LoDo', desc: 'Lofts, condos & offices' },
  { name: 'Glendale', desc: 'Condos & apartment turnovers' },
  { name: 'Cherry Hills Village', desc: 'Estates & premium residential' },
  { name: 'Denver Tech Center', desc: 'Offices & executive condos' },
  { name: 'Highlands Ranch', desc: 'Family homes & move-outs' },
]

export default function ServiceAreas() {
  return (
    <section className="py-20 bg-[#0F2240]" id="service-areas">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Where We Clean
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Serving All of Denver & Surrounding Areas
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We provide professional cleaning services across the greater Denver metro — from downtown
            condos to suburban family homes.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
          {AREAS.map((area) => {
            const content = (
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00A896] mt-2 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-[#00A896] transition-colors">
                    {area.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{area.desc}</p>
                </div>
              </div>
            )

            return area.slug ? (
              <Link
                key={area.name}
                href={`/areas/${area.slug}`}
                data-service-area={area.name}
                className="bg-white/5 border border-white/10 rounded-lg px-5 py-4 hover:bg-white/10 hover:border-[#00A896]/50 transition-all group"
              >
                {content}
              </Link>
            ) : (
              <div
                key={area.name}
                data-service-area={area.name}
                className="bg-white/5 border border-white/10 rounded-lg px-5 py-4 hover:bg-white/10 hover:border-[#00A896]/50 transition-all group"
              >
                {content}
              </div>
            )
          })}
        </div>

        {/* CTA strip */}
        <div className="bg-[#00A896]/10 border border-[#00A896]/30 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">Don&apos;t see your area?</h3>
            <p className="text-white/60 text-sm">
              We may still serve you — call or message us and we&apos;ll confirm availability.
            </p>
          </div>
          <ContactActions
            className="flex flex-col sm:flex-row gap-3 flex-shrink-0"
            bookLabel="Book Online"
            primaryClassName="inline-flex items-center justify-center gap-2 bg-[#00A896] text-white font-bold px-7 py-3.5 rounded-none hover:bg-[#007A6C] transition-colors text-sm"
            secondaryClassName="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-7 py-3.5 hover:border-white hover:bg-white/10 transition-all text-sm"
          />
        </div>
      </div>
    </section>
  )
}
