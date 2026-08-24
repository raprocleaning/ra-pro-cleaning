/**
 * Emails every website form submission straight to the office mailbox.
 *
 * Form notifications used to depend entirely on Formspree, which decides its
 * own recipients in a dashboard nobody here controls — so adding a person to
 * the notification list was not something the site could do. This sends the
 * same lead over SMTP to whatever addresses are configured, which means a new
 * recipient is a configuration change instead of a support ticket.
 *
 * Delivery is best effort on purpose. The lead is already saved in the CRM by
 * the time this runs, so a mail server that is down or misconfigured must never
 * turn a booking into an error page for the customer.
 */

import nodemailer, { type Transporter } from 'nodemailer'

/** Where lead notifications go when nothing overrides it. */
const DEFAULT_RECIPIENTS = 'pamela@raprocleaningservices.com'

/** cPanel serves the domain's mail, so the mail host follows the domain. */
const DEFAULT_HOST = 'mail.raprocleaningservices.com'

export type Lead = {
  name: string
  phone: string
  email: string
  source: string
  service?: string
  sqft?: string | number
  frequency?: string
  price?: string | number
  extras?: string[] | string
  preferredDate?: string
  address?: string
  zip?: string
  message?: string
  smsOptIn?: boolean
}

export type EmailResult = { sent: boolean; error: string }

/** Addresses the notification is sent to, in configuration order. */
export function notifyRecipients(): string[] {
  return (process.env.LEAD_NOTIFY_TO || DEFAULT_RECIPIENTS)
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)
}

const text = (value: unknown): string =>
  value === undefined || value === null || value === '' ? '' : String(value).trim()

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * The lead as a list of labelled rows, so the plain-text and HTML bodies stay
 * in step with each other. Empty fields are dropped rather than printed blank.
 */
function rows(lead: Lead): Array<[string, string]> {
  const extras = Array.isArray(lead.extras) ? lead.extras.join(', ') : text(lead.extras)
  const price = text(lead.price)

  const all: Array<[string, string]> = [
    ['Name', text(lead.name)],
    ['Phone', text(lead.phone)],
    ['Email', text(lead.email)],
    ['Service', text(lead.service)],
    ['Square footage', text(lead.sqft)],
    ['Frequency', text(lead.frequency)],
    ['Quoted total', price ? (price.startsWith('$') ? price : `$${price}`) : 'Custom quote'],
    ['Extras', extras],
    ['Requested date', text(lead.preferredDate)],
    ['Address', text(lead.address)],
    ['Zip', text(lead.zip)],
    ['Notes', text(lead.message)],
    ['SMS opt-in', lead.smsOptIn === undefined ? '' : lead.smsOptIn ? 'Yes' : 'No'],
    ['Submitted from', text(lead.source)],
  ]

  return all.filter(([, value]) => value !== '')
}

export function leadSubject(lead: Lead): string {
  const service = text(lead.service)
  const who = text(lead.name) || text(lead.email) || 'New lead'
  return `New ${text(lead.source) || 'website'} lead: ${who}${service ? ` — ${service}` : ''}`
}

export function leadTextBody(lead: Lead): string {
  const body = rows(lead)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
  return `A new submission came in from raprocleaningservices.com.\n\n${body}\n`
}

export function leadHtmlBody(lead: Lead): string {
  const cells = rows(lead)
    .map(
      ([label, value]) =>
        `<tr>` +
        `<td style="padding:6px 12px 6px 0;color:#5A6B6B;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;color:#12292B;font-weight:600">${escapeHtml(value).replace(/\n/g, '<br>')}</td>` +
        `</tr>`
    )
    .join('')

  return (
    `<div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:15px;color:#12292B">` +
    `<p style="margin:0 0 16px">A new submission came in from raprocleaningservices.com.</p>` +
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${cells}</table>` +
    `</div>`
  )
}

/** A transporter is only built once configuration is complete. */
function transport(): Transporter | null {
  const host = process.env.SMTP_HOST || DEFAULT_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) return null

  const port = Number(process.env.SMTP_PORT || 465)
  return nodemailer.createTransport({
    host,
    port,
    // 465 is implicit TLS; 587 opens plain and upgrades with STARTTLS.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: { user, pass },
  })
}

/**
 * Sends one lead notification. Never throws — the caller reports delivery
 * alongside the CRM result and decides what the customer sees.
 */
export async function sendLeadEmail(lead: Lead): Promise<EmailResult> {
  const to = notifyRecipients()
  if (to.length === 0) return { sent: false, error: 'No lead notification recipients configured' }

  const mailer = transport()
  if (!mailer) return { sent: false, error: 'SMTP_USER / SMTP_PASS are not configured' }

  try {
    await mailer.sendMail({
      from: process.env.MAIL_FROM || `R A Pro Cleaning Website <${process.env.SMTP_USER}>`,
      to,
      // Replying to the notification answers the customer directly.
      replyTo: text(lead.email) || undefined,
      subject: leadSubject(lead),
      text: leadTextBody(lead),
      html: leadHtmlBody(lead),
    })
    return { sent: true, error: '' }
  } catch (err) {
    return {
      sent: false,
      error: `Lead email to ${to.join(', ')} failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
    }
  }
}
