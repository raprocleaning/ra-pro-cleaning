'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { useContactMode } from '@/lib/useContactMode'

const Navigation = () => {
  const mode = useContactMode()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [whyUsOpen, setWhyUsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const services = [
    { name: 'House Cleaning', href: '/services/house-cleaning' },
    { name: 'Deep Cleaning', href: '/services/deep-cleaning' },
    { name: 'Standard Cleaning', href: '/services/standard-cleaning' },
    { name: 'Office Cleaning', href: '/services/office-cleaning' },
    { name: 'Move In/Out Cleaning', href: '/services/move-in-out' },
    { name: 'Airbnb Cleaning', href: '/services/airbnb-cleaning' },
    { name: 'Post-Construction Cleaning', href: '/services/post-construction' },
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
          scrolled
            ? 'bg-white shadow-md border-b border-[#B2DFDB]'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-[#00B894] font-medium py-2 transition-colors">
                <span>Services</span>
                <svg className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E8F8F5] hover:text-[#00B894] transition-colors"
                    >
                      {service.name}
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
              <button className="flex items-center space-x-1 text-gray-700 hover:text-[#00B894] font-medium py-2 transition-colors">
                <span>Why Us</span>
                <svg className={`w-4 h-4 transition-transform ${whyUsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {whyUsOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {whyUs.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E8F8F5] hover:text-[#00B894] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/gallery" className="text-gray-700 hover:text-[#00B894] font-medium transition-colors">
              Gallery
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-[#00B894] font-medium transition-colors">
              Reviews
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#00B894] font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#00B894] font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Right Side Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Phone/Text Button */}
            <a
              href={mode === 'phone' ? 'tel:7206778799' : 'sms:7206778799'}
              className="border-2 border-[#00B894] text-[#00B894] hover:bg-[#00B894] hover:text-white font-semibold px-4 py-2 rounded-full transition-all shadow-sm text-sm"
            >
              {mode === 'phone' ? '(720) 677-8799' : 'Text us'}
            </a>

            {/* Permanent Book Now Button */}
            <a
              href="https://api.leadconnectorhq.com/widget/service-menu/6a76b1110371a03621587521"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00B894] hover:bg-[#00a382] text-white font-semibold px-5 py-2 rounded-full transition-all shadow-md text-sm inline-block"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#0F2240]"
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
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0F2240] flex flex-col justify-center px-8 transition-all duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-6 overflow-y-auto py-12">
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Services</p>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setMobileOpen(false)}
                className="block text-white text-xl font-light py-1.5 hover:text-[#00B894] transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 space-y-3">
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block text-white text-xl font-light hover:text-[#00B894] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-white text-xl font-light hover:text-[#00B894] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="pt-6 space-y-3">
            <a
              href="https://api.leadconnectorhq.com/widget/service-menu/6a76b1110371a03621587521"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#00B894] text-white font-semibold py-3 rounded-full shadow-lg"
            >
              Book Now
            </a>
            <a
              href="tel:7206778799"
              className="block w-full text-center border-2 border-white text-white font-semibold py-3 rounded-full"
            >
              Call (720) 677-8799
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
