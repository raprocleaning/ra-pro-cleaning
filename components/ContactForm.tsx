'use client'
import { useState, FormEvent } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface FormData {
  fullName: string
  phone: string
  email: string
  zipCode: string
  squareFootage: string
  propertyType: string
  message: string
  smsOptIn: boolean
}

const ContactForm = () => {
  const ref = useScrollAnimation(0.05)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    zipCode: '',
    squareFootage: '',
    propertyType: 'Residential',
    message: '',
    smsOptIn: false,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // Replace the action URL with your actual Formspree endpoint
      const res = await fetch('https://formspree.io/f/meerbldr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          zip: formData.zipCode,
          squareFootage: formData.squareFootage,
          propertyType: formData.propertyType,
          message: formData.message,
          smsOptIn: formData.smsOptIn,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          zipCode: '',
          squareFootage: '',
          propertyType: 'Residential',
          message: '',
          smsOptIn: false,
        })
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
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div className="fade-in-up">
            <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tight mb-6">
              Request a<br />Free Quote
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-10">
              Fill out the form and we&apos;ll get back to you within 24 hours with a
              personalized cleaning quote for your home or office.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#C8A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0A0A0A]">Phone / SMS</p>
                  <a href="tel:7206778799" className="text-[#6B6B6B] text-sm hover:text-[#C8A96E] transition-colors">
                    720-677-8799
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#C8A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0A0A0A]">Email</p>
                  <a href="mailto:ra@raprocleaningservices.com" className="text-[#6B6B6B] text-sm hover:text-[#C8A96E] transition-colors">
                    ra@raprocleaningservices.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#C8A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0A0A0A]">Address</p>
                  <p className="text-[#6B6B6B] text-sm">
                    B, B502, 1325 S Colorado Blvd, Denver, CO 80222<br />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="fade-in-up">
            {status === 'success' ? (
              <div className="bg-[#F5F5F5] p-12 text-center">
                <div className="w-16 h-16 bg-[#C8A96E] flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-3">Message Sent!</h3>
                <p className="text-[#6B6B6B]">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0A0A] tracking-wider uppercase mb-2">
                      Full Name <span className="text-[#C8A96E]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C8A96E] transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0A0A] tracking-wider uppercase mb-2">
                      Phone <span className="text-[#C8A96E]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(720) 000-0000"
                      className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C8A96E] transition-colors bg-white"
                    />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] tracking-wider uppercase mb-2">
                    Email <span className="text-[#C8A96E]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                    className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C8A96E] transition-colors bg-white"
                  />
                </div>

                {/* Row 3: Zip + Sq Ft */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0A0A] tracking-wider uppercase mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="80220"
                      className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C8A96E] transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0A0A] tracking-wider uppercase mb-2">
                      Square Footage
                    </label>
                    <input
                      type="text"
                      name="squareFootage"
                      value={formData.squareFootage}
                      onChange={handleChange}
                      placeholder="e.g. 1500 sq ft"
                      className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C8A96E] transition-colors bg-white"
                    />
                  </div>
                </div>

                {/* Row 4: Property Type */}
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] tracking-wider uppercase mb-2">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#C8A96E] transition-colors bg-white appearance-none"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Airbnb / Short-Term Rental">Airbnb / Short-Term Rental</option>
                    <option value="Move In/Out">Move In/Out</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Row 5: Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] tracking-wider uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your space and any specific cleaning needs..."
                    className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#0A0A0A] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C8A96E] transition-colors bg-white resize-none"
                  />
                </div>

                {/* SMS Opt-in */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="smsOptIn"
                    id="smsOptIn"
                    checked={formData.smsOptIn}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 border-[#E0E0E0] accent-[#C8A96E]"
                  />
                  <label htmlFor="smsOptIn" className="text-xs text-[#6B6B6B] leading-relaxed">
                    I agree to receive SMS text messages from R A Pro Cleaning Services LLC at the
                    phone number provided. Message and data rates may apply. Reply STOP to opt out
                    at any time. View our{' '}
                    <a href="/privacy" className="text-[#C8A96E] hover:underline">Privacy Policy</a>.
                  </label>
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-red-500 text-sm">
                    Something went wrong. Please try again or call us at 720-677-8799.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#C8A96E] text-white font-semibold py-4 hover:bg-[#B8935A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed tracking-wide"
                >
                  {status === 'sending' ? 'Sending...' : 'Get My Free Quote'}
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
