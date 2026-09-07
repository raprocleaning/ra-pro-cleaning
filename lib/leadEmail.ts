/**
 * Emails every website form submission straight to the office mailbox, and
 * sends the customer their own copy.
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

/** What the customer sees signed at the bottom of their confirmation. */
const BUSINESS = {
  name:  'R A Pro Cleaning Services',
  phone: '(720) 677-8799',
  tel:   '7206778799',
  email: 'ra@raprocleaningservices.com',
  site:  'raprocleaningservices.com',
}

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
  /** A slot was chosen, rather than a general enquiry. */
  hasSlot?: boolean
  /** The customer was shown a price, rather than being quoted by phone. */
  hasPrice?: boolean
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

/**
 * A transporter is only built once configuration is complete.
 *
 * Exported so the applicant mailer sends from the same mailbox with the same
 * timeouts — one place to fix when the hosting mail settings change.
 */
export function mailTransport(): Transporter | null {
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
    // A customer is waiting on this request. An unreachable mail server hangs
    // rather than refusing, so give up quickly and let the form finish — the
    // lead is in the CRM either way, and a slow booking page loses the booking.
    // Kept well inside the hosting platform's request limit, so a mail problem
    // never turns into a timed-out request with no answer for the customer.
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 8000,
  })
}

/**
 * Sends one lead notification. Never throws — the caller reports delivery
 * alongside the CRM result and decides what the customer sees.
 */
export async function sendLeadEmail(lead: Lead): Promise<EmailResult> {
  const to = notifyRecipients()
  if (to.length === 0) return { sent: false, error: 'No lead notification recipients configured' }

  const mailer = mailTransport()
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

// ─── THE CUSTOMER'S COPY ─────────────────────────────────────────────────────
// Until now the "You're booked!" screen was the only record a customer had of
// their booking, and it was gone as soon as they closed the tab — nothing to
// check the time against, nothing to reply to, and no proof we heard them.

export function customerSubject(lead: Lead): string {
  const service = text(lead.service)
  if (lead.hasSlot) return `We've got your booking${service ? ` — ${service}` : ''}`
  return `Thanks for reaching out — ${BUSINESS.name}`
}

/** The booking as the customer chose it, for their own records. */
function customerRows(lead: Lead): Array<[string, string]> {
  if (!lead.hasSlot) return []

  const extras = Array.isArray(lead.extras) ? lead.extras.join(', ') : text(lead.extras)
  const price = text(lead.price)

  return ([
    ['Service', text(lead.service)],
    ['Date & time', text(lead.preferredDate)],
    ['Home size', text(lead.sqft)],
    ['How often', text(lead.frequency)],
    ['Add-ons', extras],
    ['Address', text(lead.address)],
    ['Your total', lead.hasPrice && price ? (price.startsWith('$') ? price : `$${price}`) : ''],
  ] as Array<[string, string]>).filter(([, value]) => value !== '')
}

/** Only a booking can be changed or cancelled; an enquiry just gets a reply. */
function closingLine(lead: Lead): string {
  return lead.hasSlot
    ? 'Need to change or cancel? Just reply to this email or give us a call.'
    : 'Questions in the meantime? Just reply to this email or give us a call.'
}

/** What we promise on the confirmation screen, repeated here so it matches. */
function nextStep(lead: Lead): string {
  if (!lead.hasSlot) {
    return `We'll get back to you within 24 hours. If it's urgent, call or text ${BUSINESS.phone}.`
  }
  return lead.hasPrice
    ? `We'll call you within 24 hours to confirm the details. Nothing is charged now — your total is due after the clean.`
    : `We'll call you within 24 hours with your quote and to confirm the time. Nothing is charged now.`
}

export function customerTextBody(lead: Lead): string {
  const first = text(lead.name).split(/\s+/)[0] || 'there'
  const opening = lead.hasSlot
    ? `Thanks ${first} — we've got your booking. Here's what you chose:`
    : `Thanks ${first} — we've got your message.`

  const details = customerRows(lead)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')

  return [
    opening,
    details ? `\n${details}\n` : '',
    nextStep(lead),
    '',
    `${BUSINESS.name}`,
    `${BUSINESS.phone} · ${BUSINESS.email}`,
    BUSINESS.site,
    '',
    closingLine(lead),
  ].join('\n')
}

export function customerHtmlBody(lead: Lead): string {
  const first = escapeHtml(text(lead.name).split(/\s+/)[0] || 'there')
  const opening = lead.hasSlot
    ? `Thanks ${first} — we've got your booking. Here's what you chose:`
    : `Thanks ${first} — we've got your message.`

  const cells = customerRows(lead)
    .map(
      ([label, value]) =>
        `<tr>` +
        `<td style="padding:7px 16px 7px 0;color:#4A6583;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>` +
        `<td style="padding:7px 0;color:#0F2240;font-weight:600">${escapeHtml(value).replace(/\n/g, '<br>')}</td>` +
        `</tr>`
    )
    .join('')

  return (
    `<div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:15px;color:#0F2240;line-height:1.6">` +
      `<p style="margin:0 0 18px">${opening}</p>` +
      // Padding on a <table> is dropped by several mail clients, so the panel
      // is a wrapping div and the table just holds the rows.
      (cells
        ? `<div style="background:#F5FAFA;border:1px solid #B2DFDB;border-radius:12px;padding:14px 20px;margin:0 0 18px">` +
            `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${cells}</table>` +
          `</div>`
        : '') +
      `<p style="margin:0 0 22px">${escapeHtml(nextStep(lead))}</p>` +
      `<p style="margin:0;color:#4A6583;font-size:13px">` +
        `<strong style="color:#0F2240">${BUSINESS.name}</strong><br>` +
        `<a href="tel:${BUSINESS.tel}" style="color:#00A896;text-decoration:none">${BUSINESS.phone}</a> · ` +
        `<a href="mailto:${BUSINESS.email}" style="color:#00A896;text-decoration:none">${BUSINESS.email}</a><br>` +
        `<a href="https://${BUSINESS.site}" style="color:#00A896;text-decoration:none">${BUSINESS.site}</a>` +
      `</p>` +
      `<p style="margin:18px 0 0;color:#4A6583;font-size:12px">${escapeHtml(closingLine(lead))}</p>` +
    `</div>`
  )
}

/**
 * Sends the customer their copy. Their booking is already made either way, so
 * a failure here is reported and dropped rather than surfaced to them.
 */
export async function sendCustomerEmail(lead: Lead): Promise<EmailResult> {
  const to = text(lead.email)
  if (!to.includes('@')) return { sent: false, error: 'No customer email address' }

  const mailer = mailTransport()
  if (!mailer) return { sent: false, error: 'SMTP_USER / SMTP_PASS are not configured' }

  try {
    await mailer.sendMail({
      from: process.env.MAIL_FROM || `${BUSINESS.name} <${process.env.SMTP_USER}>`,
      to,
      // A reply goes to the office, not to the unattended sending mailbox.
      replyTo: process.env.MAIL_REPLY_TO || BUSINESS.email,
      subject: customerSubject(lead),
      text: customerTextBody(lead),
      html: customerHtmlBody(lead),
    })
    return { sent: true, error: '' }
  } catch (err) {
    return {
      sent: false,
      error: `Customer confirmation to ${to} failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
    }
  }
}
