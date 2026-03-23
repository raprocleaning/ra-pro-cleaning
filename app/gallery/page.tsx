'use client'
import { useState } from 'react'
import Image from 'next/image'

const categories = ['All', 'Kitchen', 'Bathroom', 'Living Room']

const galleryItems = [
  { id: 1,  src: '/gallery/kitchen-1.jpg',           category: 'Kitchen',     label: 'Kitchen Deep Clean',      desc: 'Dark wood cabinets, granite island and appliances restored' },
  { id: 2,  src: '/gallery/fridge-before-after.jpg', category: 'Kitchen',     label: 'Fridge Before & After',   desc: 'Full fridge interior sanitized and deodorized' },
  { id: 3,  src: '/gallery/kitchen-2.jpg',           category: 'Kitchen',     label: 'Custom Cabinetry Clean',  desc: 'Ornate wood cabinetry dusted and polished throughout' },
  { id: 4,  src: '/gallery/kitchen-3.jpg',           category: 'Kitchen',     label: 'Kitchen After Clean',     desc: 'Modern kitchen with stainless appliances polished' },
  { id: 5,  src: '/gallery/room-3.jpg',              category: 'Kitchen',     label: 'Kitchen Refresh',         desc: 'White cabinets, counters and stainless fridge spotless' },
  { id: 6,  src: '/gallery/room-9.jpg',              category: 'Kitchen',     label: 'Refrigerator Detail',     desc: 'Stainless exterior, handles and top polished to a shine' },
  { id: 7,  src: '/gallery/bathroom-2.jpg',          category: 'Bathroom',    label: 'Double Vanity Clean',     desc: 'Double sink, marble countertop and mirrors gleaming' },
  { id: 8,  src: '/gallery/bathroom-3.jpg',          category: 'Bathroom',    label: 'Tub & Shower Clean',      desc: 'Clawfoot tub and glass shower enclosure sanitized' },
  { id: 9,  src: '/gallery/bathroom-4.jpg',          category: 'Bathroom',    label: 'Bathroom Deep Clean',     desc: 'Full bathroom detail from floor tiles to every fixture' },
  { id: 10, src: '/gallery/room-2.jpg',              category: 'Bathroom',    label: 'Bathroom Restored',       desc: 'Clawfoot tub, toilet and all surfaces scrubbed clean' },
  { id: 11, src: '/gallery/room-4.jpg',              category: 'Bathroom',    label: 'Artisan Bathroom',        desc: 'Decorative mosaic tile and hand-painted sink polished' },
  { id: 12, src: '/gallery/room-6.jpg',              category: 'Bathroom',    label: 'Bathroom Sanitized',      desc: 'Black granite vanity, sink and toilet fully sanitized' },
  { id: 13, src: '/gallery/room-7.jpg',              category: 'Living Room', label: 'Wine Storage Clean',      desc: 'Built-in wine rack dusted and wiped down' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<null | typeof galleryItems[0]>(null)

  const filtered =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 50%, rgba(200,169,110,0.3) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Our Work
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            Gallery
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Real results from our Denver clients. Every photo tells the story of a space brought back to life.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-white border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-sm font-medium tracking-wide transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#C8A96E] text-white'
                    : 'border border-[#E0E0E0] text-[#6B6B6B] hover:border-[#C8A96E] hover:text-[#C8A96E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightbox(item)}
                className="group relative overflow-hidden border border-[#E0E0E0] hover:border-[#C8A96E] hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[#F5F5F5]">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/30 transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                <div className="p-4 bg-white flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-[#0A0A0A]">{item.label}</p>
                    <p className="text-xs text-[#6B6B6B]">{item.desc}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-[#F5F5F5] text-[#6B6B6B] shrink-0 ml-2">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[80vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.label}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white font-semibold">{lightbox.label}</p>
            <p className="text-white/60 text-sm mt-1">{lightbox.desc}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#0A0A0A] mb-4">
            Want These Results in Your Home?
          </h2>
          <p className="text-[#6B6B6B] mb-8">Book your cleaning today and see the transformation yourself.</p>
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C8A96E] text-white font-semibold px-8 py-4 hover:bg-[#B8935A] transition-colors"
          >
            Book Now
          </a>
        </div>
      </section>
    </main>
  )
}
