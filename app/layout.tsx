import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VirtualAssistant from '@/components/VirtualAssistant'

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
    name: 'R A Pro Cleaning Services LLC',
    image: 'https://www.raprocleaningservices.com/logo.png',
    description: 'Professional cleaning services in Denver, CO',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B, B502, 1325 S Colorado Blvd',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80222',
      addressCountry: 'US',
    },
    telephone: '+17206778799',
    email: 'ra@raprocleaningservices.com',
    url: 'https://www.raprocleaningservices.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '41',
    },
    priceRange: '$$',
    areaServed: 'Denver Metro Area, CO',
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
      </body>
    </html>
  )
}
