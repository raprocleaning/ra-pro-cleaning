# R A Pro Cleaning Services: SEO & Booking Plan

_Prepared October 30, 2026. Covers raprocleaningservices.com (the Next.js site in this repo)._

## How this was checked (and what wasn't)

**Verified:** the site's source code, a local production build, and a crawl of all 36 public pages (titles, descriptions, headings, canonicals, structured data, internal links). I took phone-width screenshots (375px) of the homepage and a service page. Competitors come from live web searches.

**Not verified (no access):**
- The live domain. The cloud session's network policy blocks it, so I couldn't check the real server's www/https redirects, response headers or real-world speed. To fix that, allow `raprocleaningservices.com` in the environment's network settings.
- Google Search Console, GA4, Google Business Profile and Google Ads data.
- Search volumes. This plan contains **no made-up volumes or rankings**. Get real numbers from the Google Ads Keyword Planner and from Search Console → Performance.

---

## 1. Prioritized audit

### Already in good shape (verified)
- Every page has exactly one H1, its own canonical URL, and a unique title and description.
- No broken internal links on any of the 36 pages.
- `sitemap.xml` is generated from the page data, and `robots.txt` blocks only `/admin/`.
- Old WordPress URLs 301-redirect to matching pages (`next.config.js`).
- Ten city pages with their own neighborhoods, ZIP codes and FAQs. These are **not** copy-and-swap city pages.
- Images use `next/image` (auto-resized, lazy-loaded) and every image has alt text.
- Phone and text buttons switch by time of day (Call from 9–5 Denver time, Text/Book after hours).

### Problems found, by business impact

| # | Problem | Why it matters | Status |
|---|---|---|---|
| 1 | Service pages (the pages that earn money) had a bare H1 like "Deep Cleaning", with no city and no FAQs (except Office), and no Service schema | Google couldn't tell these pages are about *Denver* service. They were also thin (~320 words including menus). | **Fixed** |
| 2 | On phones, the service-page quote box appeared **below all the content** | Phone visitors had to scroll past the whole page (or find the floating button) to act | **Fixed**: Call/Book buttons in the hero |
| 3 | On phones, the header showed only the logo and menu, with no Call or Book | Most local cleaning searches are on phones | **Fixed** |
| 4 | Three pages chase "house cleaning Denver": homepage, `/areas/denver`, `/services/house-cleaning` | The pages compete with each other | **Partly fixed**: house-cleaning now targets "professional house cleaners". Check Search Console (see §7). |
| 5 | "Standard Cleaning" is the business's label, but searchers type "recurring", "weekly", "biweekly" or "maid service" | The page missed how people actually search | **Fixed**: now "Recurring Cleaning" (URL kept, so nothing breaks) |
| 6 | Business schema used generic `LocalBusiness` with a hand-typed `aggregateRating` (48 reviews) | Google doesn't show stars for a business rating itself, and a typed count goes stale (a policy risk) | **Fixed**: `HousekeepingService` with a shared `@id`, no self-rating |
| 7 | `public/landing.html` (ad page) was indexable, with no canonical | A near-copy of the homepage competing with it | **Fixed**: `noindex` + canonical to the homepage. Ads still work. |
| 8 | Blog titles ran 75–91 characters, and descriptions were cut mid-word | Google cut them off in results | **Fixed**: shorter suffix, word-boundary cuts, BlogPosting schema |
| 9 | Homepage hero photo (the biggest thing on screen) was found late, while two below-the-fold photos were preloaded ahead of it | Slower Largest Contentful Paint | **Fixed**: hero preloaded, the other two lazy-load |
| 10 | A **second copy of the business site** exists at `r-a-pro-cleaning-services-llc.myaifrontdesk.com` (it shows in search) | Duplicate content and split signals, possibly different facts | **Owner action**: noindex it, or have it redirect to the main site |
| 11 | Kitchen, Bathroom and Bedroom pages are thin and overlap Deep Cleaning | They spread effort across weak pages | **Later**: if Search Console shows little traffic, merge them into Deep Cleaning with 301s |
| 12 | Generic H1s: "Our Services", "Gallery" | Missed relevance | **Fixed** |
| 13 | Desktop menu didn't link to Service Areas | City pages got fewer internal links | **Fixed** |

