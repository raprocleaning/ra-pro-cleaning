/**
 * Single source of truth for all RA Pro Cleaning pricing.
 *
 * Every booking surface (booking form, AI chat widget, pricing table) reads
 * from this file so a price can never drift between them.
 */

export type Tier = { max: number; price: number }

// ─── PRICE TIERS BY SQUARE FOOTAGE ───────────────────────────────────────────
export const BASE_TIERS: Tier[] = [
  { max: 999,      price: 200 },
  { max: 1249,     price: 250 },
  { max: 1499,     price: 330 },
  { max: 1799,     price: 380 },
  { max: 2099,     price: 460 },
  { max: 2399,     price: 470 },
  { max: 2699,     price: 490 },
  { max: 2999,     price: 540 },
  { max: 3299,     price: 570 },
  { max: 3599,     price: 600 },
  { max: 3899,     price: 640 },
  { max: 4199,     price: 690 },
  { max: 4499,     price: 720 },
  { max: 4799,     price: 760 },
  { max: 4999,     price: 800 },
  { max: Infinity, price: 830 },
]

// Move In/Out runs $100 above the standard tier at every size.
export const MOVE_TIERS: Tier[] = BASE_TIERS.map((t) => ({ ...t, price: t.price + 100 }))

export const SERVICES = [
  'Standard Cleaning',
  'Deep Cleaning',
  'Move In/Out Cleaning',
  'Airbnb Cleaning',
  'Post-Construction Cleaning',
] as const

export type Service = (typeof SERVICES)[number]

/**
 * Services quoted after a walkthrough rather than instantly.
 *
 * Post-construction work varies far too much with square footage alone —
 * debris volume, paint overspray and grout haze can swing two jobs of the same
 * size by many hours — so the site collects the details and we quote by phone
 * instead of committing to a number sight-unseen.
 */
export const QUOTE_ON_REQUEST: string[] = ['Post-Construction Cleaning']

export function isQuoteOnRequest(service: string): boolean {
  return QUOTE_ON_REQUEST.includes(service)
}

export const PRICING: Record<string, Tier[]> = {
  'Standard Cleaning':    BASE_TIERS,
  'Deep Cleaning':        BASE_TIERS,
  'Move In/Out Cleaning': MOVE_TIERS,
  'Airbnb Cleaning':      BASE_TIERS,
}

export const SERVICE_META: Record<string, { icon: string; desc: string; range: string }> = {
  'Standard Cleaning':          { icon: '🏠', desc: 'Regular maintenance clean',      range: '$200 – $830' },
  'Deep Cleaning':              { icon: '✨', desc: 'Top-to-bottom thorough clean',   range: '$200 – $830' },
  'Move In/Out Cleaning':       { icon: '📦', desc: 'Full clean for transitions',     range: '$300 – $930' },
  'Airbnb Cleaning':            { icon: '🛎️', desc: 'Fast turnovers, 5-star ready',   range: '$200 – $830' },
  'Post-Construction Cleaning': { icon: '🔨', desc: 'Debris, dust & deep scrub',      range: 'Custom quote' },
}

// ─── SQUARE FOOTAGE OPTIONS ──────────────────────────────────────────────────
// `value` is the sqft number used for the tier lookup — it must fall inside the
// bracket the label describes.
export const SQFT_OPTIONS: { label: string; value: number }[] = [
  { label: 'Under 1,000 sq ft',   value: 900 },
  { label: '1,000 – 1,249 sq ft', value: 1100 },
  { label: '1,250 – 1,499 sq ft', value: 1350 },
  { label: '1,500 – 1,799 sq ft', value: 1650 },
  { label: '1,800 – 2,099 sq ft', value: 1950 },
  { label: '2,100 – 2,399 sq ft', value: 2250 },
  { label: '2,400 – 2,699 sq ft', value: 2550 },
  { label: '2,700 – 2,999 sq ft', value: 2850 },
  { label: '3,000 – 3,299 sq ft', value: 3150 },
  { label: '3,300 – 3,599 sq ft', value: 3450 },
  { label: '3,600 – 3,899 sq ft', value: 3750 },
  { label: '3,900 – 4,199 sq ft', value: 4050 },
  { label: '4,200 – 4,499 sq ft', value: 4350 },
  { label: '4,500 – 4,799 sq ft', value: 4650 },
  { label: '4,800 – 4,999 sq ft', value: 4900 },
  { label: '5,000+ sq ft',        value: 5200 },
]

// ─── FREQUENCY DISCOUNTS ─────────────────────────────────────────────────────
export const FREQUENCIES: { label: string; discount: number; badge: string | null }[] = [
  { label: 'One-Time',      discount: 0,  badge: null },
  { label: 'Every 4 Weeks', discount: 30, badge: '30% OFF' },
  { label: 'Bi-Weekly',     discount: 30, badge: '30% OFF' },
  { label: 'Weekly',        discount: 40, badge: '40% OFF' },
]

// ─── ADD-ONS ─────────────────────────────────────────────────────────────────
export const EXTRAS: { label: string; price: number }[] = [
  { label: 'Inside Cabinets',                  price: 80 },
  { label: 'Baseboards',                       price: 40 },
  { label: 'Interior Windows (Up To 10)',      price: 50 },
  { label: 'Inside Oven',                      price: 60 },
  { label: 'Inside Fridge',                    price: 60 },
  { label: 'Pet Hair Removal',                 price: 50 },
  { label: 'Wall Spot Cleaning',               price: 50 },
  { label: 'Extra Heavy Dirt/Extra Scrubbing', price: 80 },
  { label: 'Window Tracks Cleaning',           price: 50 },
]

/** Minimum we will ever charge for a job, after any recurring discount. */
export const PRICE_FLOOR = 200

// ─── CALCULATION ─────────────────────────────────────────────────────────────

/** Base price for a service at a given square footage, before discounts/extras. */
export function getPrice(service: string, sqft: number): number | null {
  const table = PRICING[service]
  if (!table) return null
  const tier = table.find((t) => sqft <= t.max)
  return tier ? tier.price : null
}

export type Quote = {
  base: number
  discountPercent: number
  discountAmount: number
  extrasTotal: number
  total: number
}

/**
 * Full quote breakdown. The recurring discount applies to the base clean only —
 * add-ons are charged at list price, and the discounted base never drops below
 * PRICE_FLOOR.
 */
export function getQuote(opts: {
  service: string
  sqft: number
  frequency?: string
  extras?: string[]
}): Quote | null {
  const base = getPrice(opts.service, opts.sqft)
  if (base === null) return null

  const freq = FREQUENCIES.find((f) => f.label === opts.frequency) ?? FREQUENCIES[0]
  const discountedBase = Math.max(PRICE_FLOOR, Math.round(base * (1 - freq.discount / 100)))
  const discountAmount = base - discountedBase

  const extrasTotal = (opts.extras ?? []).reduce((sum, label) => {
    const found = EXTRAS.find((e) => e.label === label)
    return sum + (found?.price ?? 0)
  }, 0)

  return {
    base,
    discountPercent: freq.discount,
    discountAmount,
    extrasTotal,
    total: discountedBase + extrasTotal,
  }
}

/** Parse a free-text square footage answer, e.g. "about 2,400 sq ft". */
export function sqftFromText(text: string): number | null {
  const num = parseInt(text.replace(/[^0-9]/g, ''), 10)
  return isNaN(num) || num < 100 || num > 20000 ? null : num
}
