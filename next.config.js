/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // The Aurora landing page came down when we narrowed the service area to
  // Cherry Creek, Glendale and Downtown. The URL is indexed, so send its
  // traffic and ranking to the homepage instead of returning a 404.
  async redirects() {
    return [
      { source: '/areas/aurora', destination: '/', permanent: true },
    ]
  },
}
module.exports = nextConfig
