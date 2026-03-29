import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import WhyChooseUs from '@/components/WhyChooseUs'
import BeforeAfter from '@/components/BeforeAfter'
import Pricing from '@/components/Pricing'
import Reviews from '@/components/Reviews'
import GallerySection from '@/components/GallerySection'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import ServiceAreas from '@/components/ServiceAreas'

export default function Home() {
  return (
    <main>
      <Hero />

      {/* About / Intro */}
      <section className="py-20 bg-[#E6F7F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#00A896] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
              About R A Pro
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F2240] tracking-tight mb-6">
              Denver&apos;s Trusted Cleaning Professionals
            </h2>
            <p className="text-[#4A6583] text-lg leading-relaxed">
              R A Pro Cleaning Services LLC brings Denver homeowners and businesses a premium
              cleaning experience built on trust, attention to detail, and exceptional results.
              With 41 five-star reviews and a team of fully licensed and insured professionals,
              we deliver the kind of clean that makes you proud of your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="https://raprocleaningservices.bookingkoala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-book-now inline-flex items-center justify-center gap-2 bg-[#00A896] text-white font-bold px-8 py-4 shadow-md"
              >
                Book Now
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#B2DFDB] text-[#0F2240] font-medium px-8 py-4 hover:border-[#00A896] hover:text-[#00A896] transition-colors"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <WhyChooseUs />
      <BeforeAfter />
      <Pricing />
      <Reviews />
      <GallerySection />
      <HowItWorks />
      <ServiceAreas />
      <FAQ />
      <ContactForm />
    </main>
  )
}
