import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VirtualAssistant from '@/components/VirtualAssistant'
import GhlChatWidget from '@/components/GhlChatWidget'
import ConversionTracking from '@/components/ConversionTracking'
import { SITE_OPEN_GRAPH } from '@/lib/openGraph'

const GA_ID = 'G-50JSSQ15K6'

export const metadata: Metadata = {
  metadataBase: new URL('https://raprocleaningservices.com'),
  title: 'R A Pro Cleaning Services | Denver Metro House Cleaning',
  description:
    'House cleaning, deep cleaning, move-out, Airbnb, office and post-construction cleaning across Denver, Aurora and the metro. See your price online and book.',
  keywords:
    'cleaning services Denver, house cleaning Aurora CO, cleaning services Aurora, house cleaning Denver CO, deep cleaning Denver, move out cleaning Aurora, Airbnb cleaning Denver, office cleaning Denver',
  openGraph: SITE_OPEN_GRAPH,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    // HousekeepingService is schema.org's LocalBusiness subtype for cleaning
    // companies (there is no "CleaningService" type). The @id is what the
    // service and area pages point their `provider` at.
    '@type': 'HousekeepingService',
    '@id': 'https://raprocleaningservices.com/#business',
    name: 'R A Pro Cleaning Services LLC',
    image: 'https://raprocleaningservices.com/ra-logo.jpeg',
    logo: 'https://raprocleaningservices.com/ra-logo.jpeg',
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
    // The business's own social profiles, so search engines tie them to this listing.
    sameAs: [
      'https://www.instagram.com/raprocleaningservice/',
      'https://www.facebook.com/raprocleaningservice',
      'https://www.linkedin.com/in/ra-pro-cleaning-service/',
    ],
    // No aggregateRating here: Google does not show stars for a business's
    // ratings of itself, and a hand-typed review count goes stale the day a new
    // review lands. The Google Business Profile carries the real number.
    priceRange: '$$',
    // When somebody answers the phone. Online booking never closes, but that
    // is not what openingHours means to a search result.
    openingHours: ['Mo-Su 09:00-17:00'],
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
        {/*
          Runs before first paint so `.fade-in-up` can scope its hidden state
          to `.js`. Without it, a visitor with JavaScript off (or a crawler
          that does not run it) never fires the IntersectionObserver that adds
          `.visible`, and every scroll-revealed section stays at opacity 0.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
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
        <GhlChatWidget />
        <ConversionTracking />
      </body>
    </html>
  )
}
