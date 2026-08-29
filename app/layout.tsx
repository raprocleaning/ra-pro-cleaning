import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VirtualAssistant from '@/components/VirtualAssistant'
import ConversionTracking from '@/components/ConversionTracking'

const GA_ID = 'G-50JSSQ15K6'

/**
 * Meta pixel dataset ID, from Meta Business Suite → Events Manager.
 *
 * Left unset the pixel never loads and every `fbq` call in lib/analytics.ts
 * quietly no-ops, so the site behaves exactly as it did before.
 */
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

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

        {/*
          Meta Pixel. The landing PageView is sent here so it cannot be lost to
          the race between this script and hydration; ConversionTracking sends
          one for each client-side navigation after it, which Meta would
          otherwise never see.
        */}
        {META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
        <Navigation />
        {children}
        <Footer />
        <VirtualAssistant />
        <ConversionTracking />
      </body>
    </html>
  )
}
