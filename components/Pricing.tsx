'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FREQUENCIES, PRICE_FLOOR, SQFT_OPTIONS, getPrice } from '@/lib/pricing'

const sqftTiers = SQFT_OPTIONS.map((opt) => ({
  range: opt.label,
  standard: getPrice('Standard Cleaning', opt.value),
  deep: getPrice('Deep Cleaning', opt.value),
  moveInOut: getPrice('Move In/Out Cleaning', opt.value),
  airbnb: getPrice('Airbnb Cleaning', opt.value),
  postConstruction: null,
}))

const serviceTypes = [
  { key: 'standard', label: 'Standard Clean', color: 'text-[#00A896]' },
  { key: 'deep', label: 'Deep Clean', color: 'text-[#0F2240]' },
  { key: 'moveInOut', label: 'Move In/Out', color: 'text-[#00A896]' },
  { key: 'airbnb', label: 'Airbnb/STR', color: 'text-[#0F2240]' },
  { key: 'postConstruction', label: 'Post-Construction', color: 'text-[#00A896]' },
]

type ServiceKey = 'standard' | 'deep' | 'moveInOut' | 'airbnb' | 'postConstruction'

export default function Pricing() {
  const [activeService, setActiveService] = useState<ServiceKey>('standard')
  const [activeFreq, setActiveFreq] = useState(0)

  const discount = FREQUENCIES[activeFreq].discount

  // Mirrors getQuote() in lib/pricing.ts: the floor caps the discount, it never
  // marks a list price up.
  const displayPrice = (base: number | null) => {
    if (base === null) return 'Call Us'
    const floor = Math.min(base, PRICE_FLOOR)
    return `$${Math.max(floor, Math.round(base * (1 - discount / 100)))}`
  }

  return (
    <section className="py-24 bg-[#F7FBFF]" id="pricing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F2240] tracking-tight mb-4">
            Colorado Market Rates
          </h2>
          <p className="text-[#4A6583] text-lg max-w-2xl mx-auto">
            Priced by square footage — no hidden fees, no surprises. Every clean includes professional-grade
            deep clean & sanitizer for a high-quality finish.
          </p>
        </div>

        {/* Service Type Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {serviceTypes.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveService(s.key as ServiceKey)}
              className={`px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors border ${
                activeService === s.key
                  ? 'bg-[#00A896] text-white border-[#00A896]'
                  : 'bg-white text-[#0F2240] border-[#B2DFDB] hover:border-[#00A896] hover:text-[#00A896]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Frequency Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FREQUENCIES.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setActiveFreq(i)}
              className={`px-5 py-2 text-sm font-medium tracking-wide transition-colors border flex items-center gap-2 ${
                activeFreq === i
                  ? 'bg-[#0F2240] text-white border-[#0F2240]'
                  : 'bg-white text-[#4A6583] border-[#B2DFDB] hover:border-[#0F2240] hover:text-[#0F2240]'
              }`}
            >
              {f.label}
              {f.badge && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                  activeFreq === i ? 'bg-white text-[#00A896]' : 'bg-[#E6F7F5] text-[#00A896]'
                }`}>
                  {f.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="bg-white border border-[#B2DFDB] overflow-hidden mb-10">
          <div className="grid grid-cols-2 bg-[#0F2240] text-white text-xs font-bold tracking-[0.15em] uppercase">
            <div className="px-6 py-4">Home Size</div>
            <div className="px-6 py-4 text-right">
              {serviceTypes.find(s => s.key === activeService)?.label}
              {discount > 0 && <span className="ml-2 text-[#00A896]">({discount}% off)</span>}
            </div>
          </div>
          {sqftTiers.map((tier, i) => (
            <div
              key={tier.range}
              className={`grid grid-cols-2 border-b border-[#E6F7F5] transition-colors hover:bg-[#F7FBFF] ${
                i % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFF]'
              }`}
            >
              <div className="px-6 py-4 text-sm text-[#0F2240] font-medium">{tier.range}</div>
              <div className="px-6 py-4 text-right">
                <span className="text-lg font-black text-[#00A896]">
                  {displayPrice(tier[activeService as keyof typeof tier] as number | null)}
                </span>
                {discount > 0 && tier[activeService as keyof typeof tier] !== null && (
                  <span className="ml-2 text-xs text-[#4A6583] line-through">
                    ${tier[activeService as keyof typeof tier]}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div className="px-6 py-3 bg-[#E6F7F5] text-xs text-[#4A6583]">
            * Prices vary by service type. Deep Clean runs about a third above Standard; Move In/Out adds $100; Post-Construction is quoted after a walkthrough. Final price confirmed at booking.
          </div>
        </div>

        {/* Frequency discount callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white border border-[#B2DFDB] p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E6F7F5] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#00A896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#0F2240] text-sm">Bi-Weekly / Every 4 Weeks</p>
              <p className="text-[#4A6583] text-sm">Save <span className="text-[#00A896] font-bold">30%</span> on every cleaning with a recurring schedule</p>
            </div>
          </div>
          <div className="bg-[#0F2240] p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-white text-sm">Weekly Service</p>
              <p className="text-white/70 text-sm">Save <span className="text-[#00A896] font-bold">40%</span> on every cleaning when you schedule weekly</p>
            </div>
          </div>
        </div>

        {/* Region note */}
        <div className="bg-[#E6F7F5] border border-[#B2DFDB] px-6 py-4 mb-10 flex items-start gap-3">
          <svg className="w-5 h-5 text-[#00A896] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-[#0F2240]">
            <span className="font-bold">Serving the Denver Metro area</span> — including Denver, Aurora, Centennial, Englewood, Lakewood, Littleton, Westminster, Thornton & surrounding Colorado communities.
            Prices reflect current Colorado market rates. Final pricing confirmed at booking based on home size and condition.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#00A896] text-white font-bold tracking-wide px-10 py-4 hover:bg-[#007A6C] transition-colors text-sm mr-4"
            >
              Book Now & Get an Instant Price
            </a>
          <Link
            href="/contact"
            className="inline-block border border-[#00A896] text-[#00A896] font-semibold tracking-wide px-10 py-4 hover:bg-[#E6F7F5] transition-colors text-sm"
          >
            Get a Custom Quote
          </Link>
        </div>

        <p className="text-center text-xs text-[#4A6583] mt-6">
          All prices based on Colorado market rates. Final price confirmed at booking. Free estimates available.
        </p>
      </div>
    </section>
  )
}
