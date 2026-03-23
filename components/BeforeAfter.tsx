'use client'
import Image from 'next/image'

const pairs = [
  {
    label: 'Fridge Interior',
    src: '/gallery/fridge-before-after.jpg',
    desc: 'Full fridge interior sanitized, deodorized, and restored',
  },
  {
    label: 'Carpet Restoration',
    src: '/gallery/carpet-before-after.jpg',
    desc: 'Hot water extraction lifting deep stains and embedded dirt',
  },
]

export default function BeforeAfter() {
  return (
    <section className="py-24 bg-[#EBF4FF] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 50%, rgba(74,144,217,0.25) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#4A90D9] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Real Results
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A2B4B] tracking-tight mb-4">
            Before &amp; After
          </h2>
          <p className="text-[#4A6583] text-lg max-w-xl mx-auto">
            Every photo is from a real Denver client. This is what R A Pro quality looks like.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pairs.map((pair) => (
            <div key={pair.label} className="group">
              <div className="relative overflow-hidden border border-[#C8DFEF] group-hover:border-[#4A90D9]/40 transition-colors duration-300">
                {/* Image */}
                <div className="aspect-[4/3] relative">
                  <Image
                    src={pair.src}
                    alt={`${pair.label} before and after`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Before / After labels */}
                  <div className="absolute inset-0 flex">
                    <div className="flex-1 flex items-end p-4">
                      <span className="bg-[#1A2B4B]/80 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5">
                        Before
                      </span>
                    </div>
                    <div className="w-px bg-white/30" />
                    <div className="flex-1 flex items-end justify-end p-4">
                      <span className="bg-[#4A90D9]/90 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5">
                        After
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="bg-white px-5 py-4 border-t border-[#C8DFEF]">
                  <p className="text-[#1A2B4B] font-semibold text-sm">{pair.label}</p>
                  <p className="text-[#4A6583] text-xs mt-0.5">{pair.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 border border-[#4A90D9] text-[#4A90D9] font-semibold px-8 py-4 hover:bg-[#4A90D9] hover:text-white transition-colors"
          >
            See Full Gallery
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
