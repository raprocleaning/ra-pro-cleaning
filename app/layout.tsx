import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VirtualAssistant from '@/components/VirtualAssistant'
import ConversionTracking from '@/components/ConversionTracking'

const GA_ID = 'G-50JSSQ15K6'

export const metadata: Metadata = {
  metadataBase: new URL('https://raprocleaningservices.com'),
  title: 'R A Pro Cleaning Services | Cherry Creek & Downtown Denver House Cleaning',
  description:
    '5.0-star cleaning services for Cherry Creek, Glendale and Downtown Denver. House cleaning, deep cleaning, move in/out, Airbnb, office and post-construction cleaning.',
  keywords:
    'house cleaning Cherry Creek, cleaning services Cherry Creek Denver, house cleaning Glendale CO, cleaning services Downtown Denver, LoDo cleaning service, deep cleaning Cherry Creek, move out cleaning Denver, Airbnb cleaning Downtown Denver, office cleaning LoDo',
  alternates: {
    canonical: 'https://raprocleaningservices.com',
  },
  openGraph: {
    title: 'R A Pro Cleaning Services | Cherry Creek & Downtown Denver House Cleaning',
    description: '5.0-star cleaning services for Cherry Creek, Glendale and Downtown Denver. Get a fast online quote.',
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
    // We clean at the customer's address and have no storefront to visit, so
    // the listing carries the city we serve from rather than a street address.
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.7392,
      longitude: -104.9903,
    },
    telephone: '+17206778799',
    email: 'ra@raprocleaningservices.com',
    url: 'https://raprocleaningservices.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '45',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    // When somebody answers the phone. Online booking never closes, but that
    // is not what openingHours means to a search result.
    openingHours: ['Mo-Su 09:00-17:00'],
    areaServed: [
      { '@type': 'City', name: 'Glendale', sameAs: 'https://en.wikipedia.org/wiki/Glendale,_Colorado' },
      {
        '@type': 'Neighborhood',
        name: 'Cherry Creek',
        containedInPlace: { '@type': 'City', name: 'Denver' },
      },
      {
        '@type': 'Neighborhood',
        name: 'Downtown Denver',
        containedInPlace: { '@type': 'City', name: 'Denver' },
      },
      {
        '@type': 'Neighborhood',
        name: 'LoDo',
        containedInPlace: { '@type': 'City', name: 'Denver' },
      },
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
        <Navigation />
        {children}
        <Footer />
        <VirtualAssistant />
        <ConversionTracking />
      </body>
    </html>
  )
}
