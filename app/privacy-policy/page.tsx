import type { Metadata } from 'next'
import PrivacyPage from '@/app/privacy/page'

/**
 * The same Privacy Policy, served at the URL carriers look for.
 *
 * A2P 10DLC campaign registration was rejected with error 30908 — The Campaign
 * Registry could not verify a privacy policy. TCR's crawler was pointed at
 * /privacy-policy, which is the conventional path; this site serves /privacy,
 * so the crawler got a 404 and the campaign failed with every required
 * disclosure already written and live one URL away.
 *
 * This is a real page rather than a redirect because an automated compliance
 * crawler that does not follow a 301 would fail the same way again.
 *
 * The canonical points back at /privacy so search engines keep treating that as
 * the one address for this content.
 */
export const metadata: Metadata = {
  title: 'Privacy Policy | R A Pro Cleaning Services',
  description:
    'Privacy Policy for R A Pro Cleaning Services LLC — how we collect, use, and protect your personal information, including SMS opt-in data.',
  alternates: { canonical: 'https://raprocleaningservices.com/privacy' },
}

export default PrivacyPage
