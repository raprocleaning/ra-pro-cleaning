import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | R A Pro Cleaning Services Denver',
  description:
    'Learn about R A Pro Cleaning Services LLC — Denver\'s trusted professional cleaning company. Licensed, insured, and dedicated to exceptional results.',
}

const teamMembers = [
  {
    name: 'Houda',
    role: 'Cleaning Service Manager',
    initials: 'H',
    bio: 'With years of hands-on experience in professional cleaning, Houda leads every job with an eye for detail and a commitment to going above and beyond. Her clients\' consistent 5-star reviews reflect her dedication to exceptional work.',
  },
  {
    name: 'Timothy Powell',
    role: 'Customer Service Representative',
    initials: 'TP',
    bio: 'Timothy ensures every client experience is seamless from the first call to the final walkthrough. His warm, professional approach makes scheduling easy and every interaction pleasant.',
  },
]

const values = [
  {
    title: 'Excellence',
    description: 'We don\'t cut corners. Every clean is executed to the same high standard, every time.',
  },
  {
    title: 'Trust',
    description: 'We are fully licensed, insured, and background-checked. Your home and safety are our priority.',
  },
  {
    title: 'Transparency',
    description: 'Clear pricing, honest communication, and no surprise fees — ever.',
  },
  {
    title: 'Customization',
    description: 'No two homes are the same. We listen and adapt every service to your specific needs.',
  },
]

const checklistItems = {
  kitchen: [
    'Wipe all countertops and surfaces',
    'Clean exterior of appliances',
    'Degrease stovetop and burners',
    'Clean sink and polish faucet',
    'Wipe cabinet exteriors and handles',
    'Clean microwave inside and out',
    'Mop kitchen floor',
    'Empty and reline trash',
  ],
  bathrooms: [
    'Scrub and sanitize toilet inside and out',
    'Clean shower and/or tub (scrub grout)',
    'Wipe and sanitize sink and vanity',
    'Clean mirrors streak-free',
    'Descale showerhead and faucets',
    'Wipe cabinet exteriors',
    'Mop and disinfect floor',
    'Empty trash and replace liner',
  ],
  living: [
    'Dust all furniture, shelves, and surfaces',
    'Clean ceiling fans and light fixtures',
    'Vacuum all rugs and carpets',
    'Mop hardwood and tile floors',
    'Wipe window sills and door frames',
    'Clean glass surfaces and mirrors',
    'Fluff and arrange cushions',
    'Dust baseboards',
  ],
  bedrooms: [
    'Dust all furniture and surfaces',
    'Clean ceiling fans',
    'Make bed (fresh linens or remake existing)',
    'Vacuum under bed and furniture',
    'Vacuum carpet or mop floor',
    'Wipe light switches and door handles',
    'Clean mirrors',
    'Empty trash',
  ],
}

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 70% 50%, rgba(200,169,110,0.3) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            About R A Pro<br />Cleaning Services
          </h1>
          <p className="text-white/60 text-xl max-w-xl">
            Denver&apos;s trusted cleaning professionals — built on excellence, trust, and a genuine love for clean spaces.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                Who We Are
              </p>
              <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tight mb-6">
                Denver&apos;s Premium<br />Cleaning Experience
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-5">
                R A Pro Cleaning Services LLC was founded with a single mission: to bring Denver
                homeowners and businesses the kind of professional cleaning service they deserve —
                thorough, reliable, and tailored to their individual needs.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-5">
                We believe a clean space isn&apos;t just about appearances. It&apos;s about the way it feels
                to walk into a room that&apos;s been properly cared for. That&apos;s why we go beyond the
                surface, paying attention to the details that other cleaners overlook.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                With 24 five-star reviews, a fully licensed and insured team, and a track record of
                excellence throughout the Denver metro area, we&apos;re proud to be the cleaning service
                that Denver trusts.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '24', label: '5-Star Reviews' },
                { value: '100%', label: 'Licensed & Insured' },
                { value: '5+', label: 'Years in Denver' },
                { value: '200+', label: 'Homes Cleaned' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#F5F5F5] p-8 text-center">
                  <div className="text-4xl font-black text-[#C8A96E] mb-2">{stat.value}</div>
                  <div className="text-[#6B6B6B] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              The Team
            </p>
            <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tight">
              Meet the People Behind the Clean
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white p-8 border border-[#E0E0E0]">
                <div className="w-16 h-16 bg-[#C8A96E] flex items-center justify-center text-white text-xl font-bold mb-6">
                  {member.initials}
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-1">{member.name}</h3>
                <p className="text-[#C8A96E] text-sm font-medium mb-4">{member.role}</p>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Our Values
            </p>
            <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tight">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="border-t-2 border-[#C8A96E] pt-6">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">{value.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensed & Insured Callout */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 border border-[#C8A96E] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#C8A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Fully Licensed &amp; Insured
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10">
            Every member of our team is background-checked, licensed, and covered by full liability
            insurance. Your home and your peace of mind are fully protected.
          </p>
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C8A96E] text-white font-semibold px-8 py-4 hover:bg-[#B8935A] transition-colors"
          >
            Book with Confidence
          </a>
        </div>
      </section>

      {/* Cleaning Checklist */}
      <section className="py-24 bg-[#F5F5F5]" id="checklist">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Our Standards
            </p>
            <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tight">
              Cleaning Checklist
            </h2>
            <p className="text-[#6B6B6B] mt-4 max-w-xl mx-auto">
              Every clean follows our comprehensive checklist. Here&apos;s exactly what gets done.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(checklistItems).map(([room, items]) => (
              <div key={room} className="bg-white p-6 border border-[#E0E0E0]">
                <h3 className="font-bold text-[#0A0A0A] capitalize mb-4 pb-3 border-b border-[#E0E0E0]">
                  {room === 'living' ? 'Living Areas' : room.charAt(0).toUpperCase() + room.slice(1)}
                </h3>
                <ul className="space-y-2">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                      <div className="w-4 h-4 bg-[#C8A96E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-[#C8A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-[#0A0A0A]">Ready to experience the difference?</h3>
            <p className="text-[#6B6B6B] mt-1">Join hundreds of satisfied Denver homeowners.</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://raprocleaningservices.bookingkoala.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C8A96E] text-white font-semibold px-6 py-3 hover:bg-[#B8935A] transition-colors"
            >
              Book Now
            </a>
            <Link
              href="/contact"
              className="border border-[#E0E0E0] text-[#0A0A0A] font-medium px-6 py-3 hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
