import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AREAS, areaBySlug } from '@/lib/areas'

const SERVICES = [
  { name: 'Standard & recurring cleaning', slug: 'standard-cleaning' },
  { name: 'Deep cleaning',                 slug: 'deep-cleaning' },
  { name: 'Move in/out cleaning',          slug: 'move-in-out' },
  { name: 'Airbnb & rental turnovers',     slug: 'airbnb-cleaning' },
  { name: 'Office & commercial cleaning',  slug: 'office-cleaning' },
  { name: 'Post-construction cleaning',    slug: 'post-construction' },
]

export async function generateStaticParams() {
  return AREAS.map((area) => ({ city: area.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const area = areaBySlug(city)
  if (!area) return {}

  return {
    title: `House Cleaning in ${area.city}, CO | R A Pro Cleaning Services`,
    description:
      `Licensed, insured house cleaning in ${area.city}, Colorado — recurring, deep, ` +
      `move in/out, Airbnb and office cleaning. 5.0 stars across 46 Google reviews. ` +
      `Book online in 60 seconds.`,
    alternates: { canonical: `https://raprocleaningservices.com/areas/${area.slug}` },
    openGraph: {
      title: `House Cleaning in ${area.city}, CO | R A Pro Cleaning Services`,
      description: `Professional cleaning throughout ${area.city} and the Denver metro.`,
      url: `https://raprocleaningservices.com/areas/${area.slug}`,
    },
  }
}

export default async function AreaPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  const area = areaBySlug(city)
  if (!area) notFound()

  const nearby = area.nearby.map(areaBySlug).filter(Boolean)

  // Tells search engines this page is about cleaning *in this city*, which the
  // site-wide LocalBusiness listing cannot say on its own.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `House Cleaning in ${area.city}, CO`,
    serviceType: 'House Cleaning Service',
    provider: {
      '@type': 'LocalBusiness',
      name: 'R A Pro Cleaning Services LLC',
      telephone: '+17206778799',
      url: 'https://raprocleaningservices.com',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '46',
        bestRating: '5',
      },
    },
    areaServed: {
      '@type': 'City',
      name: area.city,
      containedInPlace: { '@type': 'State', name: 'Colorado' },
    },
    url: `https://raprocleaningservices.com/areas/${area.slug}`,
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://raprocleaningservices.com' },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://raprocleaningservices.com/areas/denver' },
      { '@type': 'ListItem', position: 3, name: area.city, item: `https://raprocleaningservices.com/areas/${area.slug}` },
    ],
  }

  return (
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      {/* Hero */}
      <section className="bg-[#0F2240] py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Serving {area.city}, Colorado
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">
            House Cleaning in {area.city}, CO
          </h1>
          <p className="text-[#4ADEC8] text-lg font-semibold mb-6">{area.tagline}</p>
          <p className="text-white/70 text-lg max-w-3xl mb-8 leading-relaxed">{area.intro[0]}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/book" className="bg-[#00A896] text-white font-bold px-8 py-4 text-center hover:bg-[#007A6C] transition-colors">
              See Your Price — 60 Seconds
            </Link>
            <a href="tel:7206778799" className="border-2 border-white/40 text-white font-bold px-8 py-4 text-center hover:bg-white/10 transition-colors">
              Call (720) 677-8799
            </a>
          </div>
          <p className="text-white/45 text-sm mt-6">
            5.0 stars · 46 Google reviews · Licensed &amp; insured · Women-owned
          </p>
        </div>
      </section>

      {/* What this city calls us for */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="text-3xl font-black text-[#0F2240] mb-5 tracking-tight">
              {area.angle.heading}
            </h2>
            <p className="text-[#4A6583] leading-relaxed mb-6">{area.angle.body}</p>
            <p className="text-[#4A6583] leading-relaxed">{area.intro[1]}</p>
          </div>

          <div className="bg-[#E6F7F5] border border-[#B2DFDB] p-8">
            <h2 className="text-2xl font-black text-[#0F2240] mb-5">
              Cleaning services in {area.city}
            </h2>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug} className="flex gap-3 text-[#0F2240]">
                  <span className="text-[#00A896] font-bold">✓</span>
                  <Link href={`/services/${service.slug}`} className="hover:text-[#00A896] transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-[#F7FBFF] border-y border-[#E2EFEC]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#0F2240] mb-3 tracking-tight">
            {area.city} neighborhoods we clean
          </h2>
          <p className="text-[#4A6583] mb-7 max-w-2xl">
            If you do not see your street, we almost certainly still cover it — give us your ZIP code
            and we will confirm before you book.
          </p>
          <ul className="flex flex-wrap gap-2.5 mb-8">
            {area.neighborhoods.map((hood) => (
              <li key={hood} className="bg-white border border-[#B2DFDB] text-[#0F2240] text-sm font-semibold px-4 py-2">
                {hood}
              </li>
            ))}
          </ul>
          <p className="text-[#4A6583] text-sm">
            <span className="font-bold text-[#0F2240]">ZIP codes served:</span>{' '}
            {area.zips.join(' · ')}
          </p>
        </div>
      </section>

      {/* Nearby areas — real internal linking, not a footer dump */}
      {nearby.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-black text-[#0F2240] mb-6 tracking-tight">
              We also clean near {area.city}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {nearby.map((n) => (
                <Link
                  key={n!.slug}
                  href={`/areas/${n!.slug}`}
                  className="border-2 border-[#E2EFEC] hover:border-[#00A896] p-6 transition-colors group"
                >
                  <p className="font-black text-[#0F2240] text-lg group-hover:text-[#00A896] transition-colors">
                    {n!.city}
                  </p>
                  <p className="text-[#4A6583] text-sm mt-1">{n!.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Close */}
      <section className="py-16 bg-[#00A896] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
            Ready for a cleaner {area.city} home?
          </h2>
          <p className="text-white/80 mb-8">
            Pick your service and see the price before you book. No phone call, no card.
          </p>
          <Link href="/book" className="inline-block bg-white text-[#007A6C] font-bold px-9 py-4 hover:bg-white/90 transition-colors">
            Get My Price
          </Link>
        </div>
      </section>
    </main>
  )
}
