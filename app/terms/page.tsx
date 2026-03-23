import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | R A Pro Cleaning Services',
  description: 'Terms of Service for R A Pro Cleaning Services LLC — the terms and conditions governing use of our website and services.',
}

export default function TermsPage() {
  return (
    <main className="pt-20">
      <section className="bg-[#0A0A0A] py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Terms of Service</h1>
          <p className="text-white/50 mt-4 text-sm">Last updated: January 1, 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-10 text-[#3A3A3A] text-sm leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing our website or booking our cleaning services, you agree to be bound by
                these Terms of Service. If you do not agree with any part of these terms, please do
                not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">2. Services</h2>
              <p className="mb-3">
                R A Pro Cleaning Services LLC provides residential and commercial cleaning services
                in the Denver, Colorado metropolitan area. Services are subject to availability and
                may vary based on location and property type.
              </p>
              <p>
                We reserve the right to refuse service to anyone for any reason at any time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">3. Booking &amp; Scheduling</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Appointments are confirmed upon receipt of a booking confirmation from us.</li>
                <li>A valid contact number and address must be provided at time of booking.</li>
                <li>We will make every effort to arrive within the scheduled time window. Delays due to traffic or prior appointments may occur.</li>
                <li>You or an authorized representative must be available to provide access to the property at the scheduled time, unless alternative arrangements have been made.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">4. Cancellation &amp; Rescheduling</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cancellations or rescheduling requests must be made at least <strong>24 hours</strong> before the scheduled appointment.</li>
                <li>Cancellations made with less than 24 hours&apos; notice may be subject to a cancellation fee.</li>
                <li>No-shows or lockouts (where our team cannot access the property) may also be subject to a fee.</li>
                <li>We reserve the right to cancel or reschedule appointments due to weather, staff emergencies, or other unforeseen circumstances. We will notify you as soon as possible in such cases.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">5. Pricing &amp; Payment</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prices are provided as estimates and may be adjusted based on the actual condition and size of the property.</li>
                <li>Payment is due upon completion of services unless alternative arrangements have been agreed upon in advance.</li>
                <li>We accept major credit cards, debit cards, and other payment methods as indicated at the time of booking.</li>
                <li>Prices are subject to change with reasonable notice.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">6. Satisfaction Guarantee</h2>
              <p>
                We stand behind the quality of our work. If you are not satisfied with any aspect of
                your cleaning, please contact us within <strong>24 hours</strong> of service completion
                and we will return to address the issue at no additional charge.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">7. Access to Property</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You grant our cleaning staff permission to access and clean the areas of your property as agreed.</li>
                <li>Please secure or remove any fragile, irreplaceable, or valuable items prior to our arrival.</li>
                <li>Our staff will treat your home and belongings with care and respect.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">8. Liability</h2>
              <p className="mb-3">
                R A Pro Cleaning Services LLC is fully licensed and insured. In the event of damage
                caused by our staff during a cleaning, please notify us within 24 hours. We will work
                with you to address the issue fairly.
              </p>
              <p>
                We are not liable for pre-existing damage, items not secured or stored safely, or
                damage resulting from conditions outside our control.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">9. Website Use</h2>
              <p>
                You agree to use our website only for lawful purposes and in a manner that does not
                infringe the rights of others. You may not use our website to transmit any harmful,
                offensive, or disruptive content.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">10. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and images, is the
                property of R A Pro Cleaning Services LLC and is protected by applicable intellectual
                property laws. You may not reproduce or use our content without written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">11. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms of Service at any time. Continued use of
                our website or services after changes are posted constitutes your acceptance of the
                new terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">12. Governing Law</h2>
              <p>
                These Terms of Service are governed by the laws of the State of Colorado. Any
                disputes arising from these terms shall be resolved in the courts of Denver County,
                Colorado.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">13. Contact Us</h2>
              <p>If you have questions about these Terms of Service, please contact us:</p>
              <div className="mt-3 space-y-1">
                <p><strong>R A Pro Cleaning Services LLC</strong></p>
                <p>B, B502, 1325 S Colorado Blvd</p>
                <p>Denver, CO 80222</p>
                <p>Phone: <a href="tel:7206778799" className="text-[#C8A96E] hover:underline">720-677-8799</a></p>
                <p>Email: <a href="mailto:ra@raprocleaningservices.com" className="text-[#C8A96E] hover:underline">ra@raprocleaningservices.com</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
