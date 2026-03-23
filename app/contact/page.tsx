import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | R A Pro Cleaning Services Denver',
  description:
    'Contact R A Pro Cleaning Services in Denver. Call, text, or email us for a free cleaning quote. Serving all of Denver and the surrounding metro area.',
}

export default function ContactPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 50%, rgba(200,169,110,0.3) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="text-white/60 text-xl max-w-xl">
            Ready to book, have a question, or want a free quote? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-10 bg-[#F5F5F5] border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="tel:7206778799"
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-[#C8A96E] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Call Us</p>
                <p className="font-bold text-[#0A0A0A] group-hover:text-[#C8A96E] transition-colors">
                  720-677-8799
                </p>
              </div>
            </a>

            <a
              href="mailto:ra@raprocleaningservices.com"
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-[#C8A96E] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Email Us</p>
                <p className="font-bold text-[#0A0A0A] group-hover:text-[#C8A96E] transition-colors text-sm">
                  ra@raprocleaningservices.com
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C8A96E] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Visit Us</p>
                <p className="font-bold text-[#0A0A0A] text-sm">
                  B, B502, 1325 S Colorado Blvd<br />Denver, CO 80222
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <ContactForm />

      {/* Google Map */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0A0A0A] mb-8 tracking-tight">Service Area</h2>
          <div className="w-full h-96 overflow-hidden border border-[#E0E0E0]">
            <iframe
              title="R A Pro Cleaning Services location"
              src="https://maps.google.com/maps?q=1325+S+Colorado+Blvd,+Denver,+CO+80222&output=embed&z=15"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-[#6B6B6B] text-sm mt-3">
            Serving Denver, Aurora, Lakewood, Englewood, and surrounding metro areas
          </p>
        </div>
      </section>

      {/* Hours & Social */}
      <section className="py-16 bg-white border-t border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-6">Business Hours</h3>
              <div className="space-y-3">
                {[
                  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
                  { day: 'Sunday', hours: 'By appointment' },
                ].map((item) => (
                  <div key={item.day} className="flex items-center justify-between border-b border-[#E0E0E0] pb-3">
                    <span className="text-[#6B6B6B] text-sm">{item.day}</span>
                    <span className="text-[#0A0A0A] font-medium text-sm">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/raprocleaningservice/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#E0E0E0] px-5 py-3 hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors text-sm font-medium text-[#0A0A0A]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/share/16NnxD6cYf/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#E0E0E0] px-5 py-3 hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors text-sm font-medium text-[#0A0A0A]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
