import type { Metadata } from 'next'
import TermsPage from '@/app/terms/page'

/** Third spelling of the terms URL a compliance crawler might be given. */
export const metadata: Metadata = {
  title: 'Terms of Service | R A Pro Cleaning Services',
  description:
    'Terms of Service for R A Pro Cleaning Services LLC, including our SMS program terms, message frequency, and opt-out instructions.',
  alternates: { canonical: 'https://raprocleaningservices.com/terms' },
}

export default TermsPage
