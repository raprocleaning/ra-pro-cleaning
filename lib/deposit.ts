/**
 * The card deposit taken online when a booking is confirmed.
 *
 * Kept apart from lib/payments.ts, which pulls in the Stripe SDK: the booking
 * form needs these two to show "Pay $50 now" and must not bundle server code.
 */

/** Charged by card when the customer books. The balance is due after the clean. */
export const DEPOSIT_DOLLARS = 50

/** The deposit for a job — never more than the job itself costs. */
export function depositFor(total: number): number {
  return Math.min(DEPOSIT_DOLLARS, Math.max(0, Math.round(total)))
}

/** sessionStorage key holding the booking form while the customer is on Stripe's page. */
export const BOOKING_DRAFT_KEY = 'rapro_booking_draft'
