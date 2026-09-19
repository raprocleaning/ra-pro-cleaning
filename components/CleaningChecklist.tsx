'use client'
import { useScrollAnimationMultiple } from '@/hooks/useScrollAnimation'

const rooms = [
  {
    room: 'Kitchen',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    tasks: [
      'Counters & backsplash wiped down',
      'Sink scrubbed, polished & disinfected',
      'Exterior of all appliances cleaned',
      'Stovetop & range hood degreased',
      'Cabinet fronts spot-cleaned',
      'Microwave cleaned inside & out',
      'Floors swept, vacuumed & mopped',
      'Trash emptied & liner replaced',
    ],
  },
  {
    room: 'Bathrooms',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z" />
      </svg>
    ),
    tasks: [
      'Toilets cleaned & sanitized inside and out',
      'Showers, tubs & tile scrubbed',
      'Mirrors & glass streak-free',
      'Vanity, sink & fixtures polished',
      'Chrome shined',
      'Cabinet exteriors wiped',
      'Floors sanitized & mopped',
      'Trash emptied & liner replaced',
    ],
  },
  {
    room: 'Bedrooms',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    tasks: [
      'Beds made or linens changed on request',
      'All surfaces dusted, including sills',
      'Mirrors & glass cleaned',
      'Light switches & door handles wiped',
      'Under-bed areas vacuumed where reachable',
      'Baseboards dusted',
      'Floors vacuumed & mopped',
      'Trash emptied & liner replaced',
    ],
  },
  {
    room: 'Living & Common Areas',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    tasks: [
      'All reachable surfaces dusted',
      'Upholstery & cushions vacuumed',
      'Tables, shelves & decor wiped',
      'TV screens & electronics dusted',
      'Stairs vacuumed',
      'Baseboards & door frames wiped',
      'Hard floors vacuumed & mopped',
      'Cobwebs removed from corners',
    ],
  },
]

const extras = [
  'Inside the oven',
  'Inside the fridge',
  'Interior windows',
  'Inside cabinets',
  'Laundry & folding',
  'Carpet shampooing',
  'Wall spot-washing',
  'Garage sweep-out',
]

const CleaningChecklist = () => {
  const ref = useScrollAnimationMultiple(0.05)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-white"
      id="whats-included"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Our Cleaning Checklist
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F2240] tracking-tight mb-4">
            What&apos;s Included In Every Clean
          </h2>
          <p className="text-[#4A6583] text-lg max-w-2xl mx-auto">
            No guesswork and no surprises. Every R A Pro cleaning follows the same detailed,
            room-by-room checklist — so you know exactly what you&apos;re getting before we arrive.
          </p>
        </div>

        {/* Room checklists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.room}
              className="fade-in-up bg-[#F5FAFA] border border-[#B2DFDB] p-8 hover:border-[#00A896] transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[#B2DFDB]">
                <div className="text-[#00A896]">{room.icon}</div>
                <h3 className="text-xl font-bold text-[#0F2240] tracking-tight">
                  {room.room}
                </h3>
              </div>
              <ul className="space-y-3">
                {room.tasks.map((task) => (
                  <li key={task} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#00A896] shrink-0 mt-px"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#4A6583] text-sm leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Add-on extras */}
        <div className="fade-in-up mt-12 bg-[#0F2240] p-10 md:p-12">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-1">
              <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-3">
                Optional Add-Ons
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-4">
                Need Something Extra?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Add any of these to your booking and we&apos;ll take care of it in the same visit.
                Just tell us what you need when you book.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {extras.map((extra) => (
                <div key={extra} className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-[#00A896] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-white/90 text-sm">{extra}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CleaningChecklist
