'use client'
import { useState, useMemo } from 'react'
import {
  SERVICES, SERVICE_META, SQFT_OPTIONS, FREQUENCIES, EXTRAS, getQuote, isQuoteOnRequest,
} from '@/lib/pricing'
import { trackEvent, trackLead } from '@/lib/analytics'

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
]

/** Tomorrow, as YYYY-MM-DD — the earliest date a customer may book. */
function minDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

type Status = 'idle' | 'submitting' | 'done' | 'error'

export default function BookingForm() {
  const [service, setService]     = useState<string>('')
  const [sqft, setSqft]           = useState<number | null>(null)
  const [frequency, setFrequency] = useState<string>('One-Time')
  const [extras, setExtras]       = useState<string[]>([])

  const [date, setDate]   = useState('')
  const [time, setTime]   = useState('')

  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [email, setEmail]     = useState('')
  const [address, setAddress] = useState('')
  const [zip, setZip]         = useState('')
  const [notes, setNotes]     = useState('')
  const [smsOptIn, setSmsOptIn] = useState(false)

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState('')

  const quoteOnRequest = isQuoteOnRequest(service)

  const quote = useMemo(
    () => (service && sqft && !isQuoteOnRequest(service)
      ? getQuote({ service, sqft, frequency, extras })
      : null),
    [service, sqft, frequency, extras]
  )

  const sqftLabel = SQFT_OPTIONS.find((o) => o.value === sqft)?.label ?? ''

  const toggleExtra = (label: string) =>
    setExtras((prev) =>
      prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label]
    )

  const detailsDone =
    name.trim().length > 1 && phone.trim().length >= 10 && email.includes('@')

  const canSubmit =
    !!service && !!sqft && !!date && !!time &&
    (quoteOnRequest || !!quote) &&
    detailsDone &&
    status !== 'submitting'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setStatus('submitting')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'booking-form',
          fullName: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          zipCode: zip.trim(),
          address: address.trim(),
          service,
          sqft: sqftLabel,
          frequency,
          price: quote?.total ?? null,
          quoteOnRequest,
          extras,
          preferredDate: `${date} at ${time}`,
          bookingDate: date,
          bookingTime: time,
          message: notes.trim(),
          smsOptIn,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.')

      trackEvent('booking_submitted', { service, sqft: sqftLabel, value: quote?.total })
      trackLead('booking-form', { service, value: quote?.total })
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  // ── SUCCESS ───────────────────────────────────────────────────────────────
  if (status === 'done') {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#E6F7F5] flex items-center justify-center mx-auto mb-7">
          <svg className="w-10 h-10 text-[#00A896]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-[#0F2240] tracking-tight mb-4">
          {quoteOnRequest ? 'Request received!' : 'You’re booked!'}
        </h2>
        <p className="text-[#4A6583] leading-relaxed mb-9">
          Thanks {name.split(' ')[0]} — we’ve got your{' '}
          <strong className="text-[#0F2240]">{service}</strong> for{' '}
          <strong className="text-[#0F2240]">{date} at {time}</strong>.
          <br />
          {quoteOnRequest
            ? 'We’ll call you within 24 hours with your quote and to confirm the time.'
            : 'We’ll call you within 24 hours to confirm the details.'}
        </p>

        <div className="bg-white border-2 border-[#B2DFDB] rounded-2xl p-7 mb-9 shadow-sm">
          {quote ? (
            <>
              <p className="text-[#4A6583] text-xs font-semibold uppercase tracking-[0.15em] mb-2">
                Your quoted total
              </p>
              <p className="text-[#00A896] font-black text-5xl tracking-tight">${quote.total}</p>
            </>
          ) : (
            <>
              <p className="text-[#4A6583] text-xs font-semibold uppercase tracking-[0.15em] mb-2">
                Your price
              </p>
              <p className="text-[#00A896] font-black text-2xl">We’ll quote you by phone</p>
              <p className="text-[#4A6583] text-sm mt-3 leading-relaxed">
                Post-construction jobs vary a lot, so we price yours after a quick look
                rather than guessing.
              </p>
            </>
          )}
          <p className="text-[#4A6583] text-sm mt-4 pt-4 border-t border-[#E6F7F5]">
            {quoteOnRequest ? sqftLabel : `${sqftLabel} · ${frequency}`}
          </p>
        </div>

        <p className="text-[#4A6583] text-sm">
          Questions? Call us at{' '}
          <a href="tel:7206778799" className="text-[#00A896] font-bold hover:underline">
            (720) 677-8799
          </a>
        </p>
      </div>
    )
  }

  // Frequency and add-ons only shape a price, so they are skipped for services
  // we quote by phone. Step numbers stay consecutive either way.
  let stepNo = 0
  const next = () => ++stepNo

  const priceLabel = quoteOnRequest ? 'Custom quote' : quote ? `$${quote.total}` : '—'

  // ── FORM ──────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-5 sm:px-6 pb-16">

      {/* Compact running total, mobile only — the sidebar is off-screen there */}
      <div className="lg:hidden sticky top-[72px] z-30 -mx-5 sm:-mx-6 mb-8">
        <div className="bg-[#0F2240] px-5 sm:px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="min-w-0">
            <p className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.15em]">
              Your total
            </p>
            <p className="text-white text-xs truncate">
              {service || 'Choose a service'}{sqftLabel && ` · ${sqftLabel}`}
            </p>
          </div>
          <p
            className={`font-black shrink-0 ml-4 ${
              quoteOnRequest
                ? 'text-base text-[#4ADEC8]'
                : quote
                  ? 'text-3xl text-[#4ADEC8]'
                  : 'text-base text-white/35'
            }`}
          >
            {quote || quoteOnRequest ? priceLabel : 'Not set yet'}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 xl:gap-12 items-start pt-4">

        {/* ── LEFT: the questions ── */}
        <div className="lg:col-span-3 space-y-12">

          {/* Service */}
          <Step n={next()} done={!!service} title="What kind of cleaning do you need?">
            <div className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map((s) => {
                const meta = SERVICE_META[s]
                const active = service === s
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setService(s)}
                    aria-pressed={active}
                    className={`relative text-left rounded-2xl p-5 border-2 transition-all duration-150 ${
                      active
                        ? 'border-[#00A896] bg-[#E6F7F5] shadow-md shadow-[#00A896]/10'
                        : 'border-[#E2EFEC] bg-white hover:border-[#00A896]/50 hover:shadow-sm'
                    }`}
                  >
                    {active && (
                      <span className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-[#00A896] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                    <div className="text-3xl mb-3 leading-none">{meta.icon}</div>
                    <p className="font-bold text-[#0F2240] leading-tight mb-1">{s}</p>
                    <p className="text-[#4A6583] text-xs leading-relaxed mb-3">{meta.desc}</p>
                    <p className="text-[#00A896] font-black text-sm">{meta.range}</p>
                  </button>
                )
              })}
            </div>
          </Step>

          {/* Square footage */}
          <Step n={next()} done={!!sqft} title="How big is your home?">
            <label htmlFor="sqft" className="sr-only">Home square footage</label>
            <div className="relative">
              <select
                id="sqft"
                value={sqft ?? ''}
                onChange={(e) => setSqft(e.target.value ? Number(e.target.value) : null)}
                className="w-full appearance-none border-2 border-[#E2EFEC] rounded-2xl px-5 py-4 pr-12 text-[#0F2240] font-semibold bg-white focus:border-[#00A896] focus:outline-none focus:ring-4 focus:ring-[#00A896]/10 transition"
              >
                <option value="">Select your square footage…</option>
                {SQFT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <svg className="w-5 h-5 text-[#4A6583] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <p className="text-[#4A6583] text-xs mt-2.5 pl-1">
              {quoteOnRequest
                ? 'This helps us prepare an accurate quote for you.'
                : 'Your price updates instantly as soon as you pick a size.'}
            </p>
          </Step>

          {/* Frequency */}
          {!quoteOnRequest && (
          <Step n={next()} done title="How often?">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FREQUENCIES.map((f) => {
                const active = frequency === f.label
                return (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => setFrequency(f.label)}
                    aria-pressed={active}
                    className={`rounded-2xl px-3 py-4 border-2 text-sm font-bold transition-all duration-150 ${
                      active
                        ? 'border-[#00A896] bg-[#E6F7F5] text-[#0F2240] shadow-md shadow-[#00A896]/10'
                        : 'border-[#E2EFEC] bg-white text-[#4A6583] hover:border-[#00A896]/50'
                    }`}
                  >
                    {f.label}
                    {f.badge && (
                      <span className={`block text-[11px] font-black mt-1.5 ${active ? 'text-[#00A896]' : 'text-[#00A896]/70'}`}>
                        {f.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </Step>
          )}

          {/* Extras */}
          {!quoteOnRequest && (
          <Step n={next()} done title="Any add-ons?" optional>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {EXTRAS.map((x) => {
                const active = extras.includes(x.label)
                return (
                  <button
                    key={x.label}
                    type="button"
                    onClick={() => toggleExtra(x.label)}
                    aria-pressed={active}
                    className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 border-2 text-sm transition-all duration-150 ${
                      active
                        ? 'border-[#00A896] bg-[#E6F7F5]'
                        : 'border-[#E2EFEC] bg-white hover:border-[#00A896]/50'
                    }`}
                  >
                    <span className="flex items-center gap-3 text-left min-w-0">
                      <span
                        className={`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors ${
                          active ? 'bg-[#00A896] border-[#00A896]' : 'border-[#CBDDD9]'
                        }`}
                      >
                        {active && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="font-semibold text-[#0F2240] leading-snug">{x.label}</span>
                    </span>
                    <span className="text-[#00A896] font-black shrink-0">+${x.price}</span>
                  </button>
                )
              })}
            </div>
          </Step>
          )}

          {/* Date & time */}
          <Step n={next()} done={!!date && !!time} title="When would you like us?">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-date" className="block text-[#4A6583] text-[11px] font-bold mb-2 uppercase tracking-[0.12em]">
                  Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  value={date}
                  min={minDate()}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border-2 border-[#E2EFEC] rounded-2xl px-5 py-3.5 text-[#0F2240] font-semibold bg-white focus:border-[#00A896] focus:outline-none focus:ring-4 focus:ring-[#00A896]/10 transition"
                />
              </div>
              <div>
                <label htmlFor="booking-time" className="block text-[#4A6583] text-[11px] font-bold mb-2 uppercase tracking-[0.12em]">
                  Arrival window
                </label>
                <select
                  id="booking-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border-2 border-[#E2EFEC] rounded-2xl px-5 py-3.5 text-[#0F2240] font-semibold bg-white focus:border-[#00A896] focus:outline-none focus:ring-4 focus:ring-[#00A896]/10 transition"
                >
                  <option value="">Select a time…</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </Step>

          {/* Details */}
          <Step n={next()} done={detailsDone} title="Where should we go, and who do we ask for?">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" value={name} onChange={setName} placeholder="Jane Smith" required />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="(720) 555-0123" type="tel" required />
              <Field label="Email" value={email} onChange={setEmail} placeholder="jane@email.com" type="email" required />
              <Field label="Zip code" value={zip} onChange={setZip} placeholder="80202" />
              <div className="sm:col-span-2">
                <Field label="Service address" value={address} onChange={setAddress} placeholder="1234 Main St, Denver, CO" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="booking-notes" className="block text-[#4A6583] text-[11px] font-bold mb-2 uppercase tracking-[0.12em]">
                  Anything we should know? <span className="font-medium normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Pets, parking, gate codes, areas to focus on…"
                  className="w-full border-2 border-[#E2EFEC] rounded-2xl px-5 py-3.5 text-[#0F2240] bg-white focus:border-[#00A896] focus:outline-none focus:ring-4 focus:ring-[#00A896]/10 transition resize-none"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 mt-5 cursor-pointer group">
              <input
                type="checkbox"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#00A896] shrink-0"
              />
              <span className="text-[#4A6583] text-xs leading-relaxed group-hover:text-[#0F2240] transition-colors">
                Text me appointment reminders and updates at the number above. Message &amp; data
                rates may apply. Reply STOP to opt out at any time.
              </span>
            </label>
          </Step>
        </div>

        {/* ── RIGHT: live price summary ── */}
        <aside className="lg:col-span-2 lg:sticky lg:top-28">
          <div className="bg-white border border-[#E2EFEC] rounded-3xl overflow-hidden shadow-xl shadow-[#0F2240]/5">
            <div className="bg-[#0F2240] px-7 py-5">
              <p className="text-white font-black text-lg tracking-tight">Your Quote</p>
              <p className="text-white/45 text-xs mt-0.5">Updates live as you choose</p>
            </div>

            <div className="px-7 py-6 space-y-3.5 text-sm">
              <Row label="Service" value={service || '—'} />
              <Row label="Home size" value={sqftLabel || '—'} />
              {!quoteOnRequest && <Row label="Frequency" value={frequency} />}
              <Row label="Date" value={date && time ? `${date} · ${time}` : '—'} />

              {quote && (
                <>
                  <div className="border-t border-[#EEF6F5] !mt-5 pt-4 space-y-3.5">
                    <Row label="Base clean" value={`$${quote.base}`} />
                    {quote.discountAmount > 0 && (
                      <Row
                        label={`${quote.discountPercent}% recurring discount`}
                        value={`−$${quote.discountAmount}`}
                        accent
                      />
                    )}
                    {extras.map((label) => {
                      const x = EXTRAS.find((e) => e.label === label)
                      return x ? <Row key={label} label={x.label} value={`+$${x.price}`} muted /> : null
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="bg-[#E6F7F5] px-7 py-6 border-t border-[#D3EDE9]">
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-[#0F2240] font-bold">Total</span>
                <span
                  className={`font-black text-right tracking-tight ${
                    quoteOnRequest
                      ? 'text-xl text-[#00A896]'
                      : quote
                        ? 'text-5xl text-[#00A896]'
                        : 'text-2xl text-[#9EC7C1]'
                  }`}
                >
                  {quote || quoteOnRequest ? priceLabel : 'Not set yet'}
                </span>
              </div>
              <p className="text-[#4A6583] text-xs leading-relaxed">
                {quoteOnRequest
                  ? 'Post-construction jobs vary too much to price online. Book a slot and we’ll call you with a quote.'
                  : quote
                    ? 'Flat rate. No hidden fees.'
                    : 'Pick a service and home size to see your price.'}
              </p>
            </div>

            <div className="px-7 py-6">
              {status === 'error' && (
                <p className="text-red-600 text-xs mb-3 leading-relaxed bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-[#00A896] hover:bg-[#007A6C] active:scale-[0.99] disabled:bg-[#CBE5E1] disabled:cursor-not-allowed disabled:active:scale-100 text-white font-bold py-4 rounded-2xl transition-all text-lg shadow-lg shadow-[#00A896]/20 disabled:shadow-none"
              >
                {status === 'submitting'
                  ? 'Booking…'
                  : quoteOnRequest ? 'Request My Quote' : 'Confirm Booking'}
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-[#4A6583] text-[11px]">
                <span className="flex items-center gap-1.5">🔒 No card required</span>
                <span className="flex items-center gap-1.5">📞 We call in 24h</span>
              </div>

              <p className="text-[#4A6583] text-xs text-center mt-4 pt-4 border-t border-[#EEF6F5]">
                Prefer to talk?{' '}
                <a href="tel:7206778799" className="text-[#00A896] font-bold hover:underline">
                  (720) 677-8799
                </a>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </form>
  )
}

// ─── SMALL PRESENTATIONAL HELPERS ────────────────────────────────────────────

function Step({
  n, title, optional, done, children,
}: { n: number; title: string; optional?: boolean; done?: boolean; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-start gap-3.5 mb-5">
        <span
          className={`w-8 h-8 shrink-0 rounded-full font-black text-sm flex items-center justify-center transition-colors ${
            done ? 'bg-[#00A896] text-white' : 'bg-[#E6F7F5] text-[#00A896] ring-2 ring-[#B2DFDB]'
          }`}
        >
          {done ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : n}
        </span>
        <h2 className="font-black text-[#0F2240] text-lg md:text-xl leading-snug tracking-tight pt-0.5">
          {title}
          {optional && (
            <span className="text-[#4A6583] font-medium text-sm ml-2 tracking-normal">(optional)</span>
          )}
        </h2>
      </div>
      <div className="sm:pl-[46px]">{children}</div>
    </section>
  )
}

function Field({
  label, value, onChange, placeholder, type = 'text', required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  const id = `field-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`
  return (
    <div>
      <label htmlFor={id} className="block text-[#4A6583] text-[11px] font-bold mb-2 uppercase tracking-[0.12em]">
        {label}{required && <span className="text-[#00A896]"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border-2 border-[#E2EFEC] rounded-2xl px-5 py-3.5 text-[#0F2240] bg-white placeholder:text-[#A9BFC9] focus:border-[#00A896] focus:outline-none focus:ring-4 focus:ring-[#00A896]/10 transition"
      />
    </div>
  )
}

function Row({
  label, value, accent, muted,
}: { label: string; value: string; accent?: boolean; muted?: boolean }) {
  return (
    <div className="flex justify-between gap-4 items-baseline">
      <span className={muted ? 'text-[#4A6583] text-xs' : 'text-[#4A6583]'}>{label}</span>
      <span
        className={`font-bold text-right shrink-0 ${
          accent ? 'text-[#00A896]' : muted ? 'text-[#4A6583] text-xs' : 'text-[#0F2240]'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
