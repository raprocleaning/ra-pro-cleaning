import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BlogPost {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  intro: string
  sections: Array<{
    heading: string
    content: string[]
  }>
  conclusion: string
}

const posts: Record<string, BlogPost> = {
  'how-to-deep-clean-your-kitchen': {
    slug: 'how-to-deep-clean-your-kitchen',
    title: 'How to Deep Clean Your Kitchen Like a Professional',
    category: 'Cleaning Tips',
    date: 'March 10, 2026',
    readTime: '6 min read',
    intro:
      'Your kitchen is the most-used room in your home — and the hardest to truly clean. Grease accumulates on cabinets, residue builds up inside your oven, and bacteria hides in corners you never think about. A professional deep clean goes far beyond wiping the counter. Here\'s how the pros approach it.',
    sections: [
      {
        heading: 'Start with the Oven',
        content: [
          'The oven is usually the most neglected appliance in any kitchen. Remove all racks and soak them in hot, soapy water. Apply a baking soda paste to the interior walls and let it sit for at least 30 minutes. Scrub with a stiff brush and wipe clean.',
          'For the door glass, use a razor scraper at a low angle to remove baked-on residue, then wipe with a glass cleaner for a streak-free finish. Clean the stovetop burners and grates separately — soaking them in dish soap cuts through grease effectively.',
        ],
      },
      {
        heading: 'Degrease the Cabinets',
        content: [
          'Kitchen cabinet surfaces accumulate a sticky layer of grease and dust over time. Use a degreasing cleaner applied to a microfiber cloth. Work top to bottom and don\'t forget the handles, which get touched dozens of times daily.',
          'For stubborn buildup, a paste of baking soda and dish soap works well. Rub it gently in circular motions and wipe clean with a damp cloth. Finish with a dry cloth to prevent streaking.',
        ],
      },
      {
        heading: 'Clean the Refrigerator Inside and Out',
        content: [
          'Empty the refrigerator section by section. Remove drawers and shelves and wash them in the sink with warm soapy water. Wipe interior walls with a solution of baking soda and water — it deodorizes as it cleans.',
          'For the exterior, wipe with a damp microfiber cloth. If you have a stainless steel fridge, use a stainless steel cleaner applied in the direction of the grain to avoid streaks.',
        ],
      },
      {
        heading: 'Tackle the Sink and Backsplash',
        content: [
          'Sinks accumulate mineral deposits, soap scum, and bacteria around the drain and faucet base. Use a non-abrasive scrub to clean the basin, and an old toothbrush for around the faucet and drain.',
          'For backsplash tiles, a tile-safe degreaser removes cooking residue. Pay attention to grout lines, which discolor quickly in a kitchen environment. A small stiff brush removes grout staining effectively.',
        ],
      },
      {
        heading: 'Finish with the Floor',
        content: [
          'Sweep first to remove loose debris, paying close attention to corners and under the toe kicks of cabinets. Then mop with a proper floor cleaner suited to your floor type.',
          'For tile, a steam mop penetrates grout and kills bacteria without harsh chemicals. For hardwood or laminate, use a barely-damp mop to avoid warping.',
        ],
      },
    ],
    conclusion:
      'A professional-level kitchen deep clean takes time — typically two to three hours for a standard kitchen. If you\'d rather spend that time on something else, R A Pro Cleaning Services is here to handle it for you. Our deep cleaning service covers every corner of your kitchen, and every other room in your home.',
  },
  'how-often-should-you-deep-clean': {
    slug: 'how-often-should-you-deep-clean',
    title: 'How Often Should You Deep Clean Your Home?',
    category: 'Home Care',
    date: 'February 22, 2026',
    readTime: '5 min read',
    intro:
      'Standard cleaning keeps your home presentable. Deep cleaning keeps it genuinely healthy. But how often is deep cleaning actually necessary? The answer depends on your household — but here are the professional guidelines used by experienced cleaners.',
    sections: [
      {
        heading: 'The Difference Between Standard and Deep Cleaning',
        content: [
          'Standard cleaning covers the surfaces you see and use every day: counters, sinks, floors, dusting. It\'s maintenance — essential, but not enough on its own.',
          'Deep cleaning goes further: inside appliances, behind furniture, inside cabinets, baseboards, ceiling fans, grout, and all the areas that accumulate grime over weeks and months. It\'s the reset that standard cleaning maintains.',
        ],
      },
      {
        heading: 'For Most Households: Every 3-6 Months',
        content: [
          'For a typical household with one or two adults, deep cleaning every three to six months is appropriate. This cadence keeps the home in excellent condition without over-cleaning.',
          'If you have children, pets, or high foot traffic through your home, lean toward every three months. The wear and tear accelerates and so should the deep cleaning schedule.',
        ],
      },
      {
        heading: 'Special Circumstances That Warrant Immediate Deep Cleaning',
        content: [
          'Certain events call for a deep clean regardless of your schedule. Moving into a new home, hosting guests, recovering from an illness, completing a renovation, and returning from extended travel are all good triggers.',
          'After a renovation especially — dust and debris settle in air vents, cabinets, and surfaces throughout the home. A professional post-renovation clean removes construction dust that can affect air quality.',
        ],
      },
      {
        heading: 'Room-by-Room Frequency Guide',
        content: [
          'Kitchen: every 1-3 months. The kitchen accumulates grease and bacteria faster than any other room.',
          'Bathrooms: monthly. Mold and mineral buildup accelerate in wet environments.',
          'Bedrooms: every 3-4 months. Dust mites in mattresses and under-bed areas are the main concern.',
          'Living areas: every 3-6 months. Baseboards, windows, and upholstery collect dust slowly but steadily.',
        ],
      },
    ],
    conclusion:
      'The best approach is a combination: maintain with regular standard cleaning and schedule professional deep cleans at appropriate intervals. R A Pro Cleaning Services offers both, tailored to your home and schedule. Contact us to set up a cleaning plan that works for you.',
  },
  'airbnb-cleaning-tips-5-star-rating': {
    slug: 'airbnb-cleaning-tips-5-star-rating',
    title: 'Airbnb Cleaning Tips to Maintain a 5-Star Rating',
    category: 'Host Tips',
    date: 'February 5, 2026',
    readTime: '7 min read',
    intro:
      'In the short-term rental world, cleanliness is the single most important factor in your review score. Guests have high expectations — and one bad review about cleanliness can tank your ranking for months. Here\'s how top-rated Denver hosts keep their properties guest-ready.',
    sections: [
      {
        heading: 'Set a Time-Efficient Turnover System',
        content: [
          'The biggest challenge with Airbnb cleaning is time. Between checkout and check-in, you may have just a few hours. The solution is a systematic approach: same order, every time.',
          'Start with laundry running before you clean anything else. Strip beds and throw linens in immediately. While laundry runs, clean bathrooms, then kitchen, then living spaces, then bedrooms. By the time you\'re making beds, linens are ready.',
        ],
      },
      {
        heading: 'The Bathroom is Your Highest-Scrutiny Area',
        content: [
          'Guests check bathrooms carefully. Hair in the drain, soap scum on glass, or mineral deposits on faucets will earn an immediate complaint. Use a squeegee on shower glass after every clean and descale faucets regularly.',
          'Replace toilet paper with a full roll every turnover, even if the previous roll isn\'t empty. Fold the first sheet into a point — it signals to guests that the bathroom has been cleaned professionally.',
        ],
      },
      {
        heading: 'Hotel-Level Bed Making',
        content: [
          'The bed is the centerpiece of the guest experience. Fresh, wrinkle-free linens make an immediate impression. Use a quality mattress protector under your fitted sheet and iron or steam pillowcases and the top sheet fold-back.',
          'Arrange pillows consistently, and consider a folded throw blanket at the foot of the bed. These small touches communicate professional-level care to your guests.',
        ],
      },
      {
        heading: 'Don\'t Forget the Overlooked Areas',
        content: [
          'The areas guests notice when they\'re scrutinizing: light switches, door handles, TV remote control, fridge door handle, and cabinet knobs. These high-touch surfaces should be wiped with a disinfecting cloth every turnover.',
          'Also check: behind the toilet base, microwave interior, coffee maker (descale monthly), shower curtain/liner for mold spots, and the inside of the dishwasher.',
        ],
      },
      {
        heading: 'When to Hire a Professional Turnover Service',
        content: [
          'Managing your own turnovers is feasible for one property with light bookings. But when you have back-to-back bookings, multiple properties, or simply want consistency, a professional turnover service is worth the investment.',
          'Professional cleaners are faster, more thorough, and provide accountability. With R A Pro Cleaning Services, your Denver Airbnb will be consistently guest-ready with documented turnover checklists and damage reporting.',
        ],
      },
    ],
    conclusion:
      'Your Airbnb reputation is built one guest experience at a time, and cleanliness is the foundation of every good review. Whether you manage your own turnovers or use a professional service, the standards outlined here will help you consistently earn 5-star ratings. R A Pro Cleaning Services specializes in Airbnb turnover cleaning throughout the Denver metro area. Contact us to discuss a cleaning plan for your property.',
  },
}

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
              Denver&apos;s trusted professional cleaning team with 41 five-star reviews.
            </p>
            <a
              href="https://raprocleaningservices.bookingkoala.com"
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
