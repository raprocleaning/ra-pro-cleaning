import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VirtualAssistant from '@/components/VirtualAssistant'

export const metadata: Metadata = {
  title: "R A Pro Cleaning Services | Denver's Premium Cleaning",
  description:
    'Professional cleaning services in Denver, CO. 24 five-star reviews. Residential, commercial, deep cleaning, Airbnb turnover, and more. Licensed & insured.',
  keywords:
    'cleaning services Denver, house cleaning Denver, deep cleaning Denver, professional cleaners Denver CO',
  openGraph: {
    title: "R A Pro Cleaning Services | Denver's Premium Cleaning",
    description: 'Professional cleaning services in Denver, CO. 24 five-star reviews.',
    url: 'https://www.raprocleaningservices.com',
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
      reviewCount: '24',
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
        <Navigation />
        {children}
        <Footer />
        <VirtualAssistant />
      </body>
    </html>
  )
}