### Facts the owner needs to confirm (I didn't change these, and they're on the site now)
1. **"Licensed & Insured"** appears in several places. Keep it only if you have the insurance policy and any required license on file.
2. **"48 five-star Google reviews"** is typed by hand in `components/Hero.tsx`, `app/page.tsx` and the CTA band. Update it whenever the real count changes.
3. **Deep cleaning vs. add-ons:** the Deep Cleaning page says *inside oven* and *all baseboards* are included, but the booking form charges *Inside Oven ($60)* and *Baseboards ($40)* as extras. Decide which is true and make both match, or customers will dispute charges.
4. **Facebook link:** the footer uses a `facebook.com/share/...` link, while the schema uses `facebook.com/raprocleaningservice`. Use the real page URL in both.

---

## 2. Keyword strategy & keyword map

One main search intent per page, so pages don't compete. Volumes are deliberately left out; check them in Keyword Planner.

| Page | Main target | Supporting terms |
|---|---|---|
| `/` Homepage | cleaning services Denver; cleaning company Denver CO | Denver metro house cleaning, brand name |
| `/services/house-cleaning` | professional house cleaners Denver | house cleaning service Denver, one-time house cleaning |
| `/services/standard-cleaning` | recurring maid service Denver | weekly / biweekly house cleaning Denver, maid service Denver |
| `/services/deep-cleaning` | deep cleaning services Denver | deep house cleaning, spring cleaning Denver |
| `/services/move-in-out` | move out cleaning Denver | move in cleaning, apartment move-out cleaning, end of lease cleaning |
| `/services/airbnb-cleaning` | Airbnb cleaning Denver | short-term rental cleaning, vacation rental turnover cleaning |
| `/services/office-cleaning` | office cleaning Denver | commercial cleaning Denver/Aurora, after-hours office cleaning |
| `/services/post-construction` | post construction cleaning Denver | post-renovation cleaning, construction cleanup |
| `/areas/denver` | house cleaning Denver CO | Denver neighborhoods (Cherry Creek, Wash Park, Highlands…) |
| `/areas/{city}` (9 more) | house cleaning {city} CO | cleaning services {city}, maid service {city} |
| `/blog/how-much-does-house-cleaning-cost-in-denver` | house cleaning prices Denver | cost of deep cleaning, cleaning rates Denver |
| `/blog/move-out-cleaning-checklist-denver-renters` | move out cleaning checklist | security deposit cleaning |

**City pages:** the 10 existing ones (Denver, Aurora, Lakewood, Englewood, Littleton, Centennial, Greenwood Village, Arvada, Westminster, Thornton) match the stated service area. **Don't add more** until real bookings come from a new city. Then write that page from real jobs there, never by swapping the city name. Likely next candidates if you already serve them: Highlands Ranch, Parker, Wheat Ridge, Broomfield.

**Avoid:** adding "near me" to page text, repeating city names in every sentence, or making one page per ZIP code.

---

## 3. Site structure

```
/                         Homepage → services, areas, reviews, quote
├── /services             Hub: all services
│   ├── /house-cleaning   ┐
│   ├── /standard-cleaning│ (shown as "Recurring Cleaning")
│   ├── /deep-cleaning    │ Each: hero CTA → what's included → FAQs
│   ├── /move-in-out      │ → related services → all 10 city links
│   ├── /airbnb-cleaning  │ → closing CTA
│   ├── /office-cleaning  │
│   └── /post-construction┘
│   └── /kitchen-, /bathroom-, /bedroom-cleaning  (review for merging)
├── /areas                Hub: 10 cities
│   └── /{city}           Each links to all core services + nearby cities
├── /book                 Instant price + booking (the main conversion page)
├── /contact  /about  /gallery  /blog/*
```

Every service page now links to every city page, and city pages link back to services, so link value flows both ways.

---

## 4. New page titles & H1s (live in code)

| URL | Title | H1 |
|---|---|---|
| `/` | R A Pro Cleaning Services \| Denver Metro House Cleaning | House Cleaning Services in the Denver Metro |
| `/services` | Cleaning Services in Denver, CO \| R A Pro Cleaning Services | Cleaning Services in Denver |
| `/services/house-cleaning` | Professional House Cleaners in Denver \| R A Pro Cleaning | Professional House Cleaning in Denver |
| `/services/standard-cleaning` | Recurring Maid Service in Denver \| Weekly & Biweekly Cleaning | Recurring House Cleaning & Maid Service in Denver |
| `/services/deep-cleaning` | Deep Cleaning Services in Denver, CO \| R A Pro Cleaning | Deep Cleaning Services in Denver, CO |
| `/services/move-in-out` | Move-Out Cleaning in Denver, CO \| Move-In Cleaning Too | Move-In & Move-Out Cleaning in Denver, CO |
| `/services/airbnb-cleaning` | Airbnb Cleaning in Denver \| Short-Term Rental Turnovers | Airbnb & Short-Term Rental Cleaning in Denver |
| `/services/office-cleaning` | (kept) Office Cleaning Service in Denver & Aurora \| R A Pro Cleaning | Office Cleaning Services in Denver & Aurora |
| `/services/post-construction` | Post-Construction Cleaning in Denver, CO \| R A Pro Cleaning | Post-Construction Cleaning in Denver, CO |
| `/gallery` | (kept) | Cleaning Photo Gallery |

