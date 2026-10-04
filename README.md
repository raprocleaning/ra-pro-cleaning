# R A Pro Cleaning Services — Next.js Website

Denver's premium cleaning experience. Built with Next.js 14 (App Router), Tailwind CSS, and TypeScript.

## Getting Started

### 1. Install dependencies

```bash
cd /Users/houda/ra-pro-cleaning
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
ra-pro-cleaning/
├── app/
│   ├── layout.tsx          # Root layout with Navigation, Footer, SEO & Schema
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles + Tailwind directives
│   ├── about/
│   │   └── page.tsx        # About page with team, values, checklist
│   ├── gallery/
│   │   └── page.tsx        # Gallery with filterable tabs
│   ├── contact/
│   │   └── page.tsx        # Contact page with form, map placeholder, hours
│   ├── services/
│   │   ├── page.tsx        # Services overview
│   │   └── [slug]/
│   │       └── page.tsx    # Individual service pages (9 static routes)
│   └── blog/
│       ├── page.tsx        # Blog listing
│       └── [slug]/
│           └── page.tsx    # Individual blog posts (3 static routes)
├── components/
│   ├── Navigation.tsx      # Sticky nav with scroll behavior + mobile menu
│   ├── Footer.tsx          # Dark footer with links, contact, social
│   ├── Hero.tsx            # Full-viewport hero with CTAs + trust badges
│   ├── ServicesGrid.tsx    # 9-service responsive grid
│   ├── WhyChooseUs.tsx     # Value props on dark background
│   ├── Reviews.tsx         # 4 real client reviews
│   ├── HowItWorks.tsx      # 3-step process section
│   ├── FAQ.tsx             # Accordion FAQ
│   ├── ContactForm.tsx     # Lead capture form with SMS opt-in
│   └── GallerySection.tsx  # Before/after grid section
├── hooks/
│   └── useScrollAnimation.ts  # Intersection Observer scroll animations
└── ...config files
```

---

## Key Configuration

### Contact Form (Formspree)
The contact form in `components/ContactForm.tsx` uses Formspree. To activate:
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID
3. Replace `YOUR_FORM_ID` in `ContactForm.tsx` with your actual form ID:
   ```
   https://formspree.io/f/YOUR_ACTUAL_FORM_ID
   ```

### Adding Real Photos
The hero background currently uses a CSS gradient. To replace with a real image:
1. Add your image to the `/public` folder (e.g., `/public/hero-bg.jpg`)
2. In `components/Hero.tsx`, find the comment `/* Replace bg-gradient with actual image */`
3. Replace the gradient div with:
   ```tsx
   import Image from 'next/image'
   <Image src="/hero-bg.jpg" alt="Clean home" fill className="object-cover" priority />
   ```

### Google Maps (Contact Page)
In `app/contact/page.tsx`, replace the placeholder div with your Google Maps embed:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/>
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel auto-detects Next.js — click Deploy
4. Your site will be live at `your-project.vercel.app`

To connect a custom domain:
- In Vercel dashboard → Project Settings → Domains
- Add `raprocleaningservices.com` and follow DNS instructions

### Deploy to Netlify

