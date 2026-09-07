/**
 * Emails job applications to whoever is doing the hiring, and sends the
 * applicant their own acknowledgement.
 *
 * Cleaners apply to several listings in one sitting and take the first job
 * that answers them. Indeed charges by the day for that first contact; this
 * sends it for nothing, the moment the form is submitted. Speed is the whole
 * point — an application that sits unanswered overnight is usually already
 * working somewhere else by morning.
 *
 * Delivery is best effort, exactly as with leads: the application is already
 * in the CRM by the time this runs, so a mail server that is down must never
 * show an applicant an error page.
 */

import { mailTransport, notifyRecipients } from './leadEmail'

/** What the applicant sees signed at the bottom of their acknowledgement. */
const BUSINESS = {
  name: 'R A Pro Cleaning Services',
  phone: '(720) 677-8799',
  email: 'ra@raprocleaningservices.com',
  site: 'raprocleaningservices.com',
}

export type Applicant = {
  name: string
  phone: string
  email: string
  /** Free text — "Aurora", "Denver + Lakewood", whatever they typed. */
  area?: string
  experience?: string
  availability?: string[] | string
  hasCar?: boolean
  legalToWork?: boolean
  englishLevel?: string
  message?: string
  source?: string
}

export type EmailResult = { sent: boolean; error: string }

/**
 * Where applications go. Hiring mail is separated from lead mail on purpose —
 * the person filling shifts is not always the person answering customers, and
 * burying applications in the leads inbox is how good cleaners get lost.
 * Falls back to the lead recipients so a missing variable never drops an
 * application on the floor.
 */
export function hiringRecipients(): string[] {
  const configured = (process.env.HIRING_NOTIFY_TO || '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)
  return configured.length > 0 ? configured : notifyRecipients()
}

const text = (value: unknown): string =>
  value === undefined || value === null || value === '' ? '' : String(value).trim()

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const yesNo = (value: boolean | undefined): string =>
  value === undefined ? '' : value ? 'Yes' : 'No'

/**
 * The application as labelled rows, so the plain-text and HTML bodies stay in
 * step. Empty fields are dropped rather than printed blank.
 */
function rows(applicant: Applicant): Array<[string, string]> {
  const availability = Array.isArray(applicant.availability)
    ? applicant.availability.join(', ')
    : text(applicant.availability)

  const all: Array<[string, string]> = [
    ['Name', text(applicant.name)],
    ['Phone', text(applicant.phone)],
    ['Email', text(applicant.email)],
    ['Area', text(applicant.area)],
    ['Experience', text(applicant.experience)],
    ['Available', availability],
    ['Own transport', yesNo(applicant.hasCar)],
    ['Legally able to work in the US', yesNo(applicant.legalToWork)],
    ['English', text(applicant.englishLevel)],
    ['Notes', text(applicant.message)],
    ['Applied from', text(applicant.source) || 'Careers page'],
  ]

  return all.filter(([, value]) => value !== '')
}

export function applicationSubject(applicant: Applicant): string {
  const who = text(applicant.name) || text(applicant.phone) || 'Someone'
  const area = text(applicant.area)
  return `New cleaner application: ${who}${area ? ` — ${area}` : ''}`
}

export function applicationTextBody(applicant: Applicant): string {
  const body = rows(applicant)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
  const phone = text(applicant.phone)
  return [
    'Someone applied to clean with us through raprocleaningservices.com.',
    '',
    body,
    '',
    phone ? `Call or text them on ${phone} — first to answer usually gets them.` : '',
  ].join('\n')
}

export function applicationHtmlBody(applicant: Applicant): string {
  const cells = rows(applicant)
    .map(
      ([label, value]) =>
        `<tr>` +
        `<td style="padding:6px 12px 6px 0;color:#5A6B6B;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;color:#12292B;font-weight:600">${escapeHtml(value).replace(/\n/g, '<br>')}</td>` +
        `</tr>`
    )
    .join('')

  const phone = text(applicant.phone)

  return (
    `<div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:15px;color:#12292B">` +
    `<p style="margin:0 0 16px">Someone applied to clean with us through raprocleaningservices.com.</p>` +
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${cells}</table>` +
    (phone
      ? `<p style="margin:16px 0 0;color:#5A6B6B">Call or text them on ` +
        `<a href="tel:${escapeHtml(phone.replace(/[^\d+]/g, ''))}" style="color:#00A896;font-weight:600">${escapeHtml(phone)}</a>` +
        ` — first to answer usually gets them.</p>`
      : '') +
    `</div>`
  )
}

/**
 * Sends one application notification. Never throws — the caller reports
 * delivery alongside the CRM result and decides what the applicant sees.
 */
export async function sendApplicationEmail(applicant: Applicant): Promise<EmailResult> {
  const to = hiringRecipients()
  if (to.length === 0) return { sent: false, error: 'No hiring notification recipients configured' }

  const mailer = mailTransport()
  if (!mailer) return { sent: false, error: 'SMTP_USER / SMTP_PASS are not configured' }

  try {
    await mailer.sendMail({
      from: process.env.MAIL_FROM || `R A Pro Cleaning Careers <${process.env.SMTP_USER}>`,
      to,
      // Replying to the notification answers the applicant directly.
      replyTo: text(applicant.email) || undefined,
      subject: applicationSubject(applicant),
      text: applicationTextBody(applicant),
      html: applicationHtmlBody(applicant),
    })
    return { sent: true, error: '' }
  } catch (err) {
    return {
      sent: false,
      error: `Application email to ${to.join(', ')} failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
    }
  }
}

