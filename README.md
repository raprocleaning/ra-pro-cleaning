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

No environment variables are required for the basic setup. If you add integrations later:

Create a `.env.local` file at the project root:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # Google Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX        # Google Tag Manager
```

---

## Business Information

- **Business:** R A Pro Cleaning Services LLC
- **Phone:** 720-371-1779 (primary) / 720-677-8799 (SMS)
- **Email:** ra@raprocleaningservices.com
- **Address:** 6110 E Colfax Ave, Suite 4 #188, Denver, CO 80220
- **Booking:** https://raprocleaningservices.bookingkoala.com
- **Instagram:** https://www.instagram.com/raprocleaningservice/
- **Facebook:** https://www.facebook.com/share/16NnxD6cYf/

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3
- **Language:** TypeScript
- **Animations:** CSS transitions + Intersection Observer API
- **Fonts:** Inter (Google Fonts)
- **Forms:** Formspree (replace endpoint)
- **SEO:** Native Next.js Metadata API + LocalBusiness JSON-LD schema