Every core service page now has four FAQs. Prices in the answers are **read from `lib/pricing.ts`**, so they can never fall out of date. Every claim comes from facts already on the site: square-foot pricing from $200 (move-in/out from $300), 30% off biweekly/every-4-weeks, 40% off weekly, 24-hour cancellation, pet- and eco-friendly products on request, Airbnb inspection and damage reporting, and post-construction quoted after details. No reviews, guarantees, certifications or background-check claims were added.

---

## 5. Technical changes (exact files)

| File | Change |
|---|---|
| `app/services/[slug]/page.tsx` | Per-service H1, title, description, FAQs (+ FAQPage schema), Service schema, hero Call/Book buttons, city links, closing CTA |
| `app/layout.tsx` | `HousekeepingService` type, `@id …/#business`, removed self-rating, description ≤155 characters |
| `app/areas/[slug]/page.tsx` | Service `provider` now points to the same business `@id` |
| `app/blog/[slug]/page.tsx` | Shorter titles, word-boundary descriptions, BlogPosting + Breadcrumb schema |
| `components/Navigation.tsx` | Mobile Call/Text + Book buttons; "Recurring Cleaning"; Service Areas in desktop menu |
| `components/Hero.tsx`, `app/page.tsx` | Clearer H1; hero image preload |
| `components/BeforeAfter.tsx` | Below-the-fold photos no longer preload |
| `public/landing.html` | `noindex, follow` + canonical |
| `app/services/page.tsx`, `ServicesGrid.tsx`, `Footer.tsx`, `app/gallery/page.tsx` | Titles, H1s, "Recurring Cleaning" label |

**No URLs changed**, so no new redirects were needed.

