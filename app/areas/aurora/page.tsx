import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'House Cleaning Services in Aurora, CO | R A Pro Cleaning',
  description:
    'Professional house cleaning in Aurora, Colorado. Standard, deep, move in/out, Airbnb, office, and post-construction cleaning starting at $200.',
  alternates: { canonical: 'https://raprocleaningservices.com/areas/aurora' },
}

const services = [
  'Standard and recurring house cleaning',
  'Deep cleaning',
  'Move-in and move-out cleaning',
  'Airbnb and short-term rental turnovers',
  'Office and commercial cleaning',
  'Post-construction cleaning',
]

export default function AuroraCleaningPage() {
  return (
    <main className="pt-20">
      <section className="bg-[#0F2240] py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Serving Aurora, Colorado
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            House Cleaning Services in Aurora, CO
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mb-8">
            R A Pro Cleaning Services provides reliable residential and commercial cleaning
            throughout Aurora. Our licensed, insured, and background-checked team delivers
            detailed cleaning with transparent prices starting at $200.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/book" className="bg-[#00A896] text-white font-bold px-8 py-4 text-center">
              Get an Instant Quote
            </Link>
            <a href="tel:7206778799" className="border-2 border-white/40 text-white font-bold px-8 py-4 text-center">
              Call (720) 677-8799
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="text-3xl font-black text-[#0F2240] mb-5">Cleaning for Aurora Homes and Businesses</h2>
            <p className="text-[#4A6583] leading-relaxed mb-6">
              From recurring home cleaning to move-out and commercial projects, we serve Aurora
              customers with flexible scheduling, clear communication, and a 5.0-star Google rating.
            </p>
            <p className="text-[#4A6583] leading-relaxed">
              We serve neighborhoods and communities throughout Aurora and the surrounding Denver
              metro. Contact us with your ZIP code to confirm availability.
            </p>
          </div>
          <div className="bg-[#E6F7F5] border border-[#B2DFDB] p-8">
            <h2 className="text-2xl font-black text-[#0F2240] mb-5">Aurora Cleaning Services</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="flex gap-3 text-[#0F2240]">
                  <span className="text-[#00A896] font-bold">✓</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#00A896] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-4">Ready for a Cleaner Aurora Home?</h2>
          <p className="text-white/80 mb-8">Get a clear quote in about 60 seconds. Services start at $200.</p>
          <Link href="/book" className="inline-block bg-white text-[#007A6C] font-bold px-9 py-4">
            Get My Quote
          </Link>
        </div>
      </section>
    </main>
  )
}
