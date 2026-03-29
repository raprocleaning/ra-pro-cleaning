'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: 'Newsletter Signup', email, message: 'Newsletter signup', propertyType: 'Newsletter' }),
      })
      if (res.ok) {
        setNewsletterStatus('success')
        setEmail('')
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  const services = [
    { name: 'House Cleaning', href: '/services/house-cleaning' },
    { name: 'Deep Cleaning', href: '/services/deep-cleaning' },
    { name: 'Standard Cleaning', href: '/services/standard-cleaning' },
    { name: 'Office Cleaning', href: '/services/office-cleaning' },
    { name: 'Move In/Out Cleaning', href: '/services/move-in-out' },
    { name: 'Airbnb Cleaning', href: '/services/airbnb-cleaning' },
    { name: 'Carpet Cleaning', href: '/services/carpet-cleaning' },
  ]

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Pricing', href: '/#pricing' },
  ]

  const hours = [
    { day: 'Mon – Fri', hours: '8:00 AM – 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: 'By appointment' },
  ]

  return (
    <footer className="bg-[#071525] text-white">
      {/* Top CTA band */}
      <div className="bg-[#00A896]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-xl">Ready for a spotless home?</h3>
            <p className="text-white/80 text-sm mt-1">Book online in 60 seconds — no phone call needed.</p>
          </div>
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#00A896] font-bold px-8 py-3.5 hover:bg-white/90 transition-colors text-sm flex-shrink-0"
          >
            Book Now &rarr;
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column — spans 2 */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo variant="color" className="h-16 w-auto opacity-90" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs">
              Denver&apos;s premium cleaning experience. Licensed, insured, and dedicated to
              exceptional results every time.
            </p>

            {/* Address */}
            <div className="flex items-start gap-3 mb-5">
              <svg className="w-4 h-4 text-[#00A896] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-white/50 text-sm">
                1325 S Colorado Blvd, Suite B502<br />Denver, CO 80222
              </p>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <svg className="w-4 h-4 text-[#00A896] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:7206778799" className="text-white/50 text-sm hover:text-[#00A896] transition-colors">
                (720) 677-8799
              </a>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <svg className="w-4 h-4 text-[#00A896] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:ra@raprocleaningservices.com" className="text-white/50 text-sm hover:text-[#00A896] transition-colors">
                ra@raprocleaningservices.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/raprocleaningservice/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:text-[#00A896] hover:border-[#00A896] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/16NnxD6cYf/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:text-[#00A896] hover:border-[#00A896] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="tel:7206778799"
                aria-label="Call us"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:text-[#00A896] hover:border-[#00A896] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/35 mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-white/50 hover:text-[#00A896] transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/35 mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-white/50 hover:text-[#00A896] transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://raprocleaningservices.bookingkoala.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#00A896] hover:text-[#00C9B5] transition-colors font-semibold"
                >
                  Book Now →
                </a>
              </li>
            </ul>
          </div>

          {/* Hours + Newsletter Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/35 mb-6">
              Hours
            </h3>
            <ul className="space-y-3 mb-10">
              {hours.map((h) => (
                <li key={h.day} className="flex flex-col">
                  <span className="text-xs text-white/35 uppercase tracking-wider">{h.day}</span>
                  <span className="text-sm text-white/60 mt-0.5">{h.hours}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/35 mb-4">
              Newsletter
            </h3>
            {newsletterStatus === 'success' ? (
              <p className="text-[#00A896] text-sm font-medium">Thanks for signing up! 🎉</p>
            ) : newsletterStatus === 'error' ? (
              <p className="text-red-400 text-sm">Something went wrong — please try again or email us directly.</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 min-w-0 bg-white/10 border border-white/20 px-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00A896] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#00A896] text-white px-3 py-2.5 text-xs font-semibold hover:bg-[#007A6C] transition-colors flex-shrink-0"
                >
                  Join
                </button>
              </form>
            )}
            <p className="text-white/25 text-xs mt-2">Cleaning tips & exclusive offers.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/25">
            &copy; {new Date().getFullYear()} R A Pro Cleaning Services LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
