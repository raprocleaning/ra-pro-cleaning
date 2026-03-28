'use client'
import { useState, FormEvent } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface FormData {
  fullName: string
  phone: string
  email: string
  service: string
  zipCode: string
  squareFootage: string
  message: string
  smsOptIn: boolean
}

const ContactForm = () => {
  const ref = useScrollAnimation(0.05)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    zipCode: '',
    squareFootage: '',
    message: '',
    smsOptIn: false,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ fullName: '', phone: '', email: '', service: '', zipCode: '', squareFootage: '', message: '', smsOptIn: false })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-white"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="fade-in-up">
            <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
              Free Quote in 24 Hours
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F2240] tracking-tight mb-6">
              Get Your<br />
              <span className="text-[#00A896]">Free Quote</span>
            </h2>
            <p className="text-[#4A6583] leading-relaxed mb-10 text-lg">
              Tell us about your space and we&apos;ll send a personalized quote within 24 hours. No obligation, no pressure.
            </p>

            {/* Contact info */}
            <div className="space-y-5 mb-10">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  label: 'Phone / SMS',
                  value: '720-677-8799',
                  href: 'tel:7206778799',
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  label: 'Email',
                  value: 'ra@raprocleaningservices.com',
                  href: 'mailto:ra@raprocleaningservices.com',
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
                  label: 'Address',
                  value: '1325 S Colorado Blvd, Denver, CO 80222',
                  href: undefined,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#E6F7F5] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00A896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0F2240]">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[#4A6583] text-sm hover:text-[#00A896] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#4A6583] text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {['Licensed', 'Insured', 'Background-Checked', 'Denver Local'].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 bg-[#E6F7F5] text-[#007A6C] text-xs font-semibold px-3 py-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="fade-in-up">
            {status === 'success' ? (
              <div className="bg-[#E6F7F5] border border-[#B2DFDB] p-12 text-center">
                <div className="w-16 h-16 bg-[#00A896] flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0F2240] mb-3">Quote Request Sent!</h3>
                <p className="text-[#4A6583]">
                  We&apos;ll get back to you within 24 hours with a personalized quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 bg-[#F5FAFA] border border-[#B2DFDB] p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#0F2240]">Free Quote in 24hrs</h3>
                  <p className="text-[#4A6583] text-sm mt-1">No commitment needed — just honest pricing.</p>
                </div>

                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2240] tracking-wider uppercase mb-2">
                      Full Name <span className="text-[#00A896]">*</span>
                    </label>
                    <input
                      type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                      required placeholder="Jane Smith"
                      className="w-full border border-[#B2DFDB] bg-white px-4 py-3 text-sm text-[#0F2240] placeholder-[#4A6583]/40 focus:outline-none focus:border-[#00A896] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2240] tracking-wider uppercase mb-2">
                      Phone <span className="text-[#00A896]">*</span>
                    </label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      required placeholder="(720) 000-0000"
                      className="w-full border border-[#B2DFDB] bg-white px-4 py-3 text-sm text-[#0F2240] placeholder-[#4A6583]/40 focus:outline-none focus:border-[#00A896] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#0F2240] tracking-wider uppercase mb-2">
                    Email <span className="text-[#00A896]">*</span>
                  </label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    required placeholder="jane@example.com"
                    className="w-full border border-[#B2DFDB] bg-white px-4 py-3 text-sm text-[#0F2240] placeholder-[#4A6583]/40 focus:outline-none focus:border-[#00A896] transition-colors"
                  />
                </div>

                {/* Service dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-[#0F2240] tracking-wider uppercase mb-2">
                    Service Type <span className="text-[#00A896]">*</span>
                  </label>
                  <select
                    name="service" value={formData.service} onChange={handleChange} required
                    className="w-full border border-[#B2DFDB] bg-white px-4 py-3 text-sm text-[#0F2240] focus:outline-none focus:border-[#00A896] transition-colors appearance-none"
                  >
                    <option value="">Select a service...</option>
                    <option value="Standard Cleaning">Standard Cleaning</option>
                    <option value="Deep Cleaning">Deep Cleaning</option>
                    <option value="House Cleaning">House Cleaning</option>
                    <option value="Office Cleaning">Office Cleaning</option>
                    <option value="Move In/Out Cleaning">Move In/Out Cleaning</option>
                    <option value="Airbnb / Short-Term Rental">Airbnb / Short-Term Rental</option>
                    <option value="Carpet Cleaning">Carpet Cleaning</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Zip + Sq Ft */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2240] tracking-wider uppercase mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text" name="zipCode" value={formData.zipCode} onChange={handleChange}
                      placeholder="80220"
                      className="w-full border border-[#B2DFDB] bg-white px-4 py-3 text-sm text-[#0F2240] placeholder-[#4A6583]/40 focus:outline-none focus:border-[#00A896] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2240] tracking-wider uppercase mb-2">
                      Square Footage
                    </label>
                    <input
                      type="text" name="squareFootage" value={formData.squareFootage} onChange={handleChange}
                      placeholder="e.g. 1500 sq ft"
                      className="w-full border border-[#B2DFDB] bg-white px-4 py-3 text-sm text-[#0F2240] placeholder-[#4A6583]/40 focus:outline-none focus:border-[#00A896] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#0F2240] tracking-wider uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange}
                    rows={3} placeholder="Any specific needs or questions..."
                    className="w-full border border-[#B2DFDB] bg-white px-4 py-3 text-sm text-[#0F2240] placeholder-[#4A6583]/40 focus:outline-none focus:border-[#00A896] transition-colors resize-none"
                  />
                </div>

                {/* SMS Opt-in */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox" name="smsOptIn" id="smsOptIn"
                    checked={formData.smsOptIn} onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-[#00A896]"
                  />
                  <label htmlFor="smsOptIn" className="text-xs text-[#4A6583] leading-relaxed">
                    I agree to receive SMS messages from R A Pro Cleaning Services LLC. Reply STOP to opt out.
                    View our{' '}
                    <a href="/privacy" className="text-[#00A896] hover:underline">Privacy Policy</a>{' '}
                    and{' '}
                    <a href="/terms" className="text-[#00A896] hover:underline">Terms</a>.
                  </label>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please call us at 720-677-8799.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full btn-book-now bg-[#00A896] text-white font-bold py-4 hover:bg-[#007A6C] transition-colors disabled:opacity-60 disabled:cursor-not-allowed tracking-wide text-sm shadow-md"
                >
                  {status === 'sending' ? 'Sending...' : 'Get My Free Quote →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
