import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AREAS, getArea } from '@/lib/areas'

const BASE_URL = 'https://raprocleaningservices.com'

const SERVICES = [
  { name: 'Standard and recurring house cleaning', href: '/services/standard-cleaning' },
  { name: 'Deep cleaning', href: '/services/deep-cleaning' },
  { name: 'Move-in and move-out cleaning', href: '/services/move-in-out' },
  { name: 'Airbnb and short-term rental turnovers', href: '/services/airbnb-cleaning' },
  { name: 'Office and commercial cleaning', href: '/services/office-cleaning' },
  { name: 'Post-construction cleaning', href: '/services/post-construction' },
]

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const area = getArea(slug)
  if (!area) return {}

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `${BASE_URL}/areas/${area.slug}` },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `${BASE_URL}/areas/${area.slug}`,
      type: 'website',
    },
  }
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = getArea(slug)
  if (!area) notFound()

  const nearby = area.nearby.map(getArea).filter((a): a is NonNullable<typeof a> => Boolean(a))

  // Two blocks: the service itself (so the city shows up as a served area) and
  // the FAQ, which is what earns the expandable answers in search results.
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/areas/${area.slug}#service`,
        serviceType: 'House Cleaning',
        name: `House Cleaning Services in ${area.city}, CO`,
        description: area.metaDescription,
        provider: {
          '@type': 'LocalBusiness',
          name: 'R A Pro Cleaning Services LLC',
          telephone: '+1-720-677-8799',
          email: 'ra@raprocleaningservices.com',
          url: BASE_URL,
        },
        areaServed: {
          '@type': 'City',
          name: area.city,
          address: {
            '@type': 'PostalAddress',
            addressLocality: area.city,
            addressRegion: 'CO',
            addressCountry: 'US',
          },
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Cleaning Services in ${area.city}`,
          itemListElement: SERVICES.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              areaServed: `${area.city}, CO`,
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/areas/${area.slug}#faq`,
        mainEntity: area.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${BASE_URL}/areas` },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${area.city}, CO`,
            item: `${BASE_URL}/areas/${area.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-[#0F2240] py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/areas" className="hover:text-white transition-colors">Service Areas</Link>
            <span>/</span>
            <span className="text-white/70">{area.city}</span>
          </div>
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Serving {area.city}, Colorado
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            House Cleaning Services in {area.city}, CO
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mb-8">{area.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/book" className="bg-[#00A896] text-white font-bold px-8 py-4 text-center">
              Get an Instant Quote
            </Link>
            <a href="tel:7206778799" className="border-2 border-white/40 text-white font-bold px-8 py-4 text-center">
              Call (720) 677-8799
            </a>
          </div>
        </div>
      </section>

      {/* Body + service list */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="text-3xl font-black text-[#0F2240] mb-5">
              Cleaning for {area.city} Homes and Businesses
            </h2>
            {area.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-[#4A6583] leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="bg-[#E6F7F5] border border-[#B2DFDB] p-8 h-fit">
            <h2 className="text-2xl font-black text-[#0F2240] mb-5">{area.city} Cleaning Services</h2>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.href} className="flex gap-3 text-[#0F2240]">
                  <span className="text-[#00A896] font-bold">✓</span>
                  <Link href={service.href} className="hover:text-[#00A896] transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What this city books most */}
      <section className="py-20 bg-[#F7FAFC]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#0F2240] mb-10">
            What {area.city} Books Most
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {area.highlights.map((highlight) => (
              <div key={highlight.title} className="bg-white border border-[#E2E8F0] p-7">
                <h3 className="text-lg font-bold text-[#0F2240] mb-3">{highlight.title}</h3>
                <p className="text-[#4A6583] text-sm leading-relaxed">{highlight.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods + ZIPs */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#0F2240] mb-5">
            {area.city} Neighborhoods We Serve
          </h2>
          <p className="text-[#4A6583] leading-relaxed mb-8 max-w-3xl">
            We clean throughout {area.city} and the surrounding Denver metro. If you do not see your
            neighborhood listed, send us your ZIP code and we will confirm availability.
          </p>
          <div className="flex flex-wrap gap-2.5 mb-12">
            {area.neighborhoods.map((neighborhood) => (
              <span
                key={neighborhood}
                className="bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F2240] text-sm px-4 py-2"
              >
                {neighborhood}
              </span>
            ))}
          </div>

          <h3 className="text-sm font-semibold tracking-[0.25em] uppercase text-[#4A6583] mb-4">
            {area.city} ZIP Codes
          </h3>
          <p className="text-[#4A6583] leading-relaxed">{area.zips.join(' · ')}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F7FAFC]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#0F2240] mb-10">
            {area.city} Cleaning — Common Questions
          </h2>
          <div className="space-y-6">
            {area.faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-[#E2E8F0] p-7">
                <h3 className="text-lg font-bold text-[#0F2240] mb-3">{faq.q}</h3>
                <p className="text-[#4A6583] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#0F2240] mb-6">We Also Clean Nearby</h2>
          <div className="flex flex-wrap gap-3">
            {nearby.map((other) => (
              <Link
                key={other.slug}
                href={`/areas/${other.slug}`}
                className="border border-[#00A896] text-[#00A896] font-semibold text-sm px-5 py-3 hover:bg-[#00A896] hover:text-white transition-colors"
              >
                Cleaning in {other.city}
              </Link>
            ))}
            <Link
              href="/areas"
              className="border border-[#CBD5E1] text-[#4A6583] font-semibold text-sm px-5 py-3 hover:border-[#0F2240] hover:text-[#0F2240] transition-colors"
            >
              All service areas
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#00A896] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready for a Cleaner {area.city} Home?
          </h2>
          <p className="text-white/80 mb-8">Get a personalized quote in about 60 seconds.</p>
          <Link href="/book" className="inline-block bg-white text-[#007A6C] font-bold px-9 py-4">
            Get My Quote
          </Link>
        </div>
      </section>
    </main>
  )
}
