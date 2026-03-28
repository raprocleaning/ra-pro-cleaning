'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useScrollAnimationMultiple } from '@/hooks/useScrollAnimation'

const photos = [
  { src: '/gallery/kitchen-1.jpg',   label: 'Kitchen Deep Clean',    tag: 'Kitchen'   },
  { src: '/gallery/fridge-before-after.jpg', label: 'Fridge Before & After', tag: 'Kitchen' },
  { src: '/gallery/bathroom-2.jpg',  label: 'Bathroom Refresh',      tag: 'Bathroom'  },
  { src: '/gallery/bathroom-3.jpg',  label: 'Tub & Tile Restored',   tag: 'Bathroom'  },
]

const GallerySection = () => {
  const ref = useScrollAnimationMultiple(0.05)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#0F2240]"
      id="gallery"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 fade-in-up">
          <div>
            <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Our Work
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Real Results
            </h2>
          </div>
          <Link
            href="/gallery"
            className="self-start md:self-auto text-sm font-medium text-white/60 hover:text-[#93C5FD] transition-colors flex items-center gap-2"
          >
            View Full Gallery
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <Link
              key={i}
              href="/gallery"
              className="group relative overflow-hidden aspect-[4/3] block fade-in-up"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-xs font-semibold text-[#00A896] uppercase tracking-wider">
                  {photo.tag}
                </span>
                <p className="text-white text-sm font-medium mt-1">{photo.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
