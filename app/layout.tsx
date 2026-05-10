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
    'Top-rated cleaning services in Denver, CO. 50+ five-star Google reviews. House cleaning, deep cleaning, move in/out, Airbnb, office & post-construction. Licensed & insured. Get an instant quote!',
  keywords:
    'cleaning services Denver, house cleaning Denver CO, deep cleaning Denver, move in out cleaning Denver, Airbnb cleaning Denver, office cleaning Denver, post construction cleaning Denver, professional house cleaners Denver, maid service Denver, residential cleaning Denver, commercial cleaning Denver',
  alternates: {
    canonical: 'https://raprocleaningservices.com',
  },
  openGraph: {
    title: "R A Pro Cleaning Services | Denver's #1 Cleaning Company",
    description: 'Top-rated cleaning services in Denver, CO. 50+ five-star reviews. Instant online quotes!',
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
