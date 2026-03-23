import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | R A Pro Cleaning Services',
  description: 'Privacy Policy for R A Pro Cleaning Services LLC — how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <main className="pt-20">
      <section className="bg-[#1A2B4B] py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-[#4A90D9] text-xs font-semibold tracking-[0.3em] uppercase mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Privacy Policy</h1>
          <p className="text-white/50 mt-4 text-sm">Last updated: January 1, 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-gray max-w-none">

          <div className="space-y-10 text-[#3A3A3A] text-sm leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">1. Introduction</h2>
              <p>
                R A Pro Cleaning Services LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
                personal information. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or use our cleaning services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">2. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and mailing address when you fill out our contact or booking forms.</li>
                <li><strong>Property Information:</strong> Zip code, square footage, and property type you provide when requesting a quote.</li>
                <li><strong>Communications:</strong> Messages, inquiries, and feedback you send us.</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and browser type collected automatically via cookies and analytics tools.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your inquiries and provide cleaning service quotes</li>
                <li>To schedule and confirm cleaning appointments</li>
                <li>To send service reminders and follow-up communications</li>
                <li>To send SMS messages if you have opted in to receive them</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">4. SMS Communications</h2>
              <p className="mb-3">
                If you opt in to receive SMS text messages from R A Pro Cleaning Services LLC, you agree
                to receive text messages related to your service bookings, appointment reminders, and
                promotional offers at the phone number you provide.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Message and data rates may apply.</li>
                <li>Message frequency varies.</li>
                <li>Reply <strong>STOP</strong> at any time to opt out of SMS communications.</li>
                <li>Reply <strong>HELP</strong> for help or contact us at ra@raprocleaningservices.com.</li>
                <li>We will never sell your phone number to third parties.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">5. Sharing Your Information</h2>
              <p className="mb-3">We do not sell or rent your personal information. We may share it with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website or conducting our business (e.g., Formspree for form submissions, BookingKoala for scheduling).</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">6. Cookies</h2>
              <p>
                Our website may use cookies to enhance your browsing experience. You can instruct your
                browser to refuse all cookies or to indicate when a cookie is being sent. However, some
                parts of our site may not function properly without cookies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">7. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from
                unauthorized access, alteration, disclosure, or destruction. However, no method of
                transmission over the Internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">8. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of SMS or email communications at any time</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact us at ra@raprocleaningservices.com.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">9. Children&apos;s Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 13. We do not knowingly
                collect personal information from children under 13.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new policy on this page with an updated date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A2B4B] mb-3">11. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us:</p>
              <div className="mt-3 space-y-1">
                <p><strong>R A Pro Cleaning Services LLC</strong></p>
                <p>B, B502, 1325 S Colorado Blvd</p>
                <p>Denver, CO 80222</p>
                <p>Phone: <a href="tel:7206778799" className="text-[#4A90D9] hover:underline">720-677-8799</a></p>
                <p>Email: <a href="mailto:ra@raprocleaningservices.com" className="text-[#4A90D9] hover:underline">ra@raprocleaningservices.com</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
