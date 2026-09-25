import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import CleaningChecklist from '@/components/CleaningChecklist'
import WhyChooseUs from '@/components/WhyChooseUs'
import BeforeAfter from '@/components/BeforeAfter'
import Reviews from '@/components/Reviews'
import GallerySection from '@/components/GallerySection'
import HowItWorks from '@/components/HowItWorks'
import CTABand from '@/components/CTABand'
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
              Quality House Cleaning, Built Around Your Schedule
            </h2>
            <p className="text-[#4A6583] text-lg leading-relaxed">
              R A Pro Cleaning Services LLC brings Denver and Aurora homeowners and businesses a premium
              cleaning experience built on trust, attention to detail, and exceptional results.
              With 46 five-star Google reviews and a team of fully licensed and insured professionals,
              we deliver the kind of clean that makes you proud of your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a
                  href="/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-book-now inline-flex items-center justify-center gap-2 bg-[#00A896] text-white font-bold px-8 py-4 rounded-full shadow-md"
                >
                  Book Now
                </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#B2DFDB] text-[#0F2240] font-medium px-8 py-4 rounded-full hover:border-[#00A896] hover:text-[#00A896] transition-colors"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid />

      {/* Room-by-room checklist — sets expectations before the price is shown */}
      <CleaningChecklist />

      <CTABand
        eyebrow="Free, No-Obligation Quote"
        heading="Ready For A Spotless Home?"
        subheading="Tell us about your space and we'll send a personalized quote within 24 hours. No hidden fees, no pressure."
        variant="teal"
      />

      <WhyChooseUs />
      <BeforeAfter />
      <Reviews />
      <GallerySection />
      <HowItWorks />
      <ServiceAreas />

      <CTABand
        eyebrow="Denver & Aurora"
        heading="Book Your Clean In 60 Seconds"
        subheading="Licensed, insured, and rated 5.0 across 45 Google reviews. Pick a time that works for you — we'll handle the rest."
        variant="navy"
      />

      <FAQ />
      <ContactForm />
    </main>
  )
}
