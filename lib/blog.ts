// Every blog post, and the single source the listing, the post pages and the
// sitemap all read from. Keeping them together is deliberate: post-construction
// once sat on the site for months without ever reaching sitemap.ts, and a post
// nobody links to is a post nobody finds.
//
// Newest first — the listing renders them in this order.

export interface BlogPost {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  /** Shown on the listing card. */
  excerpt: string
  intro: string
  sections: Array<{
    heading: string
    content: string[]
  }>
  conclusion: string
}

export const posts: Record<string, BlogPost> = {
  'how-much-does-house-cleaning-cost-in-denver': {
    slug: 'how-much-does-house-cleaning-cost-in-denver',
    title: 'How Much Does House Cleaning Cost in Denver? (2026 Prices)',
    category: 'Pricing',
    date: 'September 13, 2026',
    readTime: '8 min read',
    excerpt:
      'Most Denver cleaning companies make you book a call before they will tell you a number. Here are ours in full — every size bracket, every add-on, and the discounts that actually change what you pay.',
    intro:
      'Ask most Denver cleaning companies what they charge and you get a form, a phone call, and a salesperson in your living room before anybody says a number. We would rather just publish it. Below is what R A Pro Cleaning Services actually charges in 2026 — the full size brackets, every add-on, what recurring service does to the total, and the one service we genuinely cannot quote sight-unseen.',
    sections: [
      {
        heading: 'What a Standard Clean Costs by Home Size',
        content: [
          'Price is set by the square footage of your home. A standard clean starts at $170 for homes under 1,000 square feet and rises through brackets from there: $215 for 1,000–1,249 sq ft, $280 for 1,250–1,499, $325 for 1,500–1,799, $390 for 1,800–2,099, and $400 for 2,100–2,399.',
          'Larger homes continue up the same ladder — $415 for 2,400–2,699, $460 for 2,700–2,999, $485 for 3,000–3,299, and on through to $705 for anything 5,000 square feet and above. Airbnb turnovers are priced from the same table as a standard clean. Deep cleaning runs on its own, higher one — $200 at the smallest size up to $830 at the largest — because it is genuinely more work, not the same visit under another name.',
        ],
      },
      {
        heading: 'Recurring Service Is Where the Real Saving Is',
        content: [
          'A one-time clean pays the full rate. Booking on a schedule takes a straight percentage off the base: 30% for every-four-weeks and biweekly, and 40% for weekly.',
          'On a 1,800–2,099 sq ft home, that turns a $390 clean into $273 biweekly or $234 weekly. On a 2,700–2,999 sq ft home, $460 becomes $322 biweekly. The discount applies to the base clean only — add-ons are charged at list price — and no clean is ever billed below $170, so the smallest homes hit that floor before they see the full percentage.',
          'This is worth doing the arithmetic on. Two biweekly cleans of a 2,000 sq ft home cost $546, less than one-and-a-half one-time cleans of the same house.',
        ],
      },
      {
        heading: 'Move-Out Cleaning Runs $100 Higher',
        content: [
          'Move in/out cleaning sits exactly $100 above the deep-clean rate at every size bracket — $300 for the smallest homes up to $930 for the largest. So a 2,100–2,399 sq ft move-out is $570, against $400 for a standard clean of the same place.',
          'The extra covers what an empty house needs and an occupied one does not: inside every cabinet and drawer, inside appliances, and the detail work on baseboards and bathrooms that a deposit inspection actually looks at.',
        ],
      },
      {
        heading: 'Add-Ons, and What Each One Costs',
        content: [
          'Add-ons are flat-priced regardless of home size. Inside cabinets is $80, and extra heavy dirt or extra scrubbing is also $80. Inside the oven and inside the refrigerator are $60 each.',
          'At $50 each: interior windows (up to 10), pet hair removal, wall spot cleaning, and window track cleaning. Baseboards are $40. You pick these when you book, and they are added to the total at list price — the recurring discount does not apply to them.',
        ],
      },
      {
        heading: 'The One Service We Will Not Quote Instantly',
        content: [
          'Post-construction cleaning is quoted after a conversation, not by the calculator. This is not a sales tactic — it is that square footage genuinely does not predict the work. Debris volume, paint overspray and grout haze can swing two jobs of identical size by many hours.',
          'Quoting it instantly would mean either padding every estimate to cover the worst case or under-quoting and coming back to renegotiate. Tell us the scope and we will give you a real number by phone.',
        ],
      },
      {
        heading: 'What Changes the Price — and What Does Not',
        content: [
          'What moves the number: your home’s square footage, which service you pick, how often we come, and which add-ons you choose.',
          'What does not: the number of bedrooms or bathrooms, whether it is a house or a condo, and how many floors it has. We price on size because size is what we can measure honestly before seeing the place. If your home has something unusual about it — a finished basement, three storeys of stairs, heavy pet traffic — include the basement in the square footage you enter and mention the rest when you book, so the visit is scheduled with enough time.',
          'The one practical thing to get right is the square footage itself. Include finished basements. Guessing low does not save you money; it just means the crew arrives with too little time booked.',
        ],
      },
    ],
    conclusion:
      'Every number on this page is what the booking form will quote you — there is no different price waiting behind a phone call. Enter your home size and service at raprocleaningservices.com and you will have a real total in about a minute, no in-home sales visit required.',
  },
  'move-out-cleaning-checklist-denver-renters': {
    slug: 'move-out-cleaning-checklist-denver-renters',
    title: 'Move-Out Cleaning Checklist for Denver Renters',
    category: 'Moving',
    date: 'September 8, 2026',
    readTime: '7 min read',
    excerpt:
      'Denver security deposits are rarely lost on the obvious things. They go on cabinet interiors, appliance seals and window tracks — the places an inspection checks and a normal clean skips.',
    intro:
      'Deposits are rarely lost on dirty floors. They are lost on the inside of the oven, the tracks under the sliding door, and the cabinet a tenant never opened. Colorado landlords have to return a deposit within 30 days of move-out — or 60 if the lease says so — and they must itemise deductions in writing. That itemisation is the document worth cleaning against. Here is what actually appears on it.',
    sections: [
      {
        heading: 'Start with the Kitchen, Because the Inspection Does',
        content: [
          'Inside the oven is the single most common deduction. Racks out, degreaser on the interior, and the door glass scraped at a low angle — baked-on residue on glass reads as neglect more than anything else in the unit.',
          'Then the refrigerator: empty it, pull the drawers and shelves, wash them in the sink and wipe the interior walls. Do not forget the door seals, where mould collects in the folds, and the coils or vent grille underneath. Finally, open every cabinet and drawer and wipe the interiors. Crumbs inside a drawer are cheap for you to fix and expensive when a landlord decides the kitchen needs professional attention.',
        ],
      },
      {
        heading: 'Bathrooms: Grout, Scale and the Exhaust Fan',
        content: [
          'Denver water is hard, and scale on fixtures is the tell that a bathroom was wiped rather than cleaned. Descale the shower head, taps and the base of every fixture with a limescale remover, not a general spray.',
          'Grout lines want a stiff brush, not a cloth. Then the two things nearly everyone misses: the exhaust fan cover, which visibly furs with dust, and the toilet base and the floor behind it, which is the first place an inspector with a torch looks.',
        ],
      },
      {
        heading: 'Windows, Tracks and Blinds',
        content: [
          'Window tracks fill with grit, and in Denver they fill fast. Vacuum the loose debris out first, then work a damp cloth or brush along the channel. A track full of dirt is a line item; a clean one takes ten minutes per window.',
          'Blinds get dusted slat by slat. If they are vinyl and heavily soiled, they can be wiped down in place with a damp microfibre cloth folded over each slat. Replacement blinds are a routine deduction and cost far more than the time it takes to clean them.',
        ],
      },
      {
        heading: 'Walls, Baseboards and Door Frames',
        content: [
          'Scuffs on walls are normal wear and generally are not deductible. Marks that come off with a damp cloth or a melamine sponge, though, are just dirt — and dirt is. Spot-clean them and the distinction stops mattering.',
          'Baseboards, door frames and light switch plates hold a grey film that is invisible until someone runs a finger along it. They take a wipe each and they are exactly the surfaces an inspection uses to judge whether the place was cleaned properly or quickly.',
        ],
      },
      {
        heading: 'Floors Last, and the Bits Furniture Was Hiding',
        content: [
          'Clean floors last, once everything is out and every other surface is done. The point of doing it last is the dust that falls while you clean everything else.',
          'An empty unit exposes what furniture was covering: the patch behind the sofa, under the bed, and inside closets. Vacuum closet floors and wipe closet shelving — an inspector opens every closet door, and an otherwise spotless apartment with a dusty closet floor looks rushed.',
        ],
      },
      {
        heading: 'What This Is Worth Paying Someone For',
        content: [
          'A full move-out clean of a typical Denver apartment is most of a day of real work, and it lands in the same week as packing, a truck, and a new address. Our move in/out service runs $100 above the deep-clean rate at every size — $300 for the smallest units, $480 for a 1,500–1,799 sq ft place, $570 for 2,100–2,399 sq ft.',
          'Against a deposit that is usually one month of Denver rent, the arithmetic is not close. And it is far easier to clean a unit properly once it is empty, which is the other argument for booking it after the movers rather than before.',
        ],
      },
    ],
    conclusion:
      'Whether you do it yourself or book it, clean against the inspection rather than against how the place looks. If you would rather hand it over, we do move-out cleans across Denver, Aurora, Englewood, Westminster and the rest of the metro — get an instant price for your unit size at raprocleaningservices.com.',
  },
  'post-construction-cleaning-denver-what-to-expect': {
    slug: 'post-construction-cleaning-denver-what-to-expect',
    title: 'Post-Construction Cleaning in Denver: What to Expect',
    category: 'Post-Construction',
    date: 'September 2, 2026',
    readTime: '6 min read',
    excerpt:
      'A builder’s final sweep is not a clean. Drywall dust is fine enough to sit in vents, tracks and cabinet interiors for months — and it comes back every time the furnace runs.',
    intro:
      'A contractor’s final sweep clears the debris you can see. What it leaves is drywall dust, which is fine enough to stay airborne for hours and settle into every vent, track and cabinet interior in the building. Homeowners across Arvada, Thornton and Littleton call us weeks after moving into a new build, puzzled that the place keeps getting dusty. It is not getting dusty. It was never finished.',
    sections: [
      {
        heading: 'Why Drywall Dust Is a Different Problem',
        content: [
          'Ordinary household dust is mostly fabric fibres and skin, and it settles where you can see it. Drywall dust is gypsum ground to a powder finer than flour. It stays suspended long after the work stops and settles into every horizontal surface and open cavity in the house.',
          'That means it is not sitting on the floor waiting to be swept. It is in the supply vents, on top of door frames, inside the window tracks, in the cabinet and drawer interiors, and on the tops of the upper cabinets nobody can see. Run the furnace for the first time and the system pushes what is in the ducts straight back into the rooms — which is why a new build seems to re-dust itself.',
        ],
      },
      {
        heading: 'What the Job Actually Covers',
        content: [
          'A post-construction clean works top down and starts with the dust that will fall later: light fixtures, fan blades, the tops of doors and frames, and vent covers. Vents come off and get cleaned rather than wiped around.',
          'Then the interiors — every cabinet, drawer and closet, and inside the appliances. Window tracks and sills get vacuumed and then wet-cleaned. Paint overspray, adhesive residue and grout haze come off glass, tile and fixtures. Floors are done last and usually more than once, because the first pass lifts dust that then resettles.',
        ],
      },
      {
        heading: 'Why We Will Not Quote It Instantly',
        content: [
          'Every other service we offer has a published price by square footage. Post-construction does not, and the reason is honest rather than commercial: square footage does not predict the work.',
          'Two 2,500 square foot jobs can differ by many hours depending on how much overspray the painters left, whether the tile was sealed before the haze was removed, and how much debris is still on site. Pricing that instantly would mean padding every quote to cover the worst case, or under-quoting and coming back to renegotiate. We would rather hear the scope and give you a real number.',
        ],
      },
      {
        heading: 'Book It Before the Furniture, Not After',
        content: [
          'The single biggest factor in how well this goes is timing. An empty house can be cleaned completely — every wall, every cabinet interior, the full floor area, the backs of closets.',
          'Once furniture is in, perhaps a third of those surfaces are permanently out of reach, and the dust left behind them keeps circulating. If you are closing on a new build, the window between the builder handing over and the movers arriving is worth protecting even by a single day.',
        ],
      },
      {
        heading: 'Remodels Need It Too',
        content: [
          'This is not only a new-construction service. A kitchen or bathroom remodel in an occupied home produces the same dust with nowhere to escape to — it travels through the whole house, not just the room with the plastic sheeting over the door.',
          'For remodels we generally clean the work area and the rooms adjoining it, plus the return vents that have been pulling dust through the system for the duration of the job.',
        ],
      },
    ],
    conclusion:
      'If you are finishing a build or a remodel anywhere in the Denver metro — Arvada, Thornton, Littleton, Aurora or the city itself — tell us the scope and we will quote the real job rather than a number picked off a square-footage table. Call (720) 677-8799 or send the details through raprocleaningservices.com.',
  },

  'how-to-deep-clean-your-kitchen': {
    slug: 'how-to-deep-clean-your-kitchen',
    title: 'How to Deep Clean Your Kitchen Like a Professional',
    category: 'Cleaning Tips',
    date: 'March 10, 2026',
    readTime: '6 min read',
    excerpt:
      'Your kitchen sees more action than any other room in your home. Learn the step-by-step professional approach to getting it truly clean — from grease-caked oven interiors to forgotten cabinet hinges.',
    intro:
      'Your kitchen is the most-used room in your home — and the hardest to truly clean. Grease accumulates on cabinets, residue builds up inside your oven, and bacteria hides in corners you never think about. A professional deep clean goes far beyond wiping the counter. Here\'s how the pros approach it.',
    sections: [
      {
        heading: 'Start with the Oven',
        content: [
          'The oven is usually the most neglected appliance in any kitchen. Remove all racks and soak them in hot, soapy water. Apply a baking soda paste to the interior walls and let it sit for at least 30 minutes. Scrub with a stiff brush and wipe clean.',
          'For the door glass, use a razor scraper at a low angle to remove baked-on residue, then wipe with a glass cleaner for a streak-free finish. Clean the stovetop burners and grates separately — soaking them in dish soap cuts through grease effectively.',
        ],
      },
      {
        heading: 'Degrease the Cabinets',
        content: [
          'Kitchen cabinet surfaces accumulate a sticky layer of grease and dust over time. Use a degreasing cleaner applied to a microfiber cloth. Work top to bottom and don\'t forget the handles, which get touched dozens of times daily.',
          'For stubborn buildup, a paste of baking soda and dish soap works well. Rub it gently in circular motions and wipe clean with a damp cloth. Finish with a dry cloth to prevent streaking.',
        ],
      },
      {
        heading: 'Clean the Refrigerator Inside and Out',
        content: [
          'Empty the refrigerator section by section. Remove drawers and shelves and wash them in the sink with warm soapy water. Wipe interior walls with a solution of baking soda and water — it deodorizes as it cleans.',
          'For the exterior, wipe with a damp microfiber cloth. If you have a stainless steel fridge, use a stainless steel cleaner applied in the direction of the grain to avoid streaks.',
        ],
      },
      {
        heading: 'Tackle the Sink and Backsplash',
        content: [
          'Sinks accumulate mineral deposits, soap scum, and bacteria around the drain and faucet base. Use a non-abrasive scrub to clean the basin, and an old toothbrush for around the faucet and drain.',
          'For backsplash tiles, a tile-safe degreaser removes cooking residue. Pay attention to grout lines, which discolor quickly in a kitchen environment. A small stiff brush removes grout staining effectively.',
        ],
      },
      {
        heading: 'Finish with the Floor',
        content: [
          'Sweep first to remove loose debris, paying close attention to corners and under the toe kicks of cabinets. Then mop with a proper floor cleaner suited to your floor type.',
          'For tile, a steam mop penetrates grout and kills bacteria without harsh chemicals. For hardwood or laminate, use a barely-damp mop to avoid warping.',
        ],
      },
    ],
    conclusion:
      'A professional-level kitchen deep clean takes time — typically two to three hours for a standard kitchen. If you\'d rather spend that time on something else, R A Pro Cleaning Services is here to handle it for you. Our deep cleaning service covers every corner of your kitchen, and every other room in your home.',
  },
  'how-often-should-you-deep-clean': {
    slug: 'how-often-should-you-deep-clean',
    title: 'How Often Should You Deep Clean Your Home?',
    category: 'Home Care',
    date: 'February 22, 2026',
    readTime: '5 min read',
    excerpt:
      'Standard cleaning keeps your home looking good day-to-day. But deep cleaning is what keeps it truly healthy. Here\'s a professional guide to cleaning frequency based on your lifestyle.',
    intro:
      'Standard cleaning keeps your home presentable. Deep cleaning keeps it genuinely healthy. But how often is deep cleaning actually necessary? The answer depends on your household — but here are the professional guidelines used by experienced cleaners.',
    sections: [
      {
        heading: 'The Difference Between Standard and Deep Cleaning',
        content: [
          'Standard cleaning covers the surfaces you see and use every day: counters, sinks, floors, dusting. It\'s maintenance — essential, but not enough on its own.',
          'Deep cleaning goes further: inside appliances, behind furniture, inside cabinets, baseboards, ceiling fans, grout, and all the areas that accumulate grime over weeks and months. It\'s the reset that standard cleaning maintains.',
        ],
      },
      {
        heading: 'For Most Households: Every 3-6 Months',
        content: [
          'For a typical household with one or two adults, deep cleaning every three to six months is appropriate. This cadence keeps the home in excellent condition without over-cleaning.',
          'If you have children, pets, or high foot traffic through your home, lean toward every three months. The wear and tear accelerates and so should the deep cleaning schedule.',
        ],
      },
      {
        heading: 'Special Circumstances That Warrant Immediate Deep Cleaning',
        content: [
          'Certain events call for a deep clean regardless of your schedule. Moving into a new home, hosting guests, recovering from an illness, completing a renovation, and returning from extended travel are all good triggers.',
          'After a renovation especially — dust and debris settle in air vents, cabinets, and surfaces throughout the home. A professional post-renovation clean removes construction dust that can affect air quality.',
        ],
      },
      {
        heading: 'Room-by-Room Frequency Guide',
        content: [
          'Kitchen: every 1-3 months. The kitchen accumulates grease and bacteria faster than any other room.',
          'Bathrooms: monthly. Mold and mineral buildup accelerate in wet environments.',
          'Bedrooms: every 3-4 months. Dust mites in mattresses and under-bed areas are the main concern.',
          'Living areas: every 3-6 months. Baseboards, windows, and upholstery collect dust slowly but steadily.',
        ],
      },
    ],
    conclusion:
      'The best approach is a combination: maintain with regular standard cleaning and schedule professional deep cleans at appropriate intervals. R A Pro Cleaning Services offers both, tailored to your home and schedule. Contact us to set up a cleaning plan that works for you.',
  },
  'airbnb-cleaning-tips-5-star-rating': {
    slug: 'airbnb-cleaning-tips-5-star-rating',
    title: 'Airbnb Cleaning Tips to Maintain a 5-Star Rating',
    category: 'Host Tips',
    date: 'February 5, 2026',
    readTime: '7 min read',
    excerpt:
      'Your reviews depend on your cleanliness. Discover the professional turnover cleaning checklist used by top-rated hosts in Denver and how to apply it to your short-term rental.',
    intro:
      'In the short-term rental world, cleanliness is the single most important factor in your review score. Guests have high expectations — and one bad review about cleanliness can tank your ranking for months. Here\'s how top-rated Denver hosts keep their properties guest-ready.',
    sections: [
      {
        heading: 'Set a Time-Efficient Turnover System',
        content: [
          'The biggest challenge with Airbnb cleaning is time. Between checkout and check-in, you may have just a few hours. The solution is a systematic approach: same order, every time.',
          'Start with laundry running before you clean anything else. Strip beds and throw linens in immediately. While laundry runs, clean bathrooms, then kitchen, then living spaces, then bedrooms. By the time you\'re making beds, linens are ready.',
        ],
      },
      {
        heading: 'The Bathroom is Your Highest-Scrutiny Area',
        content: [
          'Guests check bathrooms carefully. Hair in the drain, soap scum on glass, or mineral deposits on faucets will earn an immediate complaint. Use a squeegee on shower glass after every clean and descale faucets regularly.',
          'Replace toilet paper with a full roll every turnover, even if the previous roll isn\'t empty. Fold the first sheet into a point — it signals to guests that the bathroom has been cleaned professionally.',
        ],
      },
      {
        heading: 'Hotel-Level Bed Making',
        content: [
          'The bed is the centerpiece of the guest experience. Fresh, wrinkle-free linens make an immediate impression. Use a quality mattress protector under your fitted sheet and iron or steam pillowcases and the top sheet fold-back.',
          'Arrange pillows consistently, and consider a folded throw blanket at the foot of the bed. These small touches communicate professional-level care to your guests.',
        ],
      },
      {
        heading: 'Don\'t Forget the Overlooked Areas',
        content: [
          'The areas guests notice when they\'re scrutinizing: light switches, door handles, TV remote control, fridge door handle, and cabinet knobs. These high-touch surfaces should be wiped with a disinfecting cloth every turnover.',
          'Also check: behind the toilet base, microwave interior, coffee maker (descale monthly), shower curtain/liner for mold spots, and the inside of the dishwasher.',
        ],
      },
      {
        heading: 'When to Hire a Professional Turnover Service',
        content: [
          'Managing your own turnovers is feasible for one property with light bookings. But when you have back-to-back bookings, multiple properties, or simply want consistency, a professional turnover service is worth the investment.',
          'Professional cleaners are faster, more thorough, and provide accountability. With R A Pro Cleaning Services, your Denver Airbnb will be consistently guest-ready with documented turnover checklists and damage reporting.',
        ],
      },
    ],
    conclusion:
      'Your Airbnb reputation is built one guest experience at a time, and cleanliness is the foundation of every good review. Whether you manage your own turnovers or use a professional service, the standards outlined here will help you consistently earn 5-star ratings. R A Pro Cleaning Services specializes in Airbnb turnover cleaning throughout the Denver metro area. Contact us to discuss a cleaning plan for your property.',
  },
}

export const BLOG_SLUGS = Object.keys(posts)

/** Listing order — the record's own insertion order, newest first. */
export const POST_LIST: BlogPost[] = Object.values(posts)

export function getPost(slug: string): BlogPost | undefined {
  return posts[slug]
}
