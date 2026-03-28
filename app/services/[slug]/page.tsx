import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ServiceData {
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  price: string
  priceNote: string
  includes: string[]
  relatedSlugs: string[]
}

const servicesData: Record<string, ServiceData> = {
  'deep-cleaning': {
    slug: 'deep-cleaning',
    name: 'Deep Cleaning',
    tagline: 'The most thorough clean your home has ever had.',
    description:
      'Our deep cleaning service covers every inch of your home — from ceiling fans to baseboards, inside appliances, behind furniture, and every surface in between.',
    longDescription:
      "Deep cleaning goes beyond surface-level tidying. We target the buildup that accumulates over time: inside your oven, behind your refrigerator, grout lines in your bathroom tiles, and all the hard-to-reach spots that standard cleaning skips. Ideal for a seasonal reset, after a renovation, or when you're taking over a new home.",
    price: 'Starting at $700',
    priceNote: 'Final pricing based on square footage and condition of home.',
    includes: [
      'All rooms: ceiling fans, light fixtures, and vents dusted',
      'Kitchen: inside oven, microwave, refrigerator exterior, all cabinets wiped',
      'Bathrooms: scrubbing grout, descaling fixtures, sanitizing all surfaces',
      'All baseboards, window sills, and door frames cleaned',
      'Inside all closets and pantries',
      'Behind and under major appliances and furniture',
      'Floors vacuumed and mopped throughout',
      'Trash removed from all rooms',
    ],
    relatedSlugs: ['standard-cleaning', 'house-cleaning', 'move-in-out'],
  },
  'standard-cleaning': {
    slug: 'standard-cleaning',
    name: 'Standard Cleaning',
    tagline: 'Keep your home consistently clean with recurring service.',
    description:
      'Our standard cleaning service maintains your home on a regular schedule. Choose weekly, bi-weekly, or monthly visits for a home that always looks its best.',
    longDescription:
      'Regular cleaning prevents the buildup that makes deep cleaning necessary. Our standard service covers all the essentials: kitchen surfaces, bathroom sanitization, dusting, vacuuming, and mopping. Each visit is consistent, thorough, and tailored to your preferences.',
    price: 'Starting at $600',
    priceNote: 'Recurring clients receive priority scheduling and preferred rates.',
    includes: [
      'Kitchen counters, sink, and stovetop cleaned',
      'Exterior of appliances wiped down',
      'Bathroom toilets, sinks, showers, and tubs scrubbed',
      'All rooms dusted: furniture, shelves, ceiling fans',
      'Floors vacuumed and mopped',
      'Mirrors and glass surfaces cleaned streak-free',
      'Trash emptied and bags replaced',
      'Beds made with existing linens',
    ],
    relatedSlugs: ['deep-cleaning', 'house-cleaning', 'bedroom-cleaning'],
  },
  'house-cleaning': {
    slug: 'house-cleaning',
    name: 'House Cleaning',
    tagline: 'Complete residential cleaning for every room.',
    description:
      'Our house cleaning service covers your entire home from top to bottom — kitchen, bathrooms, bedrooms, living areas, and laundry rooms all treated with the same level of care.',
    longDescription:
      'Whether you need a one-time clean or want to set up a regular schedule, our house cleaning service is fully customizable. We work around your schedule and preferences, paying special attention to the areas that matter most to you.',
    price: 'Custom quote',
    priceNote: 'Pricing depends on home size and scope. Contact us for a free estimate.',
    includes: [
      'Full kitchen cleaning including all surfaces and appliances',
      'All bathrooms sanitized top to bottom',
      'Bedrooms cleaned, beds made, surfaces dusted',
      'Living and dining areas cleaned and vacuumed',
      'Laundry room wiped and organized',
      'All floors vacuumed and mopped',
      'Windows interior cleaned',
      'Full home dusting including hard-to-reach areas',
    ],
    relatedSlugs: ['deep-cleaning', 'standard-cleaning', 'bedroom-cleaning'],
  },
  'office-cleaning': {
    slug: 'office-cleaning',
    name: 'Office Cleaning',
    tagline: 'A clean workspace is a productive workspace.',
    description:
      'Professional commercial cleaning for offices, co-working spaces, retail locations, and any business environment that demands a spotless appearance.',
    longDescription:
      'A clean office makes a strong impression on clients and boosts team morale. We offer flexible scheduling including after-hours cleaning so your business is never interrupted. Our commercial team is experienced with a variety of office environments and industries.',
    price: 'Custom quote',
    priceNote: 'Pricing based on office size, frequency, and scope of work.',
    includes: [
      'Desks, workstations, and conference rooms cleaned and sanitized',
      'Kitchen and break room: surfaces, appliances, and sink',
      'Restrooms fully sanitized and restocked',
      'Common areas vacuumed, dusted, and mopped',
      'Trash emptied and recycling managed',
      'Windows and glass doors streak-free',
      'Reception area polished and presentable',
      'After-hours scheduling available',
    ],
    relatedSlugs: ['deep-cleaning', 'standard-cleaning', 'move-in-out'],
  },
  'move-in-out': {
    slug: 'move-in-out',
    name: 'Move In/Out Cleaning',
    tagline: 'Start fresh or leave spotless.',
    description:
      "Whether you're moving in or moving out, our comprehensive cleaning ensures the space meets the highest standards — for your own peace of mind or to satisfy your landlord.",
    longDescription:
      "Moving is stressful enough without worrying about the cleaning. Our move-in/out service is designed to deliver a spotless result that maximizes your security deposit return or ensures your new home feels truly fresh before you unpack.",
    price: 'Custom quote',
    priceNote: 'Pricing based on home size. We recommend booking early as availability fills fast.',
    includes: [
      'Inside all cabinets, drawers, and closets',
      'Inside all appliances: oven, refrigerator, microwave, dishwasher',
      'All bathrooms deep cleaned and sanitized',
      'Walls wiped for scuffs and marks',
      'All baseboards, window sills, and ledges',
      'Ceiling fans and light fixtures',
      'All floors vacuumed and mopped',
      'Garage sweep if applicable',
    ],
    relatedSlugs: ['deep-cleaning', 'house-cleaning', 'airbnb-cleaning'],
  },
  'airbnb-cleaning': {
    slug: 'airbnb-cleaning',
    name: 'Airbnb Cleaning',
    tagline: 'Keep your 5-star rating with every turnover.',
    description:
      'Fast, reliable, and thorough cleaning between guest stays. We handle the turnover so you can focus on hosting — and your guests will arrive to a hotel-quality clean.',
    longDescription:
      'Airbnb guests expect pristine accommodations. Our turnover cleaning service ensures your property is guest-ready every time, from fresh linens to spotless bathrooms. We can coordinate directly with your booking schedule for seamless transitions.',
    price: 'Custom quote',
    priceNote: 'Pricing based on property size and number of bedrooms/bathrooms.',
    includes: [
      'Full property clean between every guest',
      'Fresh linens and towels (if provided)',
      'Bathrooms sanitized and restocked',
      'Kitchen cleaned, dishes washed and put away',
      'Floors vacuumed and mopped throughout',
      'Welcome setup if desired (folding, staging)',
      'Restocking toiletries and essentials (if provided)',
      'Inspection and damage reporting',
    ],
    relatedSlugs: ['deep-cleaning', 'standard-cleaning', 'move-in-out'],
  },
  'kitchen-cleaning': {
    slug: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    tagline: 'The heart of your home — cleaned to perfection.',
    description:
      'Our specialized kitchen cleaning tackles the grease, grime, and buildup that accumulates in the most-used room in your home.',
    longDescription:
      'Kitchens require specialized attention. Grease builds up on surfaces, food debris hides in corners, and appliances accumulate residue over time. Our kitchen cleaning service gets into every corner, inside every appliance, and leaves your kitchen gleaming.',
    price: 'Custom quote',
    priceNote: 'Often included in full house and deep cleaning packages.',
    includes: [
      'Inside oven: racks, door, walls, and floor',
      'Inside microwave and toaster oven',
      'Refrigerator exterior wiped and deodorized',
      'All cabinet exteriors and handles degreased',
      'Countertops and backsplash sanitized',
      'Sink scrubbed and fixture polished',
      'Stovetop: burners, grates, and surrounding areas',
      'Floor swept, scrubbed, and mopped',
    ],
    relatedSlugs: ['deep-cleaning', 'house-cleaning', 'bathroom-cleaning'],
  },
  'bathroom-cleaning': {
    slug: 'bathroom-cleaning',
    name: 'Bathroom Cleaning',
    tagline: 'From floor to ceiling — sanitized and sparkling.',
    description:
      'Detailed bathroom sanitization that covers every surface from floor to ceiling. We tackle soap scum, hard water stains, mold, and grime with professional-grade products.',
    longDescription:
      'Bathrooms are the most important room to keep sanitary in your home. Our bathroom cleaning goes beyond a quick wipe — we scrub grout, descale showerheads, sanitize toilets inside and out, polish all fixtures, and leave the space smelling fresh.',
    price: 'Custom quote',
    priceNote: 'Often included in full house and deep cleaning packages.',
    includes: [
      'Toilet: bowl, exterior, base, and behind cleaned and sanitized',
      'Shower and tub: grout scrubbed, fixtures descaled',
      'Sink and vanity fully sanitized',
      'Mirrors cleaned streak-free',
      'All tile walls and floors scrubbed',
      'Cabinets and storage wiped inside and out',
      'Exhaust fan dusted',
      'Floor mopped and disinfected',
    ],
    relatedSlugs: ['deep-cleaning', 'house-cleaning', 'kitchen-cleaning'],
  },
  'bedroom-cleaning': {
    slug: 'bedroom-cleaning',
    name: 'Bedroom Cleaning',
    tagline: 'A restful, clean sanctuary every night.',
    description:
      'Full bedroom cleaning and refresh — every surface dusted, floors vacuumed, linens changed, and your personal space restored to its best.',
    longDescription:
      'Your bedroom should be a true sanctuary. Our bedroom cleaning ensures every surface is dust-free, the floors are spotless, and the air feels fresh. We pay special attention to often-missed areas like ceiling fans, under the bed, and behind nightstands.',
    price: 'Custom quote',
    priceNote: 'Often included in full house and standard cleaning packages.',
    includes: [
      'All surfaces dusted: nightstands, dressers, shelves',
      'Ceiling fan blades and light fixtures cleaned',
      'Bed made with fresh or existing linens',
      'Under bed vacuumed',
      'Floors vacuumed and/or mopped',
      'Mirrors and glass cleaned streak-free',
      'Closet exterior wiped',
      'Trash emptied and bag replaced',
    ],
    relatedSlugs: ['standard-cleaning', 'house-cleaning', 'deep-cleaning'],
  },
  'carpet-cleaning': {
    slug: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    tagline: 'Deep clean carpets that look, feel, and smell brand new.',
    description:
      'Our professional carpet cleaning service uses hot water extraction to remove deep-set stains, allergens, pet dander, and embedded dirt from all carpet types.',
    longDescription:
      "Carpets trap more dirt, allergens, and bacteria than any other surface in your home. Vacuuming alone doesn't cut it — our deep extraction method gets all the way down to the carpet fibers, lifting out what regular cleaning leaves behind. Whether you're dealing with pet stains, high-traffic wear, or just want a full refresh, we restore your carpets to their best condition.",
    price: 'Custom quote',
    priceNote: 'Pricing based on number of rooms and carpet condition.',
    includes: [
      'Pre-treatment of stains and high-traffic areas',
      'Hot water extraction (steam cleaning) of all carpet fibers',
      'Pet odor and dander treatment available',
      'Furniture moved and cleaned underneath (light pieces)',
      'Edges and corners hand-cleaned',
      'Post-clean grooming for even drying and appearance',
      'Fast dry time — typically 2–4 hours',
      'All carpet types: plush, berber, frieze, and more',
    ],
    relatedSlugs: ['deep-cleaning', 'house-cleaning', 'bedroom-cleaning'],
  },
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug]
  if (!service) return {}
  return {
    title: `${service.name} in Denver | R A Pro Cleaning Services`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData[slug]
  if (!service) notFound()

  const related = service.relatedSlugs
    .map((s) => servicesData[s])
    .filter(Boolean)

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-[#0F2240] py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 20% 50%, rgba(200,169,110,0.3) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/70">{service.name}</span>
          </div>
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Our Services
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            {service.name}
          </h1>
          <p className="text-white/70 text-xl">{service.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <p className="text-[#4A6583] text-lg leading-relaxed mb-6">
                {service.description}
              </p>
              <p className="text-[#4A6583] leading-relaxed mb-12">
                {service.longDescription}
              </p>

              {/* What's Included */}
              <div>
                <h2 className="text-2xl font-bold text-[#0F2240] mb-6 tracking-tight">
                  What&apos;s Included
                </h2>
                <ul className="space-y-3">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#00A896] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#0F2240] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-[#E6F7F5] p-8 sticky top-28">
                <h3 className="text-lg font-bold text-[#0F2240] mb-2">Pricing</h3>
                <p className="text-3xl font-black text-[#00A896] mb-2">{service.price}</p>
                <p className="text-xs text-[#4A6583] mb-8">{service.priceNote}</p>

                <a
                  href="https://raprocleaningservices.bookingkoala.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#00A896] text-white font-semibold py-4 hover:bg-[#007A6C] transition-colors mb-4"
                >
                  Book Now
                </a>
                <a
                  href="tel:7206778799"
                  className="block w-full text-center border border-[#B2DFDB] text-[#0F2240] font-medium py-4 hover:border-[#00A896] hover:text-[#00A896] transition-colors mb-4"
                >
                  Call 720-677-8799
                </a>
                <a
                  href="/contact"
                  className="block w-full text-center text-sm text-[#4A6583] hover:text-[#00A896] transition-colors"
                >
                  Get a custom quote &rarr;
                </a>

                <div className="mt-8 pt-8 border-t border-[#B2DFDB]">
                  <p className="text-xs font-semibold text-[#0F2240] tracking-wider uppercase mb-3">
                    We Are
                  </p>
                  <ul className="space-y-2">
                    {['Licensed & Insured', 'Background Checked', 'Locally Owned', '5-Star Rated'].map((badge) => (
                      <li key={badge} className="flex items-center gap-2 text-sm text-[#4A6583]">
                        <div className="w-4 h-4 bg-[#00A896] flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {badge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="py-20 bg-[#E6F7F5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#0F2240] mb-10 tracking-tight">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="bg-white border border-[#B2DFDB] p-6 hover:border-[#00A896] hover:shadow-md transition-all duration-300 group"
                >
                  <h3 className="font-bold text-[#0F2240] mb-2 group-hover:text-[#00A896] transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-[#4A6583] text-sm leading-relaxed mb-4">{rel.description}</p>
                  <span className="text-[#00A896] text-xs font-semibold">{rel.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
