'use client'
import { useState } from 'react'
import Link from 'next/link'

const sqftTiers = [
  { range: 'Up to 500 sq ft', standard: 110, deep: 185, moveInOut: 210, airbnb: 185, postConstruction: 250 },
  { range: '501 – 800 sq ft', standard: 130, deep: 225, moveInOut: 255, airbnb: 225, postConstruction: 320 },
  { range: '801 – 1,200 sq ft', standard: 155, deep: 265, moveInOut: 300, airbnb: 265, postConstruction: 395 },
  { range: '1,201 – 1,600 sq ft', standard: 185, deep: 310, moveInOut: 350, airbnb: 310, postConstruction: 470 },
  { range: '1,601 – 2,000 sq ft', standard: 215, deep: 360, moveInOut: 400, airbnb: 360, postConstruction: 550 },
  { range: '2,001 – 2,500 sq ft', standard: 250, deep: 415, moveInOut: 460, airbnb: 415, postConstruction: 625 },
  { range: '2,501 – 3,000 sq ft', standard: 290, deep: 470, moveInOut: 520, airbnb: 470, postConstruction: 710 },
  { range: '3,001 – 3,500 sq ft', standard: 330, deep: 530, moveInOut: 580, airbnb: 530, postConstruction: 800 },
  { range: '3,501 – 4,000 sq ft', standard: 370, deep: 590, moveInOut: 645, airbnb: 590, postConstruction: 885 },
  { range: '4,001+ sq ft', standard: 420, deep: 650, moveInOut: 710, airbnb: 650, postConstruction: null },
]

const serviceTypes = [
  { key: 'standard', label: 'Standard Clean', color: 'text-[#4A90D9]' },
  { key: 'deep', label: 'Deep Clean', color: 'text-[#1A2B4B]' },
  { key: 'moveInOut', label: 'Move In/Out', color: 'text-[#4A90D9]' },
  { key: 'airbnb', label: 'Airbnb/STR', color: 'text-[#1A2B4B]' },
  { key: 'postConstruction', label: 'Post-Construction', color: 'text-[#4A90D9]' },
]

const frequencies = [
  { label: 'One-Time', discount: 0, badge: null },
  { label: 'Monthly', discount: 0, badge: null },
  { label: 'Bi-Weekly', discount: 5, badge: '5% OFF' },
  { label: 'Weekly', discount: 10, badge: '10% OFF' },
]

const carpetPricing = [
  { item: 'Minimum (up to 200 sq ft)', price: '$125' },
  { item: 'Per Additional Room', price: '$60 – $75' },
  { item: 'Stairs', price: '$60' },
  { item: 'Area Rugs', price: 'By size & material' },
  { item: 'Pet / Odor / Deep Stain Treatment', price: 'Custom quote' },
]

type ServiceKey = 'standard' | 'deep' | 'moveInOut' | 'airbnb' | 'postConstruction'

