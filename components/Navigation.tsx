'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [whyUsOpen, setWhyUsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const services = [
    { name: 'House Cleaning', href: '/services/house-cleaning' },
    { name: 'Deep Cleaning', href: '/services/deep-cleaning' },
    { name: 'Standard Cleaning', href: '/services/standard-cleaning' },
    { name: 'Office Cleaning', href: '/services/office-cleaning' },
    { name: 'Move In/Out Cleaning', href: '/services/move-in-out' },
    { name: 'Airbnb Cleaning', href: '/services/airbnb-cleaning' },
    { name: 'Carpet Cleaning', href: '/services/carpet-cleaning' },
  ]

  const whyUs = [
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Cleaning Checklist', href: '/about#checklist' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-sm border-b border-[#E0E0E0]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo
                variant={scrolled ? 'color' : 'white'}
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
                    scrolled
                      ? 'text-[#0A0A0A] hover:text-[#C8A96E]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Services
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#E0E0E0] shadow-lg z-50">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-3 text-sm text-[#0A0A0A] hover:bg-[#F5F5F5] hover:text-[#C8A96E] transition-colors border-b border-[#E0E0E0] last:border-0"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Why Us Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setWhyUsOpen(true)}
                onMouseLeave={() => setWhyUsOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
                    scrolled
                      ? 'text-[#0A0A0A] hover:text-[#C8A96E]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Why Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {whyUsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E0E0E0] shadow-lg z-50">
                    {whyUs.map((w) => (
                      <Link
                        key={w.href}
                        href={w.href}
                        className="block px-4 py-3 text-sm text-[#0A0A0A] hover:bg-[#F5F5F5] hover:text-[#C8A96E] transition-colors border-b border-[#E0E0E0] last:border-0"
                      >
                        {w.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {[
                { name: 'Gallery', href: '/gallery' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    scrolled
                      ? 'text-[#0A0A0A] hover:text-[#C8A96E]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <a
                href="https://raprocleaningservices.bookingkoala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C8A96E] text-white text-sm font-semibold tracking-wide px-6 py-2.5 hover:bg-[#B8935A] transition-colors"
              >
                Book Now
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${
                scrolled || mobileOpen ? 'text-[#0A0A0A]' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center px-8 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-8 overflow-y-auto py-24">
          <div>
            <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-4">Services</p>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setMobileOpen(false)}
                className="block text-white text-2xl font-light py-2 hover:text-[#C8A96E] transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 space-y-4">
            {[
              { name: 'About Us', href: '/about' },
              { name: 'Gallery', href: '/gallery' },
              { name: 'Blog', href: '/blog' },
              { name: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-white text-xl font-light hover:text-[#C8A96E] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <a
            href="https://raprocleaningservices.bookingkoala.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C8A96E] text-white text-lg font-semibold px-8 py-4 hover:bg-[#B8935A] transition-colors"
          >
            Book Now &rarr;
          </a>
        </div>
      </div>
    </>
  )
}

export default Navigation