// ─── THE APPLICANT'S COPY ────────────────────────────────────────────────────
// An applicant who hears nothing assumes the form is broken and applies
// somewhere else. This costs nothing and buys the day or two it takes to
// actually call them back.

export function applicantSubject(): string {
  return `We got your application — ${BUSINESS.name}`
}

export function applicantTextBody(applicant: Applicant): string {
  const first = text(applicant.name).split(/\s+/)[0] || 'there'
  return [
    `Thanks ${first} — we've got your application to clean with us.`,
    '',
    `Someone will call or text you within one business day to talk through the work, the pay and the hours. Nothing else is needed from you right now.`,
    '',
    `If you'd rather reach us first, call or text ${BUSINESS.phone}.`,
    '',
    BUSINESS.name,
    `${BUSINESS.phone} · ${BUSINESS.email}`,
    BUSINESS.site,
  ].join('\n')
}

export function applicantHtmlBody(applicant: Applicant): string {
  const first = escapeHtml(text(applicant.name).split(/\s+/)[0] || 'there')
  return (
    `<div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:15px;color:#12292B;line-height:1.6">` +
    `<p style="margin:0 0 16px">Thanks ${first} — we&rsquo;ve got your application to clean with us.</p>` +
    `<p style="margin:0 0 16px">Someone will call or text you <strong>within one business day</strong> to talk through the work, the pay and the hours. Nothing else is needed from you right now.</p>` +
    `<p style="margin:0 0 24px">If you&rsquo;d rather reach us first, call or text ` +
    `<a href="tel:7206778799" style="color:#00A896;font-weight:600">${BUSINESS.phone}</a>.</p>` +
    `<p style="margin:0;color:#5A6B6B;font-size:14px">${BUSINESS.name}<br>` +
    `${BUSINESS.phone} &middot; ${BUSINESS.email}<br>${BUSINESS.site}</p>` +
    `</div>`
  )
}

/** The applicant's acknowledgement. Never throws, and never gates the form. */
export async function sendApplicantCopy(applicant: Applicant): Promise<EmailResult> {
  const to = text(applicant.email)
  if (!to) return { sent: false, error: '' }

  const mailer = mailTransport()
  if (!mailer) return { sent: false, error: 'SMTP_USER / SMTP_PASS are not configured' }

  try {
    await mailer.sendMail({
      from: process.env.MAIL_FROM || `${BUSINESS.name} <${process.env.SMTP_USER}>`,
      to,
      replyTo: process.env.MAIL_REPLY_TO || BUSINESS.email,
      subject: applicantSubject(),
      text: applicantTextBody(applicant),
      html: applicantHtmlBody(applicant),
    })
    return { sent: true, error: '' }
  } catch (err) {
    return {
      sent: false,
      error: `Applicant copy to ${to} failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
    }
  }
}
