import type { Metadata } from 'next'
import BookPageClient from '@/components/BookPageClient'
import { paymentsEnabled } from '@/lib/payments'

export const metadata: Metadata = {
  title: 'Book a Cleaning | R A Pro Cleaning Services Denver',
  description:
    'See your exact price instantly and book your cleaning in minutes. Denver\'s top-rated cleaning service. Standard, deep, move in/out, Airbnb & post-construction cleaning.',
  alternates: { canonical: 'https://raprocleaningservices.com/book' },
}

export default function BookPage() {
  // Read on the server so the key itself never reaches the browser — the page
  // only learns whether card payments are switched on.
  return <BookPageClient payOnline={paymentsEnabled()} />
}
