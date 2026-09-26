import type { Metadata } from 'next'
import TermsPage from '@/app/terms/page'

/**
 * The same Terms of Service, served at the other URL carriers look for.
 *
 * Companion to app/privacy-policy — A2P registration also failed with error
 * 30882, terms and conditions not found. /terms exists and carries the full SMS
 * program disclosure, so the likeliest cause is the crawler being pointed at
 * /terms-and-conditions. Cheap insurance either way.
 */
export const metadata: Metadata = {
  title: 'Terms of Service | R A Pro Cleaning Services',
  description:
    'Terms of Service for R A Pro Cleaning Services LLC, including our SMS program terms, message frequency, and opt-out instructions.',
  alternates: { canonical: 'https://raprocleaningservices.com/terms' },
}

export default TermsPage
