import type { Metadata } from 'next'
import BookPageClient from '@/components/BookPageClient'

export const metadata: Metadata = {
  title: 'Book a Cleaning | R A Pro Cleaning Services Denver',
  description:
    'Get an instant price quote and book your cleaning in minutes. Denver\'s top-rated cleaning service. Standard, deep, move in/out, Airbnb, office & post-construction cleaning.',
  alternates: { canonical: 'https://raprocleaningservices.com/book' },
}

export default function BookPage() {
  return <BookPageClient />
}
