import type { Metadata } from 'next'

// The gallery itself is interactive, so it cannot carry its own metadata —
// without this the page inherits the site-wide title and competes with the
// homepage for the same search instead of ranking for the photos.
export const metadata: Metadata = {
  title: 'Before & After Cleaning Photos in Denver | R A Pro Cleaning Services',
  description:
    'Real before-and-after photos from deep cleans, move-outs and Airbnb turnovers across Denver and Aurora. See the standard before you book.',
  alternates: { canonical: 'https://raprocleaningservices.com/gallery' },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
