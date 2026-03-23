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

              {/* Social Icons */}
              <a
                href="https://www.instagram.com/raprocleaningservice/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`transition-colors ${scrolled ? 'text-[#0A0A0A] hover:text-[#C8A96E]' : 'text-white/80 hover:text-white'}`}
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
                className={`transition-colors ${scrolled ? 'text-[#0A0A0A] hover:text-[#C8A96E]' : 'text-white/80 hover:text-white'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

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
