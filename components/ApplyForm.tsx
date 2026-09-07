'use client'
import { useState, FormEvent } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { trackEvent } from '@/lib/analytics'

/**
 * The application form. Deliberately short — every extra field loses
 * applicants, and everything not asked here can be asked on the phone call.
 * Only a name and a phone number are required.
 */

const AVAILABILITY = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekends',
  'Full time',
  'Part time',
] as const

const EXPERIENCE = [
  'No experience — willing to learn',
  'Less than 1 year',
  '1–3 years',
  '3+ years',
] as const

const ENGLISH = ['Fluent', 'Conversational', 'Basic', 'None yet'] as const

interface FormState {
  fullName: string
  phone: string
  email: string
  area: string
  experience: string
  availability: string[]
  hasCar: boolean
  legalToWork: boolean
  englishLevel: string
  message: string
}

const EMPTY: FormState = {
  fullName: '',
  phone: '',
  email: '',
  area: '',
  experience: '',
  availability: [],
  hasCar: false,
  legalToWork: false,
  englishLevel: '',
  message: '',
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-[#D8E2EC] bg-white text-[#0F2240] placeholder-[#93A8BE] ' +
  'focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent transition-shadow'

const labelClass = 'block text-sm font-semibold text-[#0F2240] mb-2'

const ApplyForm = () => {
  const ref = useScrollAnimation(0.05)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const toggleAvailability = (slot: string) =>
    setForm((prev) => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter((s) => s !== slot)
        : [...prev.availability, slot],
    }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        trackEvent('job_application_submit', {
          experience: form.experience || 'Not given',
          has_transport: form.hasCar ? 'Yes' : 'No',
        })
        setStatus('success')
        setForm(EMPTY)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="bg-white rounded-3xl p-10 md:p-12 shadow-xl shadow-[#0F2240]/5 border border-[#E4EBF2] text-center"
        role="status"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#00A896]/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#00A896]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-[#0F2240] mb-3">Application received</h3>
        <p className="text-[#4A6583] leading-relaxed mb-8 max-w-md mx-auto">
          We&apos;ll call or text you within one business day to talk through the work, the pay and
          the hours. Nothing else is needed from you right now.
        </p>
        <a
          href="tel:+17206778799"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F2240] text-white font-semibold hover:bg-[#1a3355] transition-colors"
        >
          Or call us now — (720) 677-8799
        </a>
      </div>
    )
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="fade-in-up">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-[#0F2240]/5 border border-[#E4EBF2] space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Your name <span className="text-[#00A896]">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => set('fullName', e.target.value)}
              className={inputClass}
              placeholder="Maria Gonzalez"
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone <span className="text-[#00A896]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              className={inputClass}
              placeholder="(720) 555-0123"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-[#93A8BE] font-normal">(optional)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className={inputClass}
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label htmlFor="area" className={labelClass}>
              Where can you work?
            </label>
            <input
              id="area"
              name="area"
              type="text"
              value={form.area}
              onChange={(e) => set('area', e.target.value)}
              className={inputClass}
              placeholder="Denver, Aurora, Lakewood…"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="experience" className={labelClass}>
              Cleaning experience
            </label>
            <select
              id="experience"
              name="experience"
              value={form.experience}
              onChange={(e) => set('experience', e.target.value)}
              className={inputClass}
            >
              <option value="">Select…</option>
              {EXPERIENCE.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="englishLevel" className={labelClass}>
              English
            </label>
            <select
              id="englishLevel"
              name="englishLevel"
              value={form.englishLevel}
              onChange={(e) => set('englishLevel', e.target.value)}
              className={inputClass}
            >
              <option value="">Select…</option>
              {ENGLISH.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>When can you work?</legend>
          <div className="flex flex-wrap gap-2">
            {AVAILABILITY.map((slot) => {
              const active = form.availability.includes(slot)
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleAvailability(slot)}
                  aria-pressed={active}
                  className={
                    'px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ' +
                    (active
                      ? 'bg-[#00A896] border-[#00A896] text-white'
                      : 'bg-white border-[#D8E2EC] text-[#4A6583] hover:border-[#00A896]')
                  }
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.hasCar}
              onChange={(e) => set('hasCar', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-[#D8E2EC] text-[#00A896] focus:ring-[#00A896]"
            />
            <span className="text-[#4A6583]">
              I have my own car and a valid driver&apos;s license
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.legalToWork}
              onChange={(e) => set('legalToWork', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-[#D8E2EC] text-[#00A896] focus:ring-[#00A896]"
            />
            <span className="text-[#4A6583]">
              I am legally able to work in the United States
            </span>
          </label>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Anything else we should know?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            className={inputClass}
            placeholder="Previous jobs, how many hours a week you want, anything you'd rather we knew up front."
          />
        </div>

        {status === 'error' && (
          <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            Something went wrong sending your application. Please call or text us on{' '}
            <a href="tel:+17206778799" className="font-semibold underline">(720) 677-8799</a>.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-4 rounded-xl bg-[#00A896] text-white font-bold text-lg hover:bg-[#008f80] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'sending' ? 'Sending…' : 'Apply now'}
        </button>

        <p className="text-xs text-[#93A8BE] text-center leading-relaxed">
          Takes about a minute. We&apos;ll call or text you within one business day.
          Prefer to talk first? Call{' '}
          <a href="tel:+17206778799" className="font-semibold text-[#4A6583]">(720) 677-8799</a>.
        </p>
      </form>
    </div>
  )
}

export default ApplyForm
