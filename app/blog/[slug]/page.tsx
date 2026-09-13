import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { posts } from '@/lib/blog'


export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return {}
  return {
    title: `${post.title} | R A Pro Cleaning Services Blog`,
    description: post.intro.slice(0, 160),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  const otherPosts = Object.values(posts).filter((p) => p.slug !== post.slug)

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-[#1A2B4B] py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 40% 50%, rgba(200,169,110,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 max-w-3xl">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70 truncate max-w-xs">{post.title}</span>
          </div>
          <div className="mb-4">
            <span className="text-[#4A90D9] text-xs font-semibold tracking-[0.3em] uppercase">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/40 text-sm">
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Intro */}
          <p className="text-xl text-[#1A2B4B] leading-relaxed mb-12 font-light">
            {post.intro}
          </p>

          {/* Sections */}
          <div className="space-y-12">
            {post.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-[#1A2B4B] mb-4 tracking-tight">
                  {section.heading}
                </h2>
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-[#4A6583] leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-12 pt-12 border-t border-[#C8DFEF]">
            <p className="text-[#1A2B4B] leading-relaxed">{post.conclusion}</p>
          </div>

          {/* Author CTA */}
          <div className="mt-12 bg-[#EBF4FF] p-8">
            <p className="text-xs font-semibold text-[#4A90D9] tracking-[0.2em] uppercase mb-2">
              Written by
            </p>
            <p className="font-bold text-[#1A2B4B] mb-1">R A Pro Cleaning Services</p>
            <p className="text-[#4A6583] text-sm mb-6">
              Denver&apos;s trusted professional cleaning team with 46 five-star Google reviews.
            </p>
              <a
                href="/book"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4A90D9] text-white font-semibold px-6 py-3 hover:bg-[#357ABD] transition-colors text-sm"
              >
                Book a Professional Clean
              </a>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="py-20 bg-[#EBF4FF]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1A2B4B] mb-10 tracking-tight">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="bg-white border border-[#C8DFEF] p-6 hover:border-[#4A90D9] hover:shadow-md transition-all duration-300 group"
                >
                  <span className="text-xs font-semibold text-[#4A90D9] tracking-widest uppercase">
                    {related.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#1A2B4B] mt-2 mb-3 leading-tight group-hover:text-[#4A90D9] transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-[#4A6583] text-sm leading-relaxed line-clamp-2">
                    {related.intro}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-[#4A6583]">
                    <span>{related.date}</span>
                    <span>&middot;</span>
                    <span>{related.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
