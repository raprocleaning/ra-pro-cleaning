/** @type {import('next').NextConfig} */

// Addresses from the old WordPress site that Google still crawls and finds
// missing (Search Console → Pages → Not found (404)). Each one forwards to the
// page on this site that covers the same thing, so visitors land somewhere
// useful and the old page's standing in search carries over.
const OLD_SITE_REDIRECTS = [
  // Pages
  ['/about-us', '/about'],
  ['/terms-conditions', '/terms'],
  ['/cleaning-checklist', '/#whats-included'],
  ['/cleaning-prices', '/blog/how-much-does-house-cleaning-cost-in-denver'],

  // Services
  ['/services/move-in-out-cleaning', '/services/move-in-out'],
  ['/services/airbnb', '/services/airbnb-cleaning'],
  ['/services/house-cleaning/bathroom-cleaning', '/services/bathroom-cleaning'],
  ['/services/house-cleaning/bedroom-cleaning', '/services/bedroom-cleaning'],
  ['/services/house-cleaning/kitchen-cleaning', '/services/kitchen-cleaning'],

  // Blog posts
  ['/blog/cost-of-deep-cleaning-a-house', '/blog/how-much-does-house-cleaning-cost-in-denver'],
  ['/blog/expert-tips-for-deep-house-cleaning-frequency', '/blog/how-often-should-you-deep-clean'],
  ['/blog/mastering-deep-cleaning-a-step-by-step-guide', '/services/deep-cleaning'],
  ['/blog/how-to-clean-a-kitchen-sink', '/blog/how-to-deep-clean-your-kitchen'],
  ['/blog/bathroom-tiles-cleaning-a-professional-guide', '/services/bathroom-cleaning'],
  ['/blog/office-cleaning-checklist-daily-weekly-and-monthly-tasks', '/services/office-cleaning'],
  ['/blog/homemade-bathroom-cleaners', '/blog'],
  ['/blog/the-10-best-cleaning-tools', '/blog'],
]

const nextConfig = {
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // WordPress published an RSS feed under every post; send it to the post.
      { source: '/blog/:slug/feed', destination: '/blog/:slug', permanent: true },
      ...OLD_SITE_REDIRECTS.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ]
  },
}
module.exports = nextConfig
