// One entry per city we publish a landing page for.
//
// Ten near-identical city pages is the fastest way to get all ten ignored, so
// every field below is written for its own city: real neighborhoods, real ZIP
// codes, and the kind of work that city actually calls about. Keep it that way
// when adding an area — copy the shape, not the sentences.

export type AreaFaq = { q: string; a: string }

export type Area = {
  slug: string
  city: string
  metaTitle: string
  metaDescription: string
  /** Sits under the H1. One paragraph, specific to this city. */
  intro: string
  /** Two paragraphs of body copy. */
  body: [string, string]
  neighborhoods: string[]
  zips: string[]
  /** What this city books most, and why. */
  highlights: { title: string; body: string }[]
  faqs: AreaFaq[]
  /** Slugs of neighbouring areas, for internal links. */
  nearby: string[]
}

export const AREAS: Area[] = [
  {
    slug: 'denver',
    city: 'Denver',
    metaTitle: 'House Cleaning Services in Denver, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house cleaning in Denver, CO. Recurring, deep, move in/out, Airbnb and office cleaning across Cherry Creek, Wash Park, Highlands, LoDo and every Denver neighborhood.',
    intro:
      'R A Pro Cleaning Services cleans homes and offices across the whole city — century-old bungalows in Wash Park, downtown lofts, and everything between. Licensed, insured, and rated 5.0 on Google.',
    body: [
      'Denver housing runs from 1920s brick bungalows with original woodwork to new-build condos downtown, and the two need very different cleaning. Older homes mean detailed dusting around trim, radiators and built-ins; a downtown loft means glass, hard floors and exposed surfaces that show every mark. Tell us which you have when you book so the crew arrives set up for it — the price itself comes off your home’s size and the service you choose, and the online quote shows it before you commit.',
      'We handle recurring weekly, biweekly and monthly cleaning, one-time deep cleans, move-in and move-out cleaning for Denver renters and buyers, and same-day-standard turnovers for short-term rental hosts. Office and commercial cleaning is available across downtown and the surrounding business districts.',
    ],
    neighborhoods: [
      'Cherry Creek',
      'Washington Park',
      'Highlands',
      'LoDo & Downtown',
      'Capitol Hill',
      'Congress Park',
      'Hilltop',
      'Central Park',
      'Lowry',
      'Berkeley',
      'Baker',
      'Observatory Park',
    ],
    zips: ['80202', '80203', '80205', '80206', '80209', '80210', '80211', '80218', '80220', '80230', '80238'],
    highlights: [
      {
        title: 'Short-term rental turnovers',
        body: 'Denver has one of the busiest short-term rental markets in the state. We turn units between guests on a tight window, restock linens and report anything a host needs to know before the next check-in.',
      },
      {
        title: 'Historic homes, handled properly',
        body: 'Original hardwood, tile and woodwork in older Denver homes need the right products and a light hand. We clean them without stripping finishes.',
      },
      {
        title: 'Offices and shared spaces',
        body: 'Downtown offices, studios and clinics on a schedule that works around your hours rather than through them.',
      },
    ],
    faqs: [
      {
        q: 'Do you clean every Denver neighborhood?',
        a: 'Yes — every Denver ZIP code, from downtown to the far edges of the city, plus the surrounding metro. If you are unsure whether your street is covered, send us your ZIP code and we will confirm before you book.',
      },
      {
        q: 'Can you clean a Denver Airbnb between guests?',
        a: 'Yes. Short-term rental turnovers are one of our regular services. Tell us your check-out and check-in times and we will schedule the turnover inside that window.',
      },
      {
        q: 'How much does house cleaning cost in Denver?',
        a: 'Price comes off your home’s square footage, with add-ons like inside the oven or refrigerator charged separately and recurring visits discounted 30–40%. Our online quote takes about a minute and gives you a real number up front — no in-home sales visit.',
      },
    ],
    nearby: ['aurora', 'lakewood', 'englewood', 'arvada'],
  },
  {
    slug: 'aurora',
    city: 'Aurora',
    metaTitle: 'House Cleaning Services in Aurora, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house cleaning in Aurora, Colorado. Standard, deep, move in/out, Airbnb, office and post-construction cleaning across Southlands, Saddle Rock, Tallyn’s Reach and all Aurora ZIP codes.',
    intro:
      'R A Pro Cleaning Services provides reliable residential and commercial cleaning throughout Aurora — from the older neighborhoods off Colfax to the newer subdivisions out past E-470.',
    body: [
      'Aurora homes tend to be larger than their Denver equivalents, with more bedrooms, more bathrooms and finished basements that often get skipped. Square footage is what sets the price, so include the basement in the size you enter and the quote covers it from the start.',
      'We work around shift schedules. Aurora has a large share of medical staff from the Anschutz campus and personnel at Buckley, and a cleaning slot that only exists at 10am on a Tuesday is no use to either. Recurring clients pick a standing day and time that fits the rotation they actually work.',
    ],
    neighborhoods: [
      'Southlands',
      'Saddle Rock',
      "Tallyn's Reach",
      'Murphy Creek',
      'Heather Gardens',
      'Mission Viejo',
      'Del Mar Park',
      'Hampden South',
      'Seven Hills',
      'Sterling Hills',
    ],
    zips: ['80010', '80011', '80012', '80013', '80014', '80015', '80016', '80017', '80018', '80019'],
    highlights: [
      {
        title: 'Move-out cleaning for relocations',
        body: 'Military and medical relocations run on a deadline. We do full move-out cleans built around what landlords and property managers actually inspect, so the deposit is not the thing that goes wrong.',
      },
      {
        title: 'Large homes and finished basements',
        body: 'Bigger Aurora floor plans mean more ground to cover. Count the finished basement in the square footage you enter so it is quoted from the start rather than found on the day.',
      },
      {
        title: 'Recurring cleaning on your rotation',
        body: 'Weekly, biweekly or monthly, on a standing slot that fits shift work rather than a standard nine-to-five week.',
      },
    ],
    faqs: [
      {
        q: 'Do you serve all of Aurora, including out past E-470?',
        a: 'Yes, including Southlands, Saddle Rock, Tallyn’s Reach and the newer developments on the eastern edge of the city. Send your ZIP code if you want it confirmed before booking.',
      },
      {
        q: 'Can you do a move-out clean on short notice?',
        a: 'Often, yes. Move-out timing rarely goes to plan, so call or text (720) 677-8799 with your date and we will tell you honestly what we can fit.',
      },
      {
        q: 'Do you clean finished basements?',
        a: 'Yes. Include the basement’s square footage in the home size you select when booking and it is priced in from the start, rather than added later.',
      },
    ],
    nearby: ['denver', 'centennial', 'englewood', 'thornton'],
  },
  {
    slug: 'lakewood',
    city: 'Lakewood',
    metaTitle: 'House Cleaning Services in Lakewood, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house cleaning in Lakewood, Colorado. Recurring, deep, move in/out and office cleaning across Belmar, Green Mountain, Applewood and Solterra.',
    intro:
      'R A Pro Cleaning Services cleans homes across Lakewood — the mid-century ranches near Belmar, the hillside homes on Green Mountain, and the newer builds out toward Solterra.',
    body: [
      'A lot of Lakewood housing stock is mid-century: single-level ranches with original bathrooms, tile and hardwood that has been down for decades. Surfaces like that respond to the right product and suffer under the wrong one, so we clean them accordingly instead of applying one aggressive approach to every house.',
      'Living at the foot of Green Mountain means trail dust and dog traffic come through the door year-round. Clients here tend to book recurring cleaning rather than one-offs, and we focus on the entryways, floors and baseboards that take the brunt of it.',
    ],
    neighborhoods: [
      'Belmar',
      'Green Mountain',
      'Applewood',
      'Solterra',
      'Union Square',
      'Glennon Heights',
      'Eiber',
      'Two Creeks',
    ],
    zips: ['80214', '80215', '80226', '80227', '80228', '80232'],
    highlights: [
      {
        title: 'Mid-century homes',
        body: 'Original hardwood, tile and mid-century fixtures cleaned with products that suit them rather than strip them.',
      },
      {
        title: 'Pet and trail traffic',
        body: 'Entryways, floors and baseboards get particular attention in a part of town where the mountain comes home with you.',
      },
      {
        title: 'Deep cleaning by season',
        body: 'A full deep clean at the turn of the season, covering the inside of appliances, cabinet fronts, window sills and the places routine cleaning skips.',
      },
    ],
    faqs: [
      {
        q: 'Do you clean homes on Green Mountain?',
        a: 'Yes — Green Mountain, Belmar, Applewood, Solterra and the rest of Lakewood, plus neighbouring Golden-side addresses on request.',
      },
      {
        q: 'Can you handle pet hair?',
        a: 'Yes — normal pet hair is part of a standard clean. For heavy shedding there is a Pet Hair Removal add-on you can select when booking, so the extra time it takes is covered.',
      },
      {
        q: 'How often should I book recurring cleaning?',
        a: 'Most Lakewood households land on biweekly. Homes with several pets or young children often prefer weekly, and a lightly used home can do well on monthly with a deep clean twice a year.',
      },
    ],
    nearby: ['denver', 'arvada', 'littleton', 'westminster'],
  },
  {
    slug: 'englewood',
    city: 'Englewood',
    metaTitle: 'House Cleaning Services in Englewood, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house cleaning in Englewood, Colorado. Apartment, condo, Airbnb, move in/out and office cleaning near CityCenter, the Broadway corridor and the Swedish medical district.',
    intro:
      'R A Pro Cleaning Services cleans apartments, condos, rentals and offices throughout Englewood, including the CityCenter area, the Broadway corridor and the streets around the Swedish medical campus.',
    body: [
      'Englewood runs denser than most of the south metro — apartments, condos and small-lot houses rather than large suburban floor plans. Smaller square footage does not mean a smaller job: compact kitchens and single bathrooms take the full load of daily use and show it fastest.',
      'Turnover is high here, so move-in and move-out cleaning is a large part of what we do in Englewood. We clean to what property managers actually inspect — inside appliances, inside cabinets and drawers, baseboards, and the bathroom detail that decides a deposit.',
    ],
    neighborhoods: [
      'Englewood CityCenter',
      'Broadway corridor',
      'Swedish medical district',
      'Cushing Park',
      'Romans Park',
      'Northwest Englewood',
    ],
    zips: ['80110', '80111', '80112', '80113'],
    highlights: [
      {
        title: 'Move-in and move-out cleaning',
        body: 'Built around the deposit inspection: inside appliances, inside cabinets, baseboards and full bathroom detail.',
      },
      {
        title: 'Apartments and condos',
        body: 'Smaller units fall in the lower size brackets, so a one-bedroom is not charged at a house rate — with the kitchen and bathroom detail those spaces actually need.',
      },
      {
        title: 'Rental and Airbnb turnovers',
        body: 'Fast, consistent turnovers between tenants or guests, with a heads-up on anything that needs the owner’s attention.',
      },
    ],
    faqs: [
      {
        q: 'Do you clean apartments and condos?',
        a: 'Yes. A large share of our Englewood work is apartments, condos and townhomes, quoted on the actual size of the unit.',
      },
      {
        q: 'Will a move-out clean get my deposit back?',
        a: 'We clean to the standard property managers inspect against — inside appliances, inside cabinets and drawers, baseboards and full bathroom detail. We cannot control a landlord’s decision, but we cover what they check.',
      },
      {
        q: 'Can you clean while I am at work?',
        a: 'Yes. Many Englewood clients leave access instructions and come home to a finished clean. We confirm entry details with you before the first visit.',
      },
    ],
    nearby: ['denver', 'greenwood-village', 'centennial', 'littleton'],
  },
  {
    slug: 'littleton',
    city: 'Littleton',
    metaTitle: 'House Cleaning Services in Littleton, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house cleaning in Littleton, Colorado. Recurring, deep, move in/out and post-construction cleaning across Ken Caryl, Columbine, Southbridge and downtown Littleton.',
    intro:
      'R A Pro Cleaning Services cleans family homes across Littleton — downtown’s older streets, the Ken Caryl valley, Columbine and the newer developments toward Roxborough.',
    body: [
      'Littleton is family-home territory: multi-level houses, several bathrooms, finished basements and garages that see constant traffic. Those homes reward a consistent recurring schedule more than an occasional rescue clean, and most of our Littleton clients run biweekly year-round.',
      'We also do seasonal deep cleans, which in this part of the metro usually means spring and the run-up to the holidays — inside the oven and refrigerator, cabinet fronts, window sills, baseboards and light fixtures, on top of the standard clean.',
    ],
    neighborhoods: [
      'Downtown Littleton',
      'Ken Caryl',
      'Columbine',
      'Southbridge',
      'Roxborough',
      'Woodmar Square',
      'Columbine Valley',
      'Highlands Ranch border',
    ],
    zips: ['80120', '80121', '80122', '80123', '80125', '80127', '80128'],
    highlights: [
      {
        title: 'Recurring family-home cleaning',
        body: 'Weekly, biweekly or monthly on a standing slot, with the same standard every visit rather than a good first clean and a fading one after.',
      },
      {
        title: 'Seasonal deep cleans',
        body: 'Spring and pre-holiday deep cleans covering inside appliances, cabinet fronts, sills, baseboards and fixtures.',
      },
      {
        title: 'Post-construction cleanup',
        body: 'Remodels and additions leave fine drywall dust in every direction. We do the full post-construction clean so the space is actually usable.',
      },
    ],
    faqs: [
      {
        q: 'Do you serve Ken Caryl and Columbine?',
        a: 'Yes — Ken Caryl, Columbine, Southbridge, downtown Littleton and out toward Roxborough. Send your ZIP code if you want confirmation before booking.',
      },
      {
        q: 'What is the difference between a standard and a deep clean?',
        a: 'A standard clean covers the regular surfaces, floors, kitchen and bathrooms. A deep clean adds inside the oven and refrigerator, cabinet fronts, window sills, baseboards, light fixtures and detailed bathroom work. Most homes start with a deep clean and continue on standard visits.',
      },
      {
        q: 'Do you clean after a remodel?',
        a: 'Yes. Post-construction cleaning is a separate service because of the fine dust involved, and we quote it after hearing the scope of the work.',
      },
    ],
    nearby: ['centennial', 'englewood', 'lakewood', 'greenwood-village'],
  },
  {
    slug: 'centennial',
    city: 'Centennial',
    metaTitle: 'House Cleaning Services in Centennial, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house cleaning in Centennial, Colorado. Recurring, deep, move in/out and office cleaning across Foxridge, Willow Creek, Piney Creek, Smoky Hill and Southglenn.',
    intro:
      'R A Pro Cleaning Services cleans homes throughout Centennial, from the established streets around Southglenn and Willow Creek to the larger houses out along Smoky Hill and Piney Creek.',
    body: [
      'Centennial is one of the most consistent recurring-cleaning markets in the metro: large, well-kept homes owned by people whose weekends are worth more than the four hours the house would take. Most of our clients here run a standing biweekly slot and a deep clean once or twice a year.',
      'Its proximity to the Denver Tech Center also means a steady stream of relocations in and out. We do move-in cleans before the furniture arrives, which is the only time a house can genuinely be cleaned end to end, and move-out cleans against the inspection standard.',
    ],
    neighborhoods: [
      'Foxridge',
      'Willow Creek',
      'Piney Creek',
      'Smoky Hill',
      'Southglenn',
      'Walnut Hills',
      'Cherry Knolls',
      'Homestead',
    ],
    zips: ['80015', '80016', '80111', '80112', '80121', '80122'],
    highlights: [
      {
        title: 'Standing biweekly service',
        body: 'A fixed day and time, the same checklist each visit, and a team that already knows the house.',
      },
      {
        title: 'Relocation cleaning',
        body: 'Move-in cleans before the furniture lands, move-out cleans against what the inspection actually covers.',
      },
      {
        title: 'Home offices and executive homes',
        body: 'Larger floor plans and home offices handled without the clean spilling into your working day.',
      },
    ],
    faqs: [
      {
        q: 'Can I keep the same cleaner each visit?',
        a: 'That is what we aim for on recurring service. A team that knows your home cleans it better and faster, so we keep assignments stable wherever scheduling allows.',
      },
      {
        q: 'Do you clean large homes over 3,000 square feet?',
        a: 'Yes. Larger Centennial floor plans are routine for us — the size brackets in our quote run past 5,000 square feet, so a big home is priced as one instead of hitting a flat cap.',
      },
      {
        q: 'How far ahead should I book?',
        a: 'A few days is usually enough for a standard clean, and recurring clients hold a standing slot. Move-outs and deep cleans are worth booking a week or two out when you can.',
      },
    ],
    nearby: ['greenwood-village', 'englewood', 'littleton', 'aurora'],
  },
  {
    slug: 'greenwood-village',
    city: 'Greenwood Village',
    metaTitle: 'House & Office Cleaning in Greenwood Village, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house and office cleaning in Greenwood Village, Colorado. Recurring residential service, executive homes and Denver Tech Center office cleaning.',
    intro:
      'R A Pro Cleaning Services cleans both sides of Greenwood Village — the large residential properties on the west side and the offices through the Denver Tech Center.',
    body: [
      'Greenwood Village homes are larger than metro average, often with more bathrooms than bedrooms, formal rooms that are used rarely but must still look right, and finishes that are unforgiving of the wrong product. Our online quote runs past 5,000 square feet, so a large home gets a real number up front rather than after a sales visit.',
      'On the commercial side, the Denver Tech Center is one of the largest office concentrations in Colorado. We clean offices, suites and shared spaces on evening or early-morning schedules, so the work happens around your business hours instead of through them.',
    ],
    neighborhoods: [
      'Denver Tech Center',
      'Greenwood Hills',
      'The Preserve',
      'Sundance Hills',
      'Village Green',
      'Orchard Hills',
    ],
    zips: ['80111', '80121'],
    highlights: [
      {
        title: 'Executive residential cleaning',
        body: 'Large homes, fine finishes and discretion, with a stable team rather than a different crew each visit.',
      },
      {
        title: 'Denver Tech Center offices',
        body: 'Offices, suites and common areas cleaned on an evening or early-morning schedule that stays out of your working day.',
      },
      {
        title: 'Recurring commercial contracts',
        body: 'Nightly, weekly or custom schedules with a consistent standard and a single point of contact.',
      },
    ],
    faqs: [
      {
        q: 'Do you clean offices in the Denver Tech Center?',
        a: 'Yes. Office and commercial cleaning throughout the DTC is a core service, usually on an evening or early-morning schedule.',
      },
      {
        q: 'Are your cleaners insured?',
        a: 'Yes — R A Pro Cleaning Services is licensed and insured, and we can provide proof of insurance for building management or an HOA on request.',
      },
      {
        q: 'Can you work outside business hours?',
        a: 'Yes. Commercial clients generally prefer after-hours or early-morning service, and we schedule accordingly.',
      },
    ],
    nearby: ['centennial', 'englewood', 'denver', 'littleton'],
  },
  {
    slug: 'arvada',
    city: 'Arvada',
    metaTitle: 'House Cleaning Services in Arvada, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house cleaning in Arvada, Colorado. Recurring, deep, move-in and post-construction cleaning across Olde Town, Candelas, Leyden Rock, West Woods and Ralston Valley.',
    intro:
      'R A Pro Cleaning Services cleans homes across Arvada — the older streets around Olde Town and the new construction going up through Candelas, Leyden Rock and West Woods.',
    body: [
      'Arvada is two housing markets at once. Around Olde Town the homes are decades old, with original floors and fixtures that need a careful hand. North and west of there, entire neighborhoods are still being built, and those homes need something different entirely.',
      'New construction arrives dirty. Drywall dust settles into every track, vent and cabinet interior, and a builder’s final sweep rarely touches it. We do post-construction and pre-move-in cleans so a brand-new house is genuinely clean before the furniture goes in.',
    ],
    neighborhoods: [
      'Olde Town Arvada',
      'Candelas',
      'Leyden Rock',
      'West Woods',
      'Ralston Valley',
      'Whisper Creek',
      'Lake Arbor',
      'Scenic Heights',
    ],
    zips: ['80002', '80003', '80004', '80005', '80007'],
    highlights: [
      {
        title: 'Post-construction cleaning',
        body: 'Drywall dust out of tracks, vents, cabinet interiors and every surface a builder’s final sweep leaves behind.',
      },
      {
        title: 'Pre-move-in cleans',
        body: 'The one moment a house is empty is the only moment it can be cleaned completely. We use it.',
      },
      {
        title: 'Older homes near Olde Town',
        body: 'Original floors, trim and fixtures cleaned with products suited to their age.',
      },
    ],
    faqs: [
      {
        q: 'Do you clean new-build homes in Candelas or Leyden Rock?',
        a: 'Yes. New construction in north Arvada is a regular part of our work, both post-construction cleanup and pre-move-in cleans.',
      },
      {
        q: 'What does post-construction cleaning include?',
        a: 'Fine dust removal throughout — window tracks, vents, light fixtures, cabinet and drawer interiors, appliance interiors, floors and all surfaces. It is quoted separately from a standard clean because of the scope.',
      },
      {
        q: 'Can you clean before I move in?',
        a: 'Yes, and it is the best time to do it. An empty house lets us reach everything that furniture normally blocks.',
      },
    ],
    nearby: ['westminster', 'lakewood', 'denver', 'thornton'],
  },
  {
    slug: 'westminster',
    city: 'Westminster',
    metaTitle: 'House Cleaning Services in Westminster, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house cleaning in Westminster, Colorado. Recurring, deep, move in/out and rental turnover cleaning across Legacy Ridge, Bradburn, Standley Lake and The Ranch.',
    intro:
      'R A Pro Cleaning Services cleans homes, townhomes and rentals throughout Westminster, from Standley Lake and Legacy Ridge across to Bradburn and the Westminster Station area.',
    body: [
      'Westminster mixes single-family homes, townhomes and a growing number of rentals. A three-story townhome with stairs between every floor takes longer than a single-level house of the same square footage, so mention the layout when you book and we will schedule the time for it.',
      'For owners and property managers, we handle turnovers between tenants on a predictable schedule: full clean, inside appliances and cabinets, and a note on anything that needs attention before the next lease starts.',
    ],
    neighborhoods: [
      'Legacy Ridge',
      'The Ranch',
      'Bradburn',
      'Standley Lake',
      'Westminster Station',
      'Countryside',
      'Cotton Creek',
      'Huron Park',
    ],
    zips: ['80020', '80021', '80030', '80031', '80234'],
    highlights: [
      {
        title: 'Townhome cleaning',
        body: 'Stairs and split levels take longer than the same square footage on one floor. Mention the layout when you book so the visit is scheduled with enough time.',
      },
      {
        title: 'Rental turnovers',
        body: 'Between-tenant cleans for owners and property managers, with a report on anything needing attention before the next lease.',
      },
      {
        title: 'Recurring household cleaning',
        body: 'Weekly, biweekly or monthly service on a standing slot, with the same standard every visit.',
      },
    ],
    faqs: [
      {
        q: 'Do you work with landlords and property managers?',
        a: 'Yes. Turnover cleaning for rentals is a regular service, and we can work to a standing schedule across several properties.',
      },
      {
        q: 'Do you bring your own supplies?',
        a: 'Yes, we bring everything needed. If you would prefer we use specific products in your home, tell us when you book and we will.',
      },
      {
        q: 'Do I need to be home during the clean?',
        a: 'No. Many Westminster clients arrange access and are out during the visit. We confirm entry details with you beforehand.',
      },
    ],
    nearby: ['arvada', 'thornton', 'lakewood', 'denver'],
  },
  {
    slug: 'thornton',
    city: 'Thornton',
    metaTitle: 'House Cleaning Services in Thornton, CO | R A Pro Cleaning',
    metaDescription:
      'Professional house cleaning in Thornton, Colorado. Recurring, deep, move-in and post-construction cleaning across Eastlake, Riverdale Ridge, North Creek and Original Thornton.',
    intro:
      'R A Pro Cleaning Services cleans homes across Thornton, from the established streets of Original Thornton to the new developments going up around Riverdale Ridge and North Creek.',
    body: [
      'North metro has been building fast, and much of Thornton’s housing is recent. New homes need a genuine first clean — builder dust works its way into vents, window tracks and cabinet interiors long before a family moves in, and it is far easier to deal with while the house is still empty.',
      'For established households we run recurring weekly, biweekly and monthly service, plus deep cleans at the turn of the season. Move-in and move-out cleaning is available either side of a lease or a sale.',
    ],
    neighborhoods: [
      'Original Thornton',
      'Eastlake',
      'Riverdale Ridge',
      'North Creek',
      'Quebec Highlands',
      'Hunters Glen',
      'Cherrywood Park',
      'Signal Creek',
    ],
    zips: ['80229', '80233', '80241', '80260', '80602'],
    highlights: [
      {
        title: 'New-build first cleans',
        body: 'Builder dust out of vents, tracks and cabinet interiors while the house is still empty and reachable.',
      },
      {
        title: 'Move-in and move-out',
        body: 'Full cleans either side of a lease or sale, covering what an inspection actually looks at.',
      },
      {
        title: 'Affordable recurring service',
        body: 'Weekly, biweekly or every-four-weeks plans take 30–40% off the base price, quoted online before you commit to anything.',
      },
    ],
    faqs: [
      {
        q: 'Do you cover north Thornton and the 80602 area?',
        a: 'Yes — Riverdale Ridge, North Creek and the newer north Thornton developments, along with the rest of the city.',
      },
      {
        q: 'Is a first clean more expensive?',
        a: 'Usually yes, though not because deep cleaning carries a higher base price — it does not. A one-time visit simply has no recurring discount, while weekly booking takes 40% off the base and biweekly or every-four-weeks takes 30%.',
      },
      {
        q: 'How do I get a price?',
        a: 'Use the online quote — it takes about a minute and gives you a real number based on your home’s size and the service you want, with no in-home sales visit.',
      },
    ],
    nearby: ['westminster', 'arvada', 'denver', 'aurora'],
  },
]

export const AREA_SLUGS = AREAS.map((a) => a.slug)

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug)
}