export default function Pricing() {
  const [activeService, setActiveService] = useState<ServiceKey>('standard')
  const [activeFreq, setActiveFreq] = useState(0)

  const discount = frequencies[activeFreq].discount

  const getPrice = (base: number | null) => {
    if (base === null) return 'Call Us'
    const discounted = base * (1 - discount / 100)
    return `$${Math.round(discounted)}`
  }

  return (
    <section className="py-24 bg-[#F7FBFF]" id="pricing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#4A90D9] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A2B4B] tracking-tight mb-4">
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
                  ? 'bg-[#4A90D9] text-white border-[#4A90D9]'
                  : 'bg-white text-[#1A2B4B] border-[#C8DFEF] hover:border-[#4A90D9] hover:text-[#4A90D9]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Frequency Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {frequencies.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setActiveFreq(i)}
              className={`px-5 py-2 text-sm font-medium tracking-wide transition-colors border flex items-center gap-2 ${
                activeFreq === i
                  ? 'bg-[#1A2B4B] text-white border-[#1A2B4B]'
                  : 'bg-white text-[#4A6583] border-[#C8DFEF] hover:border-[#1A2B4B] hover:text-[#1A2B4B]'
              }`}
            >
              {f.label}
              {f.badge && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                  activeFreq === i ? 'bg-white text-[#4A90D9]' : 'bg-[#EBF4FF] text-[#4A90D9]'
                }`}>
                  {f.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="bg-white border border-[#C8DFEF] overflow-hidden mb-10">
          <div className="grid grid-cols-2 bg-[#1A2B4B] text-white text-xs font-bold tracking-[0.15em] uppercase">
            <div className="px-6 py-4">Home Size</div>
            <div className="px-6 py-4 text-right">
              {serviceTypes.find(s => s.key === activeService)?.label}
              {discount > 0 && <span className="ml-2 text-[#4A90D9]">({discount}% off)</span>}
            </div>
          </div>
          {sqftTiers.map((tier, i) => (
            <div
              key={tier.range}
              className={`grid grid-cols-2 border-b border-[#EBF4FF] transition-colors hover:bg-[#F7FBFF] ${
                i % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFF]'
              }`}
            >
              <div className="px-6 py-4 text-sm text-[#1A2B4B] font-medium">{tier.range}</div>
              <div className="px-6 py-4 text-right">
                <span className="text-lg font-black text-[#4A90D9]">
                  {getPrice(tier[activeService as keyof typeof tier] as number | null)}
                </span>
                {discount > 0 && tier[activeService as keyof typeof tier] !== null && (
                  <span className="ml-2 text-xs text-[#4A6583] line-through">
                    ${tier[activeService as keyof typeof tier]}
                  </span>
                )}
              </div>
            </div>
          ))}
          {activeService === 'postConstruction' && (
            <div className="px-6 py-3 bg-[#EBF4FF] text-xs text-[#4A6583]">
              * 4,001+ sq ft post-construction — please contact us for a custom quote.
            </div>
          )}
        </div>

        {/* Frequency discount callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white border border-[#C8DFEF] p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EBF4FF] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#4A90D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#1A2B4B] text-sm">Bi-Weekly Service</p>
              <p className="text-[#4A6583] text-sm">Save <span className="text-[#4A90D9] font-bold">5%</span> on every cleaning when you schedule every 2 weeks</p>
            </div>
          </div>
          <div className="bg-[#1A2B4B] p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-white text-sm">Weekly Service</p>
              <p className="text-white/70 text-sm">Save <span className="text-[#4A90D9] font-bold">10%</span> on every cleaning when you schedule weekly</p>
            </div>
          </div>
        </div>

        {/* Carpet Cleaning Section */}
        <div className="bg-white border border-[#C8DFEF] mb-10">
          <div className="bg-[#4A90D9] px-6 py-4">
            <h3 className="text-white font-bold tracking-wide">🪄 Carpet Cleaning Pricing</h3>
            <p className="text-white/80 text-sm mt-1">Hot-water extraction • Professional sanitizer included</p>
          </div>
          <div className="divide-y divide-[#EBF4FF]">
            {carpetPricing.map((item) => (
              <div key={item.item} className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-[#1A2B4B]">{item.item}</span>
                <span className="text-sm font-bold text-[#4A90D9]">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-[#F7FBFF] border-t border-[#EBF4FF]">
            <p className="text-xs text-[#4A6583]">
              💡 Typical total ranges $125–$325 depending on size, condition & number of rooms. Stairs, area rugs & pet treatments quoted separately.
            </p>
          </div>
        </div>

        {/* Region note */}
        <div className="bg-[#EBF4FF] border border-[#C8DFEF] px-6 py-4 mb-10 flex items-start gap-3">
          <svg className="w-5 h-5 text-[#4A90D9] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-[#1A2B4B]">
            <span className="font-bold">Serving the Denver Metro area</span> — including Denver, Aurora, Centennial, Englewood, Lakewood, Littleton, Westminster, Thornton & surrounding Colorado communities.
            Prices reflect current Colorado market rates. Final pricing confirmed at booking based on home size and condition.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#4A90D9] text-white font-bold tracking-wide px-10 py-4 hover:bg-[#357ABD] transition-colors text-sm mr-4"
          >
            Book Now & Get an Instant Price
          </a>
          <Link
            href="/contact"
            className="inline-block border border-[#4A90D9] text-[#4A90D9] font-semibold tracking-wide px-10 py-4 hover:bg-[#EBF4FF] transition-colors text-sm"
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
