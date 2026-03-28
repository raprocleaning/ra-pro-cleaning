import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | R A Pro Cleaning Services Denver',
  description:
    'Contact R A Pro Cleaning Services in Denver. Call, text, or email us for a free cleaning quote. Serving all of Denver and the surrounding metro area.',
}

export default function ContactPage() {
  const hours = [
    { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: 'By appointment' },
  ]

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-[#0F2240] py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 50%, rgba(0,168,150,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00A896]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
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
      <section className="py-10 bg-[#E6F7F5] border-b border-[#B2DFDB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="tel:7206778799" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-[#00A896] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4A6583] uppercase tracking-wider">Call Us</p>
                <p className="font-bold text-[#0F2240] group-hover:text-[#00A896] transition-colors">
                  720-677-8799
                </p>
              </div>
            </a>

            <a href="mailto:ra@raprocleaningservices.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-[#00A896] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4A6583] uppercase tracking-wider">Email Us</p>
                <p className="font-bold text-[#0F2240] group-hover:text-[#00A896] transition-colors text-sm">
                  ra@raprocleaningservices.com
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00A896] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4A6583] uppercase tracking-wider">Our Address</p>
                <p className="font-bold text-[#0F2240] text-sm">
                  1325 S Colorado Blvd, Suite B502<br />Denver, CO 80222
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <ContactForm />

      {/* Google Map */}
      <section className="bg-[#F0FAFA] border-t border-[#B2DFDB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-[#0F2240] mb-8 tracking-tight">Our Service Area</h2>
          <div className="w-full h-96 overflow-hidden border border-[#B2DFDB] shadow-sm">
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
          <p className="text-[#4A6583] text-sm mt-4">
            Serving Denver, Aurora, Lakewood, Englewood, Centennial, and surrounding metro areas.
          </p>
        </div>
      </section>

      {/* Hours & Social */}
      <section className="py-16 bg-white border-t border-[#B2DFDB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Hours table */}
            <div>
              <h3 className="text-xl font-bold text-[#0F2240] mb-6">Business Hours</h3>
              <div className="border border-[#B2DFDB] overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {hours.map((item, idx) => (
                      <tr key={item.day} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F0FAFA]'}>
                        <td className="px-5 py-3.5 text-[#4A6583] font-medium">{item.day}</td>
                        <td className="px-5 py-3.5 text-[#0F2240] font-semibold text-right">{item.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#4A6583]">
                <svg className="w-4 h-4 text-[#00A896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Same-day bookings available based on availability. Call to confirm.
              </div>
            </div>

            {/* Follow us */}
            <div>
              <h3 className="text-xl font-bold text-[#0F2240] mb-6">Follow Us</h3>
              <div className="flex flex-col gap-4">
                <a
                  href="https://www.instagram.com/raprocleaningservice/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#B2DFDB] px-5 py-4 hover:border-[#00A896] hover:text-[#00A896] transition-colors text-sm font-medium text-[#0F2240] group"
                >
                  <svg className="w-5 h-5 text-[#4A6583] group-hover:text-[#00A896] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @raprocleaningservice on Instagram
                </a>
                <a
                  href="https://www.facebook.com/share/16NnxD6cYf/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#B2DFDB] px-5 py-4 hover:border-[#00A896] hover:text-[#00A896] transition-colors text-sm font-medium text-[#0F2240] group"
                >
                  <svg className="w-5 h-5 text-[#4A6583] group-hover:text-[#00A896] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  R A Pro Cleaning Services on Facebook
                </a>
              </div>

              {/* Book CTA */}
              <div className="mt-8 p-6 bg-[#E6F7F5] border border-[#B2DFDB]">
                <p className="font-bold text-[#0F2240] mb-2">Ready to book?</p>
                <p className="text-[#4A6583] text-sm mb-4">Skip the form — book online in 60 seconds.</p>
                <a
                  href="https://raprocleaningservices.bookingkoala.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-book-now inline-flex items-center gap-2 bg-[#00A896] text-white font-bold px-6 py-3 text-sm shadow-md"
                >
                  Book Online Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
