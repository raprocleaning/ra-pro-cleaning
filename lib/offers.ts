/**
 * The new-client offer, for a first cleaning booked by phone or online. The
 * online total stays the list price; the office takes the discount off when it
 * confirms a new client, so nothing here touches lib/pricing.ts. Change or remove
 * it here and every place that mentions it follows.
 */
export const NEW_CLIENT_CALL_OFFER = {
  percent: 15,
  phoneDisplay: '(720) 677-8799',
  phoneHref: 'tel:+17206778799',
  hours: '9 AM–5 PM',
}
