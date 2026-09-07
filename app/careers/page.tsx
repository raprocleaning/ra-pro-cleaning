import type { Metadata } from 'next'
import ApplyForm from '@/components/ApplyForm'

export const metadata: Metadata = {
  title: 'Cleaning Jobs in Denver | Now Hiring | R A Pro Cleaning Services',
  description:
    'We are hiring house cleaners in Denver, Aurora and the surrounding areas. Steady work, flexible hours, weekly pay. Apply in about a minute — no resume needed.',
  alternates: { canonical: 'https://raprocleaningservices.com/careers' },
  openGraph: {
    title: 'Now hiring cleaners in Denver | R A Pro Cleaning Services',
    description:
      'Steady work, flexible hours, weekly pay. Apply in about a minute — no resume needed.',
    url: 'https://raprocleaningservices.com/careers',
    type: 'website',
  },
}

/**
 * The careers page exists so applicants stop costing money per click.
 * Sponsored job listings charge for every applicant; this page is the free
 * channel that the listing, the van, the flyers and word of mouth all point at.
 */

const PERKS = [
  {
    title: 'Steady work, not one-offs',
    body: 'Regular houses on a regular schedule. You get the same clients week after week, not a scramble for the next job.',
  },
  {
    title: 'Flexible hours',
    body: 'Tell us the days and times you can work and we build around them. Part time and full time both work.',
  },
  {
    title: 'Weekly pay',
    body: 'Paid every week, on time. No waiting a month to get paid for work you already did.',
  },
  {
    title: 'Supplies provided',
    body: 'We supply what you clean with. You do not buy your own products out of your own pay.',
  },
  {
    title: 'Paid training',
    body: 'New to cleaning? You are trained on our checklist before you are sent out on your own.',
  },
  {
    title: 'Respect, plainly',
    body: 'Clear instructions, honest hours, and someone who answers the phone when you call.',
  },
]

const REQUIREMENTS = [
  'Legally able to work in the United States',
  'Reliable transport to get to homes around the Denver metro',
  'Show up when you say you will',
  'Careful, thorough work in someone else’s home',
  'Experience helps, but we train the right person',
]

export default function CareersPage() {
  return (
    <main className="pt-20 bg-[#F7FAFC]">
      {/* Hero */}
      <section className="bg-[#0F2240] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Now hiring — Denver &amp; surrounding areas
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 max-w-3xl">
            Clean with us.<br />
            <span className="text-[#00A896]">Get paid weekly.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-8">
            We have more homes booked than cleaners to clean them. If you are careful, reliable and
            want steady hours, we want to talk to you. No resume needed — the form below takes about
            a minute.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#apply"
              className="px-8 py-4 rounded-xl bg-[#00A896] text-white font-bold hover:bg-[#008f80] transition-colors"
            >
              Apply now
            </a>
            <a
              href="tel:+17206778799"
              className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
            >
              Call (720) 677-8799
            </a>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-black text-[#0F2240] tracking-tight mb-12">
          What you get
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="bg-white rounded-2xl p-7 border border-[#E4EBF2] shadow-sm"
            >
              <h3 className="text-lg font-bold text-[#0F2240] mb-3">{perk.title}</h3>
              <p className="text-[#4A6583] leading-relaxed text-[15px]">{perk.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we ask */}
      <section className="bg-white border-y border-[#E4EBF2] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F2240] tracking-tight mb-6">
              What we ask
            </h2>
            <p className="text-[#4A6583] leading-relaxed mb-8">
              We are not looking for a long resume. We are looking for someone who turns up and does
              careful work in other people&apos;s homes.
            </p>
            <ul className="space-y-4">
              {REQUIREMENTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#00A896] mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#4A6583] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F7FAFC] rounded-3xl p-8 border border-[#E4EBF2]">
            <h3 className="text-xl font-bold text-[#0F2240] mb-6">How hiring works here</h3>
            <ol className="space-y-6">
              {[
                ['You apply', 'The form below, or call us. About a minute.'],
                ['We call you', 'Within one business day, to talk about hours, pay and the work.'],
                ['You ride along', 'A paid shift with an experienced cleaner so you see the standard.'],
                ['You start', 'Your own homes on your own schedule, paid weekly.'],
              ].map(([title, body], index) => (
                <li key={title} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-[#00A896] text-white font-bold text-sm flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-bold text-[#0F2240] mb-1">{title}</p>
                    <p className="text-[#4A6583] text-[15px] leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="max-w-3xl mx-auto px-6 lg:px-8 py-20 scroll-mt-24">
        <div className="text-center mb-10">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Apply
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F2240] tracking-tight mb-4">
            Tell us about yourself
          </h2>
          <p className="text-[#4A6583] leading-relaxed">
            Only your name and phone number are required. Everything else helps us match you to the
            right homes, but you can leave it blank.
          </p>
        </div>
        <ApplyForm />
      </section>
    </main>
  )
}
