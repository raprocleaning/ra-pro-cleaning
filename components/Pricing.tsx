'use client'
import { useState } from 'react'
import Link from 'next/link'

// Prices match VirtualAssistant.tsx exactly:
//   Standard — base rates
//   Deep      — Standard × 1.30
//   Move In/Out — Standard × 1.50
//   Airbnb    — same as Standard (turnover clean)
//   Post-Construction — $0.20 / sq ft (tier midpoint)
const sqftTiers = [
  { range: '1 – 1,249 sq ft',     standard: 155, deep: 200, moveInOut: 235, airbnb: 155, postConstruction: 200  },
  { range: '1,250 – 1,499 sq ft', standard: 175, deep: 230, moveInOut: 265, airbnb: 175, postConstruction: 275  },
  { range: '1,500 – 1,799 sq ft', standard: 195, deep: 255, moveInOut: 295, airbnb: 195, postConstruction: 330  },
  { range: '1,800 – 2,099 sq ft', standard: 215, deep: 280, moveInOut: 325, airbnb: 215, postConstruction: 390  },
  { range: '2,100 – 2,399 sq ft', standard: 235, deep: 305, moveInOut: 355, airbnb: 235, postConstruction: 450  },
  { range: '2,400 – 2,699 sq ft', standard: 250, deep: 325, moveInOut: 375, airbnb: 250, postConstruction: 510  },
  { range: '2,700 – 2,999 sq ft', standard: 270, deep: 350, moveInOut: 405, airbnb: 270, postConstruction: 570  },
  { range: '3,000 – 3,299 sq ft', standard: 290, deep: 380, moveInOut: 435, airbnb: 290, postConstruction: 630  },
  { range: '3,300 – 3,599 sq ft', standard: 300, deep: 390, moveInOut: 450, airbnb: 300, postConstruction: 690  },
  { range: '3,600 – 3,899 sq ft', standard: 320, deep: 415, moveInOut: 480, airbnb: 320, postConstruction: 750  },
  { range: '3,900 – 4,199 sq ft', standard: 335, deep: 435, moveInOut: 505, airbnb: 335, postConstruction: 810  },
  { range: '4,200 – 4,499 sq ft', standard: 345, deep: 450, moveInOut: 520, airbnb: 345, postConstruction: 870  },
  { range: '4,500 – 4,799 sq ft', standard: 360, deep: 470, moveInOut: 540, airbnb: 360, postConstruction: 930  },
  { range: '4,800+ sq ft',        standard: 375, deep: 490, moveInOut: 565, airbnb: 375, postConstruction: 1100 },
]

const serviceTypes = [
  { key: 'standard', label: 'Standard Clean', color: 'text-[#00A896]' },
  { key: 'deep', label: 'Deep Clean', color: 'text-[#0F2240]' },
  { key: 'moveInOut', label: 'Move In/Out', color: 'text-[#00A896]' },
  { key: 'airbnb', label: 'Airbnb/STR', color: 'text-[#0F2240]' },
  { key: 'postConstruction', label: 'Post-Construction', color: 'text-[#00A896]' },
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
          {frequencies.map((f, i) => (
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
          <div className="px-6 py-3 bg-[#E6F7F5] text-xs text-[#4A6583]">
            * Prices vary by service type. Deep Clean is ~30% more than Standard; Move In/Out is ~50% more; Post-Construction is priced per sq ft. Final price confirmed at booking.
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
              <p className="font-bold text-[#0F2240] text-sm">Bi-Weekly Service</p>
              <p className="text-[#4A6583] text-sm">Save <span className="text-[#00A896] font-bold">5%</span> on every cleaning when you schedule every 2 weeks</p>
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
              <p className="text-white/70 text-sm">Save <span className="text-[#00A896] font-bold">10%</span> on every cleaning when you schedule weekly</p>
            </div>
          </div>
        </div>

        {/* Carpet Cleaning Section */}
        <div className="bg-white border border-[#B2DFDB] mb-10">
          <div className="bg-[#00A896] px-6 py-4">
            <h3 className="text-white font-bold tracking-wide">🪄 Carpet Cleaning Pricing</h3>
            <p className="text-white/80 text-sm mt-1">Hot-water extraction • Professional sanitizer included</p>
          </div>
          <div className="divide-y divide-[#E6F7F5]">
            {carpetPricing.map((item) => (
              <div key={item.item} className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-[#0F2240]">{item.item}</span>
                <span className="text-sm font-bold text-[#00A896]">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-[#F7FBFF] border-t border-[#E6F7F5]">
            <p className="text-xs text-[#4A6583]">
              💡 Typical total ranges $125–$325 depending on size, condition & number of rooms. Stairs, area rugs & pet treatments quoted separately.
            </p>
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
            href="https://raprocleaningservices.bookingkoala.com"
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
