import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VirtualAssistant from '@/components/VirtualAssistant'
import PromoBanner from '@/components/PromoBanner'
import ExitPopup from '@/components/ExitPopup'

const GA_ID = 'G-50JSSQ15K6'

export const metadata: Metadata = {
  metadataBase: new URL('https://raprocleaningservices.com'),
  title: "R A Pro Cleaning Services | Denver's #1 Cleaning Company",
  description:
    'Top-rated cleaning services in Denver, CO. 41 five-star Google reviews. House cleaning, deep cleaning, move in/out, Airbnb, office & post-construction. Licensed & insured. Get an instant quote!',
  keywords:
    'cleaning services Denver, house cleaning Denver CO, deep cleaning Denver, move in out cleaning Denver, Airbnb cleaning Denver, office cleaning Denver, post construction cleaning Denver, professional house cleaners Denver, maid service Denver, residential cleaning Denver, commercial cleaning Denver',
  alternates: {
    canonical: 'https://raprocleaningservices.com',
  },
  openGraph: {
    title: "R A Pro Cleaning Services | Denver's #1 Cleaning Company",
    description: 'Top-rated cleaning services in Denver, CO. 41 five-star reviews. Instant online quotes!',
    url: 'https://raprocleaningservices.com',
    siteName: 'R A Pro Cleaning Services',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://raprocleaningservices.com',
    name: 'R A Pro Cleaning Services LLC',
    image: 'https://raprocleaningservices.com/logo.png',
    description:
      'Top-rated professional cleaning services in Denver, CO. House cleaning, deep cleaning, move in/out, Airbnb, office and post-construction cleaning. Licensed & insured.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1325 S Colorado Blvd, Suite B502',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80222',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.6853,
      longitude: -104.9408,
    },
    telephone: '+17206778799',
    email: 'ra@raprocleaningservices.com',
    url: 'https://raprocleaningservices.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '41',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    openingHours: 'Mo-Su 07:00-20:00',
    areaServed: [
      { '@type': 'City', name: 'Denver', sameAs: 'https://en.wikipedia.org/wiki/Denver' },
      { '@type': 'City', name: 'Aurora' },
      { '@type': 'City', name: 'Lakewood' },
      { '@type': 'City', name: 'Englewood' },
      { '@type': 'City', name: 'Littleton' },
      { '@type': 'City', name: 'Centennial' },
      { '@type': 'City', name: 'Greenwood Village' },
      { '@type': 'City', name: 'Arvada' },
      { '@type': 'City', name: 'Westminster' },
      { '@type': 'City', name: 'Thornton' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Standard House Cleaning', areaServed: 'Denver, CO' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Deep Cleaning', areaServed: 'Denver, CO' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Move In/Out Cleaning', areaServed: 'Denver, CO' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Airbnb Cleaning', areaServed: 'Denver, CO' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office Cleaning', areaServed: 'Denver, CO' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Post-Construction Cleaning', areaServed: 'Denver, CO' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Carpet Cleaning', areaServed: 'Denver, CO' } },
      ],
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <PromoBanner />
        <Navigation />
        {children}
        <Footer />
        <VirtualAssistant />
        <ExitPopup />
      </body>
    </html>
  )
}
