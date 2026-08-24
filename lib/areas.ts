/**
 * The cities we serve, each with its own page.
 *
 * Somebody searching "house cleaning Littleton" is not served by a Denver page
 * — Google reads a page about Littleton, and so does the customer. The
 * LocalBusiness listing has claimed all of these as areaServed for months
 * while only Aurora had a page to point at.
 *
 * Every entry is written specifically: the neighborhoods are real, and the
 * angle is the kind of work that actually comes from that city. Ten copies of
 * the same paragraph with the name swapped is a doorway page, which Google
 * demotes and a customer sees straight through.
 */

export type Area = {
  slug: string
  city: string
  /** Shown under the hero, in place of a generic strapline. */
  tagline: string
  /** Two paragraphs of copy specific to this city. */
  intro: [string, string]
  /** Real neighborhoods, for the customer as much as for search. */
  neighborhoods: string[]
  /** What this city actually calls us for. */
  angle: { heading: string; body: string }
  zips: string[]
  /** Nearby cities, for internal links between area pages. */
  nearby: string[]
}

export const AREAS: Area[] = [
  {
    slug: 'denver',
    city: 'Denver',
    tagline: 'From Capitol Hill walk-ups to Central Park new builds',
    intro: [
      'Denver homes are not one thing. A 1900s brick bungalow in Baker, a converted loft in RiNo and a five-bedroom in Central Park need three different cleans, and the crew that treats them the same leaves marks on all three. We quote on what your home actually is, not on a square-footage table alone.',
      'Parking, alley access and stair counts matter here in a way they do not in the suburbs. Tell us the details when you book and the crew arrives ready instead of circling the block.',
    ],
    neighborhoods: [
      'Capitol Hill', 'Washington Park', 'Highlands & LoHi', 'Cherry Creek',
      'Five Points & RiNo', 'Baker', 'Berkeley', 'Central Park', 'Sloan’s Lake', 'Congress Park',
    ],
    angle: {
      heading: 'Old houses and short-term rentals',
      body: 'Two kinds of work dominate in Denver: pre-war homes where original woodwork, radiators and tile need care rather than force, and short-term rentals that need a fast, photograph-ready turnover between guests. We do both, and we price them differently because they are not the same job.',
    },
    zips: ['80202', '80203', '80205', '80206', '80209', '80210', '80211', '80218', '80220', '80238'],
    nearby: ['aurora', 'englewood', 'lakewood'],
  },
  {
    slug: 'aurora',
    city: 'Aurora',
    tagline: 'Family homes, base moves and medical-campus schedules',
    intro: [
      'Aurora keeps us busy with two things above all: large family homes on the south and east sides, and move in/out cleans driven by people arriving at or leaving Buckley Space Force Base and the Anschutz medical campus. Both reward a crew that shows up when it said it would.',
      'Homes out toward Southlands and Saddle Rock run big — 2,500 square feet and up is normal — so we quote by the room count and condition rather than assuming a metro average.',
    ],
    neighborhoods: [
      'Southlands', 'Saddle Rock', 'Tallyn’s Reach', 'Murphy Creek',
      'Seven Hills', 'Hoffman Heights', 'Del Mar Park', 'Heather Ridge',
    ],
    angle: {
      heading: 'Move in and move out, done to a deposit standard',
      body: 'A move-out clean is judged by a landlord or a buyer with a checklist, not by how it looks from the doorway. Inside cabinets, inside the oven, window tracks, baseboards, wiped-out closets. We clean to that standard because that is what the deposit turns on.',
    },
    zips: ['80010', '80011', '80012', '80013', '80014', '80015', '80016', '80017', '80018'],
    nearby: ['denver', 'centennial', 'englewood'],
  },
  {
    slug: 'lakewood',
    city: 'Lakewood',
    tagline: 'Mid-century ranches and the Belmar corridor',
    intro: [
      'Much of Lakewood was built between the 1950s and the 1970s, which means single-level ranches with original bathrooms, textured ceilings and kitchens that have been remodelled once or twice. That housing stock takes patience — grout, tile and older fixtures respond to the right product, not to scrubbing harder.',
      'Closer to Belmar and Union Boulevard we clean a lot of condos and townhomes, where the job is smaller but the turnaround is quicker and access is often through a shared entry.',
    ],
    neighborhoods: [
      'Belmar', 'Green Mountain', 'Applewood', 'Glennon Heights',
      'Eiber', 'Solterra', 'Union Square',
    ],
    angle: {
      heading: 'Older bathrooms and kitchens brought back',
      body: 'A deep clean on a 1960s bathroom is mostly grout, hard-water scale and hinges. It takes longer than a new build and it is worth booking as a deep clean the first time, then keeping up with a standard recurring visit.',
    },
    zips: ['80214', '80215', '80226', '80227', '80228', '80232'],
    nearby: ['denver', 'arvada', 'littleton'],
  },
  {
    slug: 'littleton',
    city: 'Littleton',
    tagline: 'Larger lots, older downtown, families on a schedule',
    intro: [
      'Littleton splits between the historic streets around Main Street and the larger family homes out toward Ken Caryl and Columbine. The first are older and detailed; the second are big, with the finished basements and bonus rooms that a square-footage estimate tends to miss.',
      'Most of our Littleton work is recurring — every two or four weeks for households where both adults work and the weekend is not for cleaning.',
    ],
    neighborhoods: [
      'Historic Downtown Littleton', 'Ken Caryl', 'Columbine', 'Southbridge',
      'Governor’s Ranch', 'Roxborough Park', 'Highlands Ranch border',
    ],
    angle: {
      heading: 'Recurring cleans that stay ahead of the house',
      body: 'A house cleaned every two weeks never needs a deep clean again. The first visit is the heavy one; after that the crew is maintaining rather than rescuing, which is why the recurring rate is lower.',
    },
    zips: ['80120', '80121', '80122', '80123', '80125', '80127', '80128', '80130'],
    nearby: ['centennial', 'englewood', 'lakewood'],
  },
  {
    slug: 'centennial',
    city: 'Centennial',
    tagline: 'Big suburban homes, finished basements included',
    intro: [
      'Centennial homes are large and relatively new, and the square footage on the listing rarely counts the finished basement. We ask about it when you book, because a 3,000-square-foot house with a finished lower level is a four-hour job, not a two-hour one.',
      'Cherry Creek School District families make up most of our recurring customers here, which means school-hours appointments and a crew that works around a house that has to be back in order by pickup.',
    ],
    neighborhoods: [
      'Southglenn', 'Piney Creek', 'Willow Creek', 'Foxridge',
      'Walnut Hills', 'Homestead in the Willows', 'Smoky Hill',
    ],
    angle: {
      heading: 'Priced on the whole house, not the listed floor plan',
      body: 'The most common bad surprise in this area is a quote that ignored the basement or the bonus room. Tell us the real room count when you book and the price you see is the price that holds.',
    },
    zips: ['80015', '80016', '80111', '80112', '80121', '80122'],
    nearby: ['littleton', 'aurora', 'greenwood-village'],
  },
  {
    slug: 'englewood',
    city: 'Englewood',
    tagline: 'Bungalows, condos and a lot of first apartments',
    intro: [
      'Englewood runs small and dense compared with the south suburbs — post-war bungalows, duplexes and apartment buildings along the Broadway corridor. Jobs here are quicker, and a good share of them are move-out cleans for renters who want the deposit back.',
      'We also clean a number of medical and professional offices near Swedish and Craig, usually after hours so the space is ready before the first appointment of the day.',
    ],
    neighborhoods: [
      'Broadway corridor', 'Englewood Station', 'Cherry Hills Village border',
      'Centennial Acres', 'Southwest Englewood',
    ],
    angle: {
      heading: 'Rental turnovers on a landlord’s timetable',
      body: 'Turnovers here are usually needed between one tenant leaving and the next arriving, which is a matter of days. We book those tight and clean to the checklist a property manager will walk with, not to a general tidy.',
    },
    zips: ['80110', '80112', '80113'],
    nearby: ['denver', 'littleton', 'greenwood-village'],
  },
  {
    slug: 'greenwood-village',
    city: 'Greenwood Village',
    tagline: 'Executive homes and the offices of the Tech Center',
    intro: [
      'Greenwood Village is two jobs in one city. On the residential side, large homes on acre lots where the detail expected is high and discretion matters. On the commercial side, the Denver Tech Center — suites, common areas and break rooms cleaned on a nightly or weekly contract.',
      'Both want the same thing from us: the same crew each visit, a fixed schedule, and no need to explain the job twice.',
    ],
    neighborhoods: [
      'Denver Tech Center', 'Greenwood Hills', 'Preston Hollow',
      'The Preserve', 'Village Green', 'Orchard Hills',
    ],
    angle: {
      heading: 'Office cleaning on a contract, not a call-out',
      body: 'Commercial work runs on a schedule you can plan around — after hours, keys and alarm codes handled properly, an agreed scope in writing. Ask for a walkthrough and we will quote the building rather than guessing from a floor count.',
    },
    zips: ['80111', '80112', '80121'],
    nearby: ['centennial', 'englewood', 'aurora'],
  },
  {
    slug: 'arvada',
    city: 'Arvada',
    tagline: 'Olde Town character and Candelas new build',
    intro: [
      'Arvada spans a century of building. Around Olde Town the houses are small, original and full of the surfaces that reward a careful deep clean. Out at Candelas and Leyden Rock they are new, open-plan and mostly about keeping up with dust from the construction still going on nearby.',
      'That construction is worth naming: new-build neighborhoods generate fine drywall dust for months after handover, and it settles somewhere no standard clean reaches.',
    ],
    neighborhoods: [
      'Olde Town Arvada', 'Candelas', 'Leyden Rock', 'Ralston Valley',
      'Whisper Creek', 'Lake Arbor', 'Scenic Heights',
    ],
    angle: {
      heading: 'Post-construction and new-build dust',
      body: 'A newly finished house is not a clean house. Drywall dust gets into vents, window tracks, cabinet runners and light fixtures, and it keeps reappearing until someone removes it properly. That is a post-construction clean, and it is priced after we see the place.',
    },
    zips: ['80002', '80003', '80004', '80005', '80007'],
    nearby: ['westminster', 'lakewood', 'denver'],
  },
  {
    slug: 'westminster',
    city: 'Westminster',
    tagline: 'North metro families, recurring schedules',
    intro: [
      'Westminster is family housing, most of it built from the 1980s onward, with the kitchens and bathrooms that get the hardest use in a busy household. Nearly all of our work here is recurring — every two or four weeks, same crew, same day.',
      'Around Bradburn and Legacy Ridge the homes are larger and newer; further south toward Federal they are smaller and older. We quote each on what it is.',
    ],
    neighborhoods: [
      'Legacy Ridge', 'Bradburn Village', 'The Ranch', 'Countryside',
      'Standley Lake', 'Sunstream', 'Westminster Station',
    ],
    angle: {
      heading: 'Kitchens and bathrooms that take a beating',
      body: 'In a full house those two rooms are most of the job. Our recurring visits weight the time toward them rather than spreading it evenly across a floor plan where the guest room has not been touched since the last clean.',
    },
    zips: ['80003', '80020', '80021', '80030', '80031', '80234'],
    nearby: ['arvada', 'thornton', 'denver'],
  },
  {
    slug: 'thornton',
    city: 'Thornton',
    tagline: 'The fastest-building corner of the metro',
    intro: [
      'Thornton is still going up. North of 144th whole streets are new, which means handover cleans, post-construction dust and first-move-in cleans before the furniture arrives. Original Thornton, further south, is older and smaller and mostly wants a straightforward recurring clean.',
      'Because so much here is new construction, we get asked for the same thing repeatedly: make it liveable before the moving truck comes. That is a job worth booking a few days ahead of the move, not the morning of.',
    ],
    neighborhoods: [
      'Original Thornton', 'Eastlake', 'North Creek', 'Riverdale',
      'Hunters Glen', 'Cundall Farms', 'Willow Bend',
    ],
    angle: {
      heading: 'Clean before the truck arrives',
      body: 'An empty house is the easiest house to clean properly — inside every cabinet, every closet, every window track, with nothing to work around. Book the clean for the day before your move and you start in a house that is actually finished.',
    },
    zips: ['80023', '80229', '80233', '80241', '80260', '80602', '80614'],
    nearby: ['westminster', 'arvada', 'denver'],
  },
]

export const areaBySlug = (slug: string): Area | undefined =>
  AREAS.find((area) => area.slug === slug)
