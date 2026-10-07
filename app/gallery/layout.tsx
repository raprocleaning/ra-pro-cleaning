import type { Metadata } from 'next'

// The gallery page is a client component, which cannot export metadata, so
// its title, description and canonical live here.
export const metadata: Metadata = {
  title: 'Cleaning Photo Gallery | R A Pro Cleaning Services Denver',
  description:
    'Real photos from R A Pro Cleaning jobs across Denver and Aurora: kitchens, bathrooms, carpets and whole-home deep cleans, before and after.',
  alternates: { canonical: 'https://raprocleaningservices.com/gallery' },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
