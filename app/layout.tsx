import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VirtualAssistant from '@/components/VirtualAssistant'

const GA_ID = 'G-50JSSQ15K6'

export const metadata: Metadata = {
  metadataBase: new URL('https://raprocleaningservices.com'),
  title: 'R A Pro Cleaning Services | Denver Metro House Cleaning',
  description:
    '5.0-star cleaning services serving Denver, Aurora and the Denver metro. House cleaning, deep cleaning, move in/out, Airbnb, office and post-construction cleaning.',
  keywords:
    'cleaning services Denver, house cleaning Aurora CO, cleaning services Aurora, house cleaning Denver CO, deep cleaning Denver, move out cleaning Aurora, Airbnb cleaning Denver, office cleaning Denver',
  alternates: {
    canonical: 'https://raprocleaningservices.com',
  },
  openGraph: {
    title: 'R A Pro Cleaning Services | Denver Metro House Cleaning',
    description: '5.0-star cleaning services serving Denver, Aurora and surrounding communities. Get a fast online quote.',
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
    image: 'https://raprocleaningservices.com/ra-logo.jpeg',
    description:
      'Top-rated professional cleaning services in Denver, CO. House cleaning, deep cleaning, move in/out, Airbnb, office and post-construction cleaning. Licensed & insured.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1325 S Colorado Blvd',
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
    sameAs: [
      'https://www.instagram.com/raprocleaningservice/',
      'https://www.facebook.com/raprocleaningservice',
      'https://www.linkedin.com/in/ra-pro-cleaning-service/',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '46',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    openingHours: ['Mo-Fr 09:00-17:00', 'Sa-Su 10:00-16:00'],
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
        <Script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="6a26c7d7e53da97e714a53f5" data-source="WEB_USER" strategy="afterInteractive" />
      </body>
    </html>
  )
}
