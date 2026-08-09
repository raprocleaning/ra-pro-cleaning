'use client'
import { useState, useMemo } from 'react'
import {
  SERVICES, SERVICE_META, SQFT_OPTIONS, FREQUENCIES, EXTRAS, getQuote,
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

  const quote = useMemo(
    () => (service && sqft ? getQuote({ service, sqft, frequency, extras }) : null),
    [service, sqft, frequency, extras]
  )

  const sqftLabel = SQFT_OPTIONS.find((o) => o.value === sqft)?.label ?? ''

  const toggleExtra = (label: string) =>
    setExtras((prev) =>
      prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label]
    )

  const canSubmit =
    !!service && !!sqft && !!date && !!time &&
    name.trim().length > 1 && phone.trim().length >= 10 && email.includes('@') &&
    status !== 'submitting'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || !quote) return

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
          price: quote.total,
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

      trackEvent('booking_submitted', { service, sqft: sqftLabel, value: quote.total })
      trackLead('booking-form', { service, value: quote.total })
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  // ── SUCCESS ───────────────────────────────────────────────────────────────
  if (status === 'done') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-black text-[#0F2240] mb-4">You&apos;re booked!</h2>
        <p className="text-[#4A6583] mb-8 leading-relaxed">
          Thanks {name.split(' ')[0]} — we&apos;ve got your request for a{' '}
          <strong className="text-[#0F2240]">{service}</strong> on{' '}
          <strong className="text-[#0F2240]">{date} at {time}</strong>.
          <br />
          We&apos;ll call you within 24 hours to confirm the details.
        </p>
        <div className="bg-[#E6F7F5] border border-[#B2DFDB] rounded-xl p-6 mb-8 inline-block">
          <p className="text-[#4A6583] text-sm mb-1">Your quoted total</p>
          <p className="text-[#00A896] font-black text-4xl">${quote?.total}</p>
          <p className="text-[#4A6583] text-xs mt-2">{sqftLabel} · {frequency}</p>
        </div>
        <p className="text-[#4A6583] text-sm">
          Questions? Call us at{' '}
          <a href="tel:7206778799" className="text-[#00A896] font-semibold">(720) 677-8799</a>
        </p>
      </div>
    )
  }

  // ── FORM ──────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-10 items-start">

        {/* ── LEFT: the questions ── */}
        <div className="lg:col-span-2 space-y-10">

          {/* 1 — Service */}
          <Step n={1} title="What kind of cleaning do you need?">
            <div className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map((s) => {
                const meta = SERVICE_META[s]
                const active = service === s
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setService(s)}
                    className={`text-left rounded-xl p-4 border-2 transition-all ${
                      active
                        ? 'border-[#00A896] bg-[#E6F7F5] shadow-md'
                        : 'border-[#B2DFDB] bg-white hover:border-[#00A896]'
                    }`}
                  >
                    <div className="text-2xl mb-2">{meta.icon}</div>
                    <p className="font-bold text-[#0F2240] text-sm leading-tight">{s}</p>
                    <p className="text-[#4A6583] text-xs mt-1">{meta.desc}</p>
                    <p className="text-[#00A896] font-black text-sm mt-2">{meta.range}</p>
                  </button>
                )
              })}
            </div>
          </Step>

          {/* 2 — Square footage */}
          <Step n={2} title="How big is your home?">
            <label htmlFor="sqft" className="sr-only">Home square footage</label>
            <select
              id="sqft"
              value={sqft ?? ''}
              onChange={(e) => setSqft(e.target.value ? Number(e.target.value) : null)}
              className="w-full border-2 border-[#B2DFDB] rounded-xl px-4 py-3.5 text-[#0F2240] font-semibold bg-white focus:border-[#00A896] focus:outline-none"
            >
              <option value="">Select your square footage…</option>
              {SQFT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <p className="text-[#4A6583] text-xs mt-2">
              Your price updates instantly as soon as you pick a size.
            </p>
          </Step>

          {/* 3 — Frequency */}
          <Step n={3} title="How often?">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FREQUENCIES.map((f) => {
                const active = frequency === f.label
                return (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => setFrequency(f.label)}
                    className={`relative rounded-xl px-3 py-4 border-2 text-sm font-bold transition-all ${
                      active
                        ? 'border-[#00A896] bg-[#E6F7F5] text-[#0F2240] shadow-md'
                        : 'border-[#B2DFDB] bg-white text-[#4A6583] hover:border-[#00A896]'
                    }`}
                  >
                    {f.label}
                    {f.badge && (
                      <span className="block text-[#00A896] text-[11px] font-black mt-1">
                        {f.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </Step>

          {/* 4 — Extras */}
          <Step n={4} title="Any add-ons?" optional>
            <div className="grid sm:grid-cols-2 gap-2">
              {EXTRAS.map((x) => {
                const active = extras.includes(x.label)
                return (
                  <button
                    key={x.label}
                    type="button"
                    onClick={() => toggleExtra(x.label)}
                    className={`flex items-center justify-between gap-3 rounded-lg px-4 py-3 border-2 text-sm transition-all ${
                      active
                        ? 'border-[#00A896] bg-[#E6F7F5]'
                        : 'border-[#B2DFDB] bg-white hover:border-[#00A896]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-left">
                      <span
                        className={`w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center ${
                          active ? 'bg-[#00A896] border-[#00A896]' : 'border-[#B2DFDB]'
                        }`}
                      >
                        {active && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="font-semibold text-[#0F2240]">{x.label}</span>
                    </span>
                    <span className="text-[#00A896] font-black shrink-0">+${x.price}</span>
                  </button>
                )
              })}
            </div>
          </Step>

          {/* 5 — Date & time */}
          <Step n={5} title="When would you like us?">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-date" className="block text-[#4A6583] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  value={date}
                  min={minDate()}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border-2 border-[#B2DFDB] rounded-xl px-4 py-3 text-[#0F2240] font-semibold bg-white focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="booking-time" className="block text-[#4A6583] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Arrival window
                </label>
                <select
                  id="booking-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border-2 border-[#B2DFDB] rounded-xl px-4 py-3 text-[#0F2240] font-semibold bg-white focus:border-[#00A896] focus:outline-none"
                >
                  <option value="">Select a time…</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </Step>

          {/* 6 — Details */}
          <Step n={6} title="Where should we go, and who do we ask for?">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" value={name} onChange={setName} placeholder="Jane Smith" required />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="(720) 555-0123" type="tel" required />
              <Field label="Email" value={email} onChange={setEmail} placeholder="jane@email.com" type="email" required />
              <Field label="Zip code" value={zip} onChange={setZip} placeholder="80202" />
              <div className="sm:col-span-2">
                <Field label="Service address" value={address} onChange={setAddress} placeholder="1234 Main St, Denver, CO" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="booking-notes" className="block text-[#4A6583] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Anything we should know? <span className="font-normal normal-case">(optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Pets, parking, gate codes, areas to focus on…"
                  className="w-full border-2 border-[#B2DFDB] rounded-xl px-4 py-3 text-[#0F2240] bg-white focus:border-[#00A896] focus:outline-none resize-none"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#00A896]"
              />
              <span className="text-[#4A6583] text-xs leading-relaxed">
                Text me appointment reminders and updates at the number above. Message &amp; data
                rates may apply. Reply STOP to opt out at any time.
              </span>
            </label>
          </Step>
        </div>

        {/* ── RIGHT: live price summary ── */}
        <aside className="lg:sticky lg:top-24">
          <div className="bg-white border-2 border-[#B2DFDB] rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-[#0F2240] px-6 py-4">
              <p className="text-white font-black text-lg">Your Quote</p>
              <p className="text-white/50 text-xs">Updates live as you choose</p>
            </div>

            <div className="p-6 space-y-3 text-sm">
              <Row label="Service" value={service || '—'} />
              <Row label="Home size" value={sqftLabel || '—'} />
              <Row label="Frequency" value={frequency} />

              {quote && (
                <>
                  <div className="border-t border-[#E6F7F5] pt-3" />
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
                </>
              )}
            </div>

            <div className="bg-[#E6F7F5] px-6 py-5 border-t-2 border-[#B2DFDB]">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[#0F2240] font-bold">Total</span>
                <span className="text-[#00A896] font-black text-4xl">
                  {quote ? `$${quote.total}` : '—'}
                </span>
              </div>
              <p className="text-[#4A6583] text-xs">
                {quote
                  ? 'Flat rate. No hidden fees.'
                  : 'Pick a service and home size to see your price.'}
              </p>
            </div>

            <div className="p-6 pt-5">
              {status === 'error' && (
                <p className="text-red-600 text-xs mb-3 leading-relaxed">{error}</p>
              )}
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-[#00A896] hover:bg-[#007A6C] disabled:bg-[#B2DFDB] disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors text-lg"
              >
                {status === 'submitting' ? 'Booking…' : 'Confirm Booking'}
              </button>
              <p className="text-[#4A6583] text-[11px] text-center mt-3 leading-relaxed">
                No card required. We call within 24 hours to confirm.
              </p>
              <p className="text-[#4A6583] text-xs text-center mt-3">
                Prefer to talk?{' '}
                <a href="tel:7206778799" className="text-[#00A896] font-semibold">(720) 677-8799</a>
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
  n, title, optional, children,
}: { n: number; title: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 shrink-0 rounded-full bg-[#00A896] text-white font-black text-sm flex items-center justify-center">
          {n}
        </span>
        <h2 className="font-black text-[#0F2240] text-lg leading-tight">
          {title}
          {optional && <span className="text-[#4A6583] font-normal text-sm ml-2">(optional)</span>}
        </h2>
      </div>
      {children}
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
      <label htmlFor={id} className="block text-[#4A6583] text-xs font-semibold mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-[#00A896]"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border-2 border-[#B2DFDB] rounded-xl px-4 py-3 text-[#0F2240] bg-white focus:border-[#00A896] focus:outline-none"
      />
    </div>
  )
}

function Row({
  label, value, accent, muted,
}: { label: string; value: string; accent?: boolean; muted?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
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
