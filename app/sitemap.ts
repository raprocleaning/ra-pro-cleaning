import { MetadataRoute } from 'next'

const BASE_URL = 'https://raprocleaningservices.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const servicesSlugs = [
    'deep-cleaning',
    'standard-cleaning',
    'house-cleaning',
    'office-cleaning',
    'move-in-out',
    'airbnb-cleaning',
    'kitchen-cleaning',
    'bathroom-cleaning',
    'bedroom-cleaning',
    'carpet-cleaning',
  ]

  const blogSlugs = [
    'how-to-deep-clean-your-kitchen',
    'how-often-should-you-deep-clean',
    'airbnb-cleaning-tips-5-star-rating',
  ]

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/gallery`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/contact`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const servicePages: MetadataRoute.Sitemap = servicesSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
