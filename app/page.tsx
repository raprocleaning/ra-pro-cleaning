import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import WhyChooseUs from '@/components/WhyChooseUs'
import Reviews from '@/components/Reviews'
import GallerySection from '@/components/GallerySection'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <main>
      <Hero />

      {/* About / Intro */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              About R A Pro
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A0A0A] tracking-tight mb-6">
              Denver&apos;s Trusted Cleaning Professionals
            </h2>
            <p className="text-[#6B6B6B] text-lg leading-relaxed">
              R A Pro Cleaning Services LLC brings Denver homeowners and businesses a premium
              cleaning experience built on trust, attention to detail, and exceptional results.
              With 24 five-star reviews and a team of fully licensed and insured professionals,
              we deliver the kind of clean that makes you proud of your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="https://raprocleaningservices.bookingkoala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#C8A96E] text-white font-semibold px-8 py-4 hover:bg-[#B8935A] transition-colors"
              >
                Book Now
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 border border-[#E0E0E0] text-[#0A0A0A] font-medium px-8 py-4 hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <WhyChooseUs />
      <Reviews />
      <GallerySection />
      <HowItWorks />
      <FAQ />
      <ContactForm />
    </main>
  )
}
