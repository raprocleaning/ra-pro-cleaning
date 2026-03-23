import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cleaning Tips & Blog | R A Pro Cleaning Services Denver',
  description:
    'Expert cleaning tips, guides, and insights from Denver\'s professional cleaning team at R A Pro Cleaning Services.',
}

const posts = [
  {
    slug: 'how-to-deep-clean-your-kitchen',
    title: 'How to Deep Clean Your Kitchen Like a Professional',
    excerpt:
      'Your kitchen sees more action than any other room in your home. Learn the step-by-step professional approach to getting it truly clean — from grease-caked oven interiors to forgotten cabinet hinges.',
    category: 'Cleaning Tips',
    date: 'March 10, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'how-often-should-you-deep-clean',
    title: 'How Often Should You Deep Clean Your Home?',
    excerpt:
      'Standard cleaning keeps your home looking good day-to-day. But deep cleaning is what keeps it truly healthy. Here\'s a professional guide to cleaning frequency based on your lifestyle.',
    category: 'Home Care',
    date: 'February 22, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'airbnb-cleaning-tips-5-star-rating',
    title: 'Airbnb Cleaning Tips to Maintain a 5-Star Rating',
    excerpt:
      'Your reviews depend on your cleanliness. Discover the professional turnover cleaning checklist used by top-rated hosts in Denver and how to apply it to your short-term rental.',
    category: 'Host Tips',
    date: 'February 5, 2026',
    readTime: '7 min read',
  },
]

export default function BlogPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 60% 40%, rgba(200,169,110,0.3) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Expert Insights
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            Cleaning Tips &amp; Blog
          </h1>
          <p className="text-white/60 text-xl max-w-xl">
            Professional cleaning insights from the team at R A Pro Cleaning Services.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-[#E0E0E0] hover:border-[#C8A96E] hover:shadow-md transition-all duration-300 group"
              >
                {/* Placeholder image */}
                <div className="aspect-[16/9] bg-[#F5F5F5] flex items-center justify-center border-b border-[#E0E0E0]">
                  <div className="text-center">
                    <span className="text-xs font-semibold text-[#C8A96E] tracking-widest uppercase px-3 py-1 border border-[#C8A96E]/30">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#6B6B6B] mb-3">
                    <span>{post.date}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#0A0A0A] mb-3 leading-tight group-hover:text-[#C8A96E] transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#0A0A0A] hover:text-[#C8A96E] transition-colors"
                  >
                    Read Article
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#0A0A0A] mb-4">
            Let Us Handle the Cleaning
          </h2>
          <p className="text-[#6B6B6B] mb-8 max-w-lg mx-auto">
            Reading tips is one thing. Having experts do it for you is another. Book today and experience the difference.
          </p>
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C8A96E] text-white font-semibold px-8 py-4 hover:bg-[#B8935A] transition-colors"
          >
            Book a Professional Clean
          </a>
        </div>
      </section>
    </main>
  )
}
