import type { Metadata } from 'next'
import MoneyDashboard from '@/components/MoneyDashboard'

/**
 * Internal tool, not part of the public site. Kept out of the sitemap, blocked
 * in robots.txt and marked noindex so it never competes with the pages the ads
 * are paying to rank.
 */
export const metadata: Metadata = {
  title: 'Money Flow | R A Pro Cleaning Services',
  robots: { index: false, follow: false, nocache: true },
}

export default function MoneyPage() {
  return (
    <main className="pt-20 bg-slate-50 min-h-screen">
      <section className="bg-[#0F2240] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Internal — not public
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Money Flow
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            What comes in, what goes out, and whether the advertising earns back what it costs.
            Every quote logged here is priced from the same tables the booking form uses.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <MoneyDashboard />
      </section>
    </main>
  )
}
