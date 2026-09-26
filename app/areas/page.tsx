import type { Metadata } from 'next'
import Link from 'next/link'
import { AREAS } from '@/lib/areas'
import ContactActions from '@/components/ContactActions'

const BASE_URL = 'https://raprocleaningservices.com'

export const metadata: Metadata = {
  title: 'Cleaning Service Areas | Denver Metro | R A Pro Cleaning',
  description:
    'R A Pro Cleaning Services covers Denver, Aurora, Lakewood, Englewood, Littleton, Centennial, Greenwood Village, Arvada, Westminster and Thornton, Colorado.',
  alternates: { canonical: `${BASE_URL}/areas` },
}

export default function ServiceAreasPage() {
  return (
    <main className="pt-20">
      <section className="bg-[#0F2240] py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Service Areas</span>
          </div>
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Where We Clean
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Cleaning Services Across the Denver Metro
          </h1>
          <p className="text-white/70 text-lg max-w-3xl">
            Licensed, insured and rated 5.0 on Google. Pick your city below for local details, or
            call (720) 677-8799 if you do not see yours — we may still cover it.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="border border-[#E2E8F0] p-7 hover:border-[#00A896] transition-colors group"
            >
              <h2 className="text-xl font-black text-[#0F2240] mb-2 group-hover:text-[#00A896] transition-colors">
                {area.city}, CO
              </h2>
              <p className="text-[#4A6583] text-sm leading-relaxed mb-4">
                {area.neighborhoods.slice(0, 4).join(' · ')}
              </p>
              <span className="text-[#00A896] text-sm font-semibold">
                Cleaning in {area.city} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#00A896] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-4">Not Sure If We Cover You?</h2>
          <p className="text-white/80 mb-8">
            Send us your ZIP code and we will confirm before you book.
          </p>
          <ContactActions
            className="flex flex-col sm:flex-row gap-4 justify-center"
            bookLabel="Get My Quote"
            primaryClassName="inline-flex items-center justify-center gap-2 bg-white text-[#007A6C] font-bold px-9 py-4"
            secondaryClassName="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-bold px-9 py-4"
          />
        </div>
      </section>
    </main>
  )
}
