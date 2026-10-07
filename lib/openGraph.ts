import type { Metadata } from 'next'

// The site-wide Open Graph tags. A page that sets its own `openGraph` replaces
// this object rather than merging into it, so the homepage spreads it in to
// add its own `url` without losing the rest.
export const SITE_OPEN_GRAPH: NonNullable<Metadata['openGraph']> = {
  title: 'R A Pro Cleaning Services | Denver Metro House Cleaning',
  description: '5.0-star cleaning services serving Denver, Aurora and surrounding communities. Get a fast online quote.',
  siteName: 'R A Pro Cleaning Services',
  locale: 'en_US',
  type: 'website',
}
