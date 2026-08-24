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

## Business Information

- **Business:** R A Pro Cleaning Services LLC
- **Phone:** 720-677-8799 (call & text)
- **Email:** ra@raprocleaningservices.com
- **Address:** 1325 S Colorado Blvd, Denver, CO 80222
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
