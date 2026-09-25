'use client'
import { useContactMode } from '@/lib/useContactMode'

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const ChatIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.4-3.5A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

type Props = {
  /** Classes for the leading button — Call during the day, Book Now otherwise. */
  primaryClassName: string
  /** Classes for the Text button, which is offered at every hour. */
  secondaryClassName: string
  /** Wrapper classes for the row. */
  className?: string
  /** Wording on the booking button; the call button always shows the number. */
  bookLabel?: string
}

/**
 * The pair of calls to action, chosen by time of day (see lib/contactMode).
 *
 * Both variants are two buttons wide, so the row keeps its shape when the mode
 * flips. Until the browser has told us the hour the row renders invisible
 * rather than absent, which holds the layout without showing the wrong button.
 */
export default function ContactActions({
  primaryClassName,
  secondaryClassName,
  className = 'flex flex-col sm:flex-row gap-4 justify-center',
  bookLabel = 'Book Now',
}: Props) {
  const mode = useContactMode()

  return (
    <div className={`${className}${mode === null ? ' invisible' : ''}`}>
      {mode === 'phone' ? (
        <a href="tel:+17206778799" className={primaryClassName}>
          <PhoneIcon />
          (720) 677-8799
        </a>
      ) : (
        <a href="/book" className={primaryClassName}>
          {bookLabel}
          <ArrowIcon />
        </a>
      )}

      <a href="sms:+17206778799" className={secondaryClassName}>
        <ChatIcon />
        Text us
      </a>
    </div>
  )
}