1. Run `npm run build` to generate the build
2. Go to [netlify.com](https://netlify.com) and drag-and-drop the `.next` folder
   OR connect your GitHub repo for automatic deployments

### Self-Hosted (VPS/Server)

```bash
npm run build
npm run start
```

Use PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "ra-pro-cleaning" -- start
pm2 startup
pm2 save
```

Use Nginx as a reverse proxy pointing to port 3000.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in what you use. See that file for
the full list with comments.

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # Google Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX        # Google Tag Manager
```

### Who gets the form submission emails

Every submission from the contact form, the booking form and the AI chat widget
is emailed to the addresses in `LEAD_NOTIFY_TO`, which defaults to
**pamela@raprocleaningservices.com**. Comma-separate the list to notify more
than one person:

```
LEAD_NOTIFY_TO=pamela@raprocleaningservices.com,ra@raprocleaningservices.com
```

For those emails to go out, the site needs a mailbox on this domain to send
from. Mail lives on Namecheap cPanel (`business108.web-hosting.com`) while the
site itself runs on Vercel, so the credentials have to be set in both places.

1. In cPanel → **Email Accounts**, create a mailbox for the website — for
   example `website@raprocleaningservices.com`. A dedicated mailbox is worth the
   two minutes: its password can be rotated without locking anybody out of their
   own email. Reusing an existing mailbox works too, as long as it is on this
   domain — the mail server will not let the site send as an outside address.
2. Set `SMTP_USER` to that full address and `SMTP_PASS` to its password, in
   `.env.local` **and** in Vercel → Project Settings → Environment Variables, so
   the live site has them too. Redeploy afterwards; these are read at boot.
3. `SMTP_HOST` and `SMTP_PORT` already default to
   `mail.raprocleaningservices.com` and 465, which is what cPanel →
   **Connect Devices** lists for this account. Only set them to override that.

Leaving `SMTP_USER` / `SMTP_PASS` blank does not break the forms — submissions
still reach the CRM and Formspree, they just are not emailed to the office
mailbox directly.

### The customer's copy

The person who books also gets an email the moment they submit — their service,
date and time, home size, add-ons and total, and what happens next. Before this
the "You're booked!" screen was the only record they had, and it was gone as
soon as they closed the tab.

The wording follows what they actually did: a booked slot is confirmed back to
them, a post-construction job says we will call with the quote instead of
claiming a total, and a plain contact-form message just acknowledges the
message. Replies go to `MAIL_REPLY_TO` (ra@ by default), not to the unattended
mailbox the site sends from. It rides on the same `SMTP_USER` / `SMTP_PASS`
above — no separate setup — and a failure is logged without disturbing the
booking.

Formspree stays on as a second, independent notification. Its recipients are
managed in the Formspree dashboard, not in this repo.

---

## Card payments (Stripe)

`/book` can take a **$50 card deposit** when the customer confirms. The balance
is due after the clean, as the Terms already say. Customers pay on Stripe's own
page, so card numbers never touch this site.

It is **off until you add two keys** — with them blank, online booking works
exactly as it always has.

### How a booking flows

1. The customer fills in `/book` and presses **Pay $50 Deposit & Book**.
2. `/api/checkout` prices the booking again from `lib/pricing.ts` — the price
   the browser showed is never trusted — and sends them to Stripe.
3. When the card clears, Stripe calls `/api/stripe-webhook`. **That is when the
   booking is made:** CRM contact tagged `deposit-paid`, the calendar slot, the
   office email and the customer's confirmation, all showing the deposit paid and
   the balance due.
4. Stripe sends them back to `/book/confirmed`, which reads the payment from
   Stripe itself so it is right even if the webhook is a second behind.

Nothing is booked until step 3, so an abandoned payment never holds a slot.
Post-construction jobs are quoted by phone and are never charged online.

### Turning it on

1. In the [Stripe Dashboard](https://dashboard.stripe.com), stay in **Test mode**.
   Under **Developers → API keys**, copy the **Secret key** (`sk_test_…`).
2. Under **Developers → Webhooks → Add endpoint**, use the URL
   `https://raprocleaningservices.com/api/stripe-webhook`, choose the event
   **`checkout.session.completed`**, and copy the endpoint's **Signing secret**
   (`whsec_…`). Also tick **`checkout.session.async_payment_succeeded`** — it only
   fires for slow payment methods, and it is what books a job paid that way.
3. In Vercel → Project Settings → Environment Variables, add
   `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`, then **redeploy**. `/book` is
   built ahead of time, so it only notices the keys after a new deploy.
4. Book a test cleaning with Stripe's test card `4242 4242 4242 4242`, any future
   expiry and any CVC. Check that you land on the "You're booked!" page, the
   contact is tagged `deposit-paid`, the slot is on the calendar, and both emails
   arrive.
5. To go live, repeat steps 1–3 in **Live mode** (the live key and a live-mode
   webhook with its own signing secret), replace the two variables, and redeploy.

To switch it off again, delete `STRIPE_SECRET_KEY` and redeploy.

### Cards only

The site asks Stripe for card payments only, but Stripe also applies the methods
switched on in its own settings, and may offer Link, Klarna or bank payments
anyway. Bank payments take days to clear, so turn them off: in the Dashboard go
to **Settings → Payment methods** and leave only **Cards** on — in the sandbox
and again in the live account. If a slow method is ever used regardless, the
webhook books the job when it clears (that is what
`checkout.session.async_payment_succeeded` is for) and the confirmation page says
the payment is processing instead of claiming it failed.

### Good to know

- **The amount** is `DEPOSIT_DOLLARS` in `lib/deposit.ts`. A job cheaper than the
  deposit is charged its own price instead.
- **Abandoned payments.** Someone who types in their details and leaves Stripe's
  page is saved in the CRM as a lead tagged `deposit-pending`. If that contact
  never gets `deposit-paid`, they dropped out at payment — worth a call.
- **A paid booking that fails to save** (CRM and email both down) makes the
  webhook return an error, and Stripe keeps retrying for days. Failed deliveries
  show under Developers → Webhooks, where they can also be resent by hand.
- **Shared Stripe account.** The webhook only acts on payments this site started,
  so other tools on the same Stripe account (HighLevel, for instance) are ignored.
- **Refunds and cancellations** are done by hand in the Stripe Dashboard; nothing
  is automatic. The Terms page does not yet say whether the deposit is
  refundable — that is a policy call for the business.

---

## Knowing where leads come from

GA4 (`G-50JSSQ15K6`) reports traffic by channel, but a dashboard cannot tell you
that *this* booking — the one in the inbox right now — came from the Google
Business Profile. So the site captures the campaign tags when a visitor first
lands, carries them across the visit, and prints them on the lead itself.

A lead email now ends with:

```
Submitted from: Online Booking Form
Came from: google-business-profile / organic — website-link
Landed on: /areas/denver
```

`Submitted from` is which form they filled in. `Came from` is the marketing
channel that produced them. The CRM contact also gets a `src-...` tag, so the
channel is filterable there.

### Link tagging

For any of this to say anything useful, the links you control have to be
tagged. Paste these in place of the plain URLs:

| Where | URL to use |
| :--- | :--- |
| Business Profile -> website | `https://raprocleaningservices.com/?utm_source=google-business-profile&utm_medium=organic&utm_campaign=website-link` |
| Business Profile -> bookings | `https://raprocleaningservices.com/book?utm_source=google-business-profile&utm_medium=organic&utm_campaign=booking-button` |
| A Google Post | `https://raprocleaningservices.com/?utm_source=google-business-profile&utm_medium=organic&utm_campaign=post-<topic>` |
| Instagram bio | `https://raprocleaningservices.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| Facebook page | `https://raprocleaningservices.com/?utm_source=facebook&utm_medium=social&utm_campaign=page` |

Only `utm_source` is required; the rest add detail. Untagged visits still get a
sensible label from the referrer (`Referred by facebook.com`) or fall back to
`Direct or untagged`, and Google Ads clicks are recognised by their `gclid`
whether or not the link was tagged.

### How it behaves

- **First touch wins.** Someone who lands on `/areas/denver` from the Business
  Profile and clicks through to `/book` is still credited to the Business
  Profile — a later page view never overwrites what was captured on arrival.
- **It is per-visit, not permanent.** The tags live in `sessionStorage` and are
  gone when the tab closes. Nothing is stored on a visitor who never submits a
  form, and nothing leaves the browser until they submit one themselves.
- **It never blocks a booking.** If storage is unavailable — private browsing,
  blocked site data — the lead submits exactly as before, just without a
  channel line.

See `lib/attribution.ts`.

---

## Business Information

- **Business:** R A Pro Cleaning Services LLC
- **Phone:** 720-677-8799 (call & text)
- **Email:** ra@raprocleaningservices.com
- **Service area:** Denver, Aurora & the surrounding metro (no public street address)
- **Booking:** https://link.msgsndr.com/widget/booking/a9pioIsReFA47or9v8G3
- **Instagram:** https://www.instagram.com/raprocleaningservice/
- **Facebook:** https://www.facebook.com/share/16NnxD6cYf/

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3
- **Language:** TypeScript
- **Animations:** CSS transitions + Intersection Observer API
- **Fonts:** Inter (Google Fonts)
- **Forms:** GoHighLevel CRM + SMTP notification email, with Formspree as a backup notifier
- **SEO:** Native Next.js Metadata API + LocalBusiness JSON-LD schema