**Next technical steps:**
1. After deploying, test 3 service pages in Google's [Rich Results Test](https://search.google.com/test/rich-results), then request indexing in Search Console.
2. Run PageSpeed Insights on `/`, `/book` and `/services/move-in-out` (phone). The GoHighLevel chat widget and the second floating assistant are the likely remaining speed costs. Consider loading the chat only after the visitor scrolls or interacts.
3. Check that `http://` and `www.` both 301-redirect to `https://raprocleaningservices.com` (I couldn't test this from here).
4. `lint` has 2 errors that were already there in `components/MoneyDashboard.tsx` (admin only, not SEO). Fix them separately.

---

## 6. Google Business Profile & local visibility

The map pack (top 3 map results) usually brings a local cleaner more calls than the website itself. Rankings there depend on **relevance, distance and prominence**. Nobody can guarantee a position.

**Profile setup**
- Primary category: **House cleaning service**. Secondary: *Commercial cleaning service*, *Janitorial service* (only if you do ongoing janitorial work), *Carpet cleaning service* (only if offered; the gallery shows carpet work).
- Set it up as a **service-area business** (hide the address) and list the 10 cities.
- Add each service with a short description that matches the website wording.
- Website link: the homepage with a UTM tag, `?utm_source=google&utm_medium=organic&utm_campaign=gbp`, so GA4 shows Maps traffic separately.
- Hours: match the site (9 AM–5 PM daily) and keep holiday hours updated.
- Photos: upload real job photos every week (the 30 gallery photos are a good start). No stock photos.
- Posts: 1–2 a week (seasonal deep clean, move-out season, the $50 new-client offer).
- Q&A and messaging: answer within a day.

**NAP consistency** (Name, Address/area, Phone) must match exactly everywhere:
`R A Pro Cleaning Services LLC · Denver, CO · (720) 677-8799 · raprocleaningservices.com`

**Reviews (Google-compliant)**
- Ask **every** customer, right after a finished job, with a short text plus the direct review link from your profile.
- **Don't**: offer discounts for reviews, ask only happy customers ("review gating"), or write or buy reviews. All of these break Google's rules.
- Reply to every review. Mention the service and city naturally ("Thanks for having us for your Aurora move-out clean").
- Update the "48 reviews" text on the site whenever the count changes.

**Citations** (listings with the same NAP): Bing Places, Apple Business Connect, Yelp, Facebook, Nextdoor, BBB, Angi, Thumbtack, HomeAdvisor, Denver Metro Chamber of Commerce (if a member).

**Local backlinks that bring real customers**
- Property managers and realtors in Denver and Aurora (move-out cleans). Ask to be on their vendor list.
- Airbnb host groups and Denver short-term rental meetups.
- Local sponsorships (school or youth sports) that link back.
- Contractors and remodelers (post-construction referrals).

**Search Console & GA4**
- GA4 is already installed (`G-50JSSQ15K6`). Mark `/book/confirmed`, form submits and phone-link clicks as **Key Events**.
- Verify the domain in Search Console (DNS) and submit `https://raprocleaningservices.com/sitemap.xml`.

---

## 7. Competitors (from live search, Oct 2026)

| Type | Who shows up | What they do well | Where R A Pro can win |
|---|---|---|---|
| National franchises | Merry Maids (South Denver), The Maids (Central/North & SW Denver), MaidPro Denver, The Cleaning Authority, CottageCare | One page per service per area, strong brands, satisfaction guarantees, background-check messaging | They're slow to quote. R A Pro shows the **exact price online instantly** and responds the same day. Lead with that. |
| Marketplaces | Handy, Tidy, TaskRabbit, Airtasker, Angi, HomeAdvisor, Thumbtack | Huge sites with many pages; "price before you book" | No consistent team. Stress the same local, owner-run crew (real reviews name the owner). |
| Template sites | Many `*.pages.dev` / `*.netlify.app` "Denver cleaning" sites | Volume of pages | Thin and often fake. Real photos, real reviews and a real GBP beat them. |

**Pricing note (not SEO, but affects bookings):** Airbnb turnover sites advertise roughly **$85–$159** for small units (self-reported, unverified). R A Pro's Airbnb pricing starts at $200. That may be fine for the quality level, but it's worth knowing when hosts compare.

**Practical ways to beat competitors**
1. A "Price in 60 seconds" message on every service page (done through the hero CTA).
2. Real before/after photos on each service page (move-out, post-construction), not only in the gallery.
3. More reviews mentioning the service and city. Reviews are the biggest map-pack factor you control.
4. Only offer a satisfaction guarantee if you will actually provide one. Franchises use it heavily.

---

## 8. 30 / 60 / 90-day plan

**Days 1–30**
- Merge and deploy this branch. Test structured data. Request indexing for the 7 service pages.
- Fix the deep-clean vs. add-on contradiction, confirm the insurance wording, update the review count.
- Noindex or redirect the `myaifrontdesk.com` copy of the site.
- Finish the GBP profile (categories, services, service area, UTM link), plus weekly photos and posts.
- Start the review-request text after every job.
- Set up Search Console, and set GA4 Key Events (bookings, form submits, calls).

**Days 31–60**
- In Search Console, look at "house cleaning denver" queries. If Google switches between the homepage, `/areas/denver` and `/services/house-cleaning`, strengthen the one that ranks best and link the others to it.
- Add a real before/after photo block to the Move-Out, Deep Cleaning and Post-Construction pages.
- Build 10–15 citations. Reach out to 10 property managers or realtors and 5 contractors.
- Write 2 blog posts that answer pre-booking questions (e.g., "Move-out cleaning for Denver security deposits", "Airbnb turnover checklist for Denver hosts"), each linking to its service page.

**Days 61–90**
- Check the Kitchen, Bathroom and Bedroom pages. If they get almost no impressions, merge them into Deep Cleaning with 301 redirects.
- Add a new city page only if real bookings now come from a city not covered.
- Run PageSpeed again and defer the chat widgets if they still slow the phone experience.
- Review the numbers below and shift effort toward the services that actually book.

---

## 9. Measuring results (focus on paying customers, not just traffic)

| What | Where | Look at monthly |
|---|---|---|
| Impressions & clicks for target terms | Search Console → Performance (filter queries containing "denver", "aurora", "move out", "deep clean"…) | Trend per service page |
| Average position for each main target | Search Console | Movement, not one-day ranks |
| Map views, calls, website clicks, direction requests | GBP → Performance | Calls from Maps |
| Organic & GBP sessions → bookings | GA4 (source = google / organic, and the `gbp` campaign) | Booking conversion rate |
| Leads by landing page | The lead emails already record "Landed on" and the source | Which pages produce leads |
| **Completed, paid jobs by source** | Your job records / Money dashboard | Revenue from organic + Maps |

The number that matters most: **completed bookings from Google (organic + Maps) per month, and revenue from them.**
