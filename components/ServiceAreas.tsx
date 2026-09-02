'use client'

const AREAS = [
  { name: 'Cherry Creek', desc: 'Luxury residential & condos' },
  { name: 'Glendale', desc: 'Condos & apartment turnovers' },
  { name: 'Downtown / LoDo', desc: 'Lofts, penthouses & offices' },
]

export default function ServiceAreas() {
  return (
    <section className="py-20 bg-[#0F2240]" id="service-areas">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Where We Clean
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Cherry Creek, Glendale & Downtown Denver
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We work a deliberately small footprint so our team is never far from your door —
            Cherry Creek luxury homes, Glendale condos, and Downtown lofts.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
          {AREAS.map((area) => {
            const content = (
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00A896] mt-2 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-[#00A896] transition-colors">
                    {area.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{area.desc}</p>
                </div>
              </div>
            )

            return (
              <div
                key={area.name}
                data-service-area={area.name}
                className="bg-white/5 border border-white/10 rounded-lg px-5 py-4 hover:bg-white/10 hover:border-[#00A896]/50 transition-all group"
              >
                {content}
              </div>
            )
          })}
        </div>

        {/* CTA strip */}
        <div className="bg-[#00A896]/10 border border-[#00A896]/30 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">Don&apos;t see your area?</h3>
            <p className="text-white/60 text-sm">
              We take work just outside these three neighborhoods case by case — call us and
              we&apos;ll tell you straight away whether we can cover you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="tel:7206778799"
              className="inline-flex items-center justify-center gap-2 bg-[#00A896] text-white font-bold px-7 py-3.5 rounded-none hover:bg-[#007A6C] transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (720) 677-8799
            </a>
              <a
                href="/book"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-7 py-3.5 hover:border-white hover:bg-white/10 transition-all text-sm"
              >
                Book Online
              </a>
          </div>
        </div>
      </div>
    </section>
  )
}
