'use client'
import { useState, FormEvent } from 'react'
import { trackEvent, trackLead } from '@/lib/analytics'
import { getAttribution } from '@/lib/attribution'
import { HONEYPOT_FIELD } from '@/lib/spamCheck'
import { SQFT_OPTIONS } from '@/lib/pricing'

/** What the visitor picks under "Type of cleaning". */
const CLEANING_TYPES = [
  'Standard Cleaning',
  'Deep Cleaning',
  'Move In/Out Cleaning',
  'Airbnb Cleaning',
  'Office / Commercial Cleaning',
  'Post-Construction Cleaning',
  'Not sure yet',
]

/** Today in the visitor's own time zone, as YYYY-MM-DD for the date picker's minimum. */
const todayIso = () => {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

/**
 * The free-quote form: name, phone, email, home size, type of cleaning and the
 * day they would like. No price is shown anywhere on the site; the office calls
 * or texts back with the price. It posts to /api/contact like the longer contact
 * form, so the lead lands in HighLevel and the office inbox the same way.
 */

type Props = {
  /** Anchor id, so buttons elsewhere on the page can jump to it. */
  id?: string
  /** Wording on the form's heading. */
  heading?: string
  /** Names the form in analytics, e.g. "hero" or "quote_page". */
  placement?: string
  className?: string
}

const CheckIcon = () => (
  <svg className="w-4 h-4 text-[#00A896] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

const inputClass =
  'w-full rounded-lg border border-[#B2DFDB] bg-white px-4 py-3.5 text-base text-[#0F2240] placeholder-[#4A6583]/60 focus:outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/20 transition-colors'

export default function QuoteForm({
  id = 'quote',
  heading = 'Get Your Free Quote',
  placement = 'hero',
  className = '',
}: Props) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sqft, setSqft] = useState('')
  const [service, setService] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    // The hidden trap box: people never see it, bots fill in every field.
    const trap = e.currentTarget.elements.namedItem(HONEYPOT_FIELD)
    const trapValue = trap instanceof HTMLInputElement ? trap.value : ''
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          service,
          squareFootage: sqft,
          preferredDate,
          message: `Free quote form (${placement}) — call or text back with the price.`,
          source: 'quote-form',
          [HONEYPOT_FIELD]: trapValue,
          attribution: getAttribution(),
        }),
      })
      if (res.ok) {
        trackEvent('quote_form_submit', { form_placement: placement, service })
        trackLead('quote_form', { form_placement: placement, service })
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      id={id}
      className={`scroll-mt-28 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-left ${className}`}
    >
      {status === 'success' ? (
        <div className="py-8 text-center">
          <div className="w-16 h-16 rounded-xl bg-[#00A896] flex items-center justify-center mx-auto mb-5">
            <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-[#007A6C] mb-2">You&apos;re All Set!</h3>
          <p className="text-[#4A6583]">
            Thanks{fullName ? `, ${fullName.split(/\s+/)[0]}` : ''}! We&apos;ll call or text you shortly with
            your price and to confirm your date.
          </p>
          <p className="text-[#4A6583] text-sm mt-4">
            Need us sooner? Call{' '}
            <a href="tel:+17206778799" className="font-semibold text-[#00A896] hover:underline">
              (720) 677-8799
            </a>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Spam trap: hidden from people and screen readers, filled in by bots. */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
            <label>
              Leave this empty
              <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#0F2240] text-center mb-1">{heading}</h2>
          <p className="text-[#4A6583] text-sm text-center mb-2">We call or text you back with your price. No obligation.</p>

          <label className="block">
            <span className="sr-only">Full name</span>
            <input
              type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)}
              required autoComplete="name" placeholder="Full Name" className={inputClass}
            />
          </label>
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required autoComplete="email" placeholder="Email" className={inputClass}
            />
          </label>
          <label className="block">
            <span className="sr-only">Phone number</span>
            <input
              type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
              required autoComplete="tel" placeholder="Phone Number" className={inputClass}
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="sr-only">Home size</span>
              <select
                name="squareFootage" value={sqft} onChange={(e) => setSqft(e.target.value)}
                required className={`${inputClass} ${sqft ? '' : 'text-[#4A6583]/70'}`}
              >
                <option value="" disabled>Square Feet</option>
                {SQFT_OPTIONS.map((o) => (
                  <option key={o.label} value={o.label}>{o.label}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="sr-only">Type of cleaning</span>
              <select
                name="service" value={service} onChange={(e) => setService(e.target.value)}
                required className={`${inputClass} ${service ? '' : 'text-[#4A6583]/70'}`}
              >
                <option value="" disabled>Type of Cleaning</option>
                {CLEANING_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="block text-sm font-semibold text-[#0F2240] mb-1.5">Preferred cleaning day</span>
            <input
              type="date" name="preferredDate" value={preferredDate}
              // Set in the browser, not at build time, so the earliest pickable day is today.
              onFocus={(e) => { e.currentTarget.min = todayIso() }}
              onChange={(e) => setPreferredDate(e.target.value)} required className={inputClass}
            />
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-lg bg-[#00A896] hover:bg-[#007A6C] disabled:opacity-60 text-white font-bold text-lg py-4 shadow-md transition-colors"
          >
            {status === 'sending' ? 'Sending…' : 'Get My Free Quote'}
          </button>

          {status === 'error' && (
            <p className="text-sm text-red-600 text-center" role="alert">
              Something went wrong. Please try again or call (720) 677-8799.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#E6F7F5] pt-4 text-sm text-[#4A6583]">
            <span className="flex items-center gap-2"><CheckIcon />Fast call back</span>
            <span className="flex items-center gap-2"><CheckIcon />Free, no pressure</span>
            <span className="flex items-center gap-2"><CheckIcon />Licensed &amp; insured</span>
          </div>

          <p className="text-center text-sm font-semibold text-[#007A6C]">
            4.9★ on Google · Women-owned · Denver local
          </p>
        </form>
      )}
    </div>
  )
}
