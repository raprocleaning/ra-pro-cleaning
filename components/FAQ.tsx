'use client'
import { useState } from 'react'
import { useScrollAnimationMultiple } from '@/hooks/useScrollAnimation'
import ContactActions from '@/components/ContactActions'

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'We offer a full range of residential and commercial cleaning services including deep cleaning, standard recurring cleaning, house cleaning, office cleaning, move in/out cleaning, Airbnb turnover cleaning, kitchen cleaning, bathroom cleaning, and bedroom cleaning. Each service is fully customizable to your needs.',
  },
  {
    question: 'How much do your services cost?',
    answer:
      'Pricing depends on service type, square footage, home condition, and selected extras. Request a free personalized quote with no hidden fees.',
  },
  {
    question: 'Are your staff licensed and insured?',
    answer:
      'Yes. R A Pro Cleaning Services is licensed and insured, helping protect your home and belongings while our team is working in your space.',
  },
  {
    question: 'What if I have specific preferences or allergies?',
    answer:
      'We customize every clean to your individual needs. Simply let us know about any allergies, preferred products, areas of focus, or things to avoid when you book. We use pet-friendly and eco-friendly products upon request.',
  },
  {
    question: 'How do I book a cleaning?',
    answer:
      'Booking is quick and easy — you can schedule online in just 60 seconds at raprocleaningservices.com/contact, or you can call or text us at 720-677-8799. We\'ll confirm your appointment and send a reminder before your scheduled clean.',
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "We require 24-hour notice for cancellations or rescheduling. Cancellations with less than 24 hours' notice may be subject to a cancellation fee. We understand things come up and will always do our best to accommodate your schedule.",
  },
]

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#B2DFDB] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={open}
      >
        <span className={`font-semibold text-base transition-colors ${open ? 'text-[#00A896]' : 'text-[#0F2240] group-hover:text-[#00A896]'}`}>
          {question}
        </span>
        <div
          className={`flex-shrink-0 ml-4 w-8 h-8 border flex items-center justify-center transition-all duration-300 ${
            open
              ? 'border-[#00A896] text-[#00A896] rotate-45'
              : 'border-[#B2DFDB] text-[#4A6583] group-hover:border-[#00A896] group-hover:text-[#00A896]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-[#4A6583] leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

const FAQ = () => {
  const ref = useScrollAnimationMultiple(0.05)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#F5F9FF]"
      id="faq"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Header + CTA */}
          <div className="fade-in-up">
            <p className="text-[#00A896] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F2240] tracking-tight mb-6">
              Frequently Asked<br />Questions
            </h2>
            <p className="text-[#4A6583] leading-relaxed mb-10">
              Have a question we haven&apos;t answered here? We&apos;d love to hear from you.
            </p>
            <div className="space-y-4">
              <ContactActions
                className="flex flex-col items-start gap-4"
                bookLabel="Book a Clean"
                primaryClassName="inline-flex items-center gap-2 bg-[#00A896] text-white font-semibold px-6 py-3 hover:bg-[#007A6C] transition-colors"
                secondaryClassName="flex items-center gap-2 text-[#0F2240] font-medium hover:text-[#00A896] transition-colors"
              />
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="fade-in-up">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
