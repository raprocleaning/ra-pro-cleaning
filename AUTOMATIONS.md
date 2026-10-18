# How the business runs itself — status sheet

Last checked: October 18, 2026. Every "Working" row below was proven by
`npm run build && npm run test:e2e`. That test runs the real website code
against fake copies of HighLevel, Stripe, Formspree and the mail server, so no
real customer is ever contacted.

## The whole system on one line

**Website form → HighLevel contact + note → calendar appointment (with a cleaner
assigned) → email to the office + email to the customer → HighLevel workflows do
the reminders, review request and final invoice.**

## Status of each step

| Step | Where it lives | Status |
| :--- | :--- | :--- |
| Contact form enquiry | Website → HighLevel | ✅ Working |
| Footer newsletter signup | Website → HighLevel | ✅ **Fixed** — every signup used to be rejected |
| Chat assistant lead | Website → HighLevel | ✅ Working |
| Online booking `/book` | Website → HighLevel calendar | ✅ Working |
| $50 card deposit | Website → Stripe → HighLevel | ✅ Working (turns on once the Stripe keys are added) |
| Abandoned payment lead (`deposit-pending`) | Website → HighLevel | ✅ Working |
| Booking confirmation email to customer | Website (SMTP) | ✅ Working (needs `SMTP_USER` / `SMTP_PASS`) |
| New-lead email to office | Website (SMTP + Formspree) | ✅ Working |
| Cleaner assignment | Website → HighLevel calendar | ✅ **Improved** — see below |
| Double-booking warning | Website → HighLevel note + office email | ✅ **New** |
| Earliest bookable date | Booking form | ✅ **Fixed** — evening visitors couldn't pick tomorrow |
| BookingKoala webhook | Website → HighLevel | ✅ **Fixed** — repeat customers failed; now can be locked with a secret |
| Lead follow-up texts | HighLevel workflow | ⚙️ Set up in HighLevel (recipe 1) |
| Appointment reminders | HighLevel workflow | ⚙️ Set up in HighLevel (recipe 2) |
| Review request after the clean | HighLevel workflow | ⚙️ Set up in HighLevel (recipe 3) |
| Invoice for the balance | HighLevel Payments | ⚙️ Set up in HighLevel (recipe 4) |

### What changed with cleaner assignment

Before: every job went to the **first** cleaner on the calendar, even when she
was already booked and another cleaner was free.

Now: the site looks at each cleaner's day in HighLevel and gives the job to
someone who is **free at that time** (the least busy one, if several are free).
If **everyone** is already booked, the job is still saved, but:

- the contact gets a note: `⚠️ SCHEDULE CLASH — … Move one of the jobs or reassign it.`
- the office gets an email titled `⚠️ Schedule clash: <customer>`

So call that customer before confirming the time.

## Why reminders, reviews and invoices are in HighLevel, not the website

The appointment, the contact and the phone number all live in HighLevel, and
HighLevel already has reminders, review requests and invoices built in. Building
a second copy in the website would mean two systems texting the same customer.
So the website's job is to hand HighLevel clean data with the right **tags**,
and HighLevel's workflows do the rest.

The website adds these tags automatically:

| Tag | Means |
| :--- | :--- |
| `website-lead` | Came in through any website form |
| `online-booking`, `booked-appointment` | Booked a slot on `/book` |
| `deposit-paid` | Paid the $50 deposit |
| `deposit-pending` | Started paying but left — call them |
| `needs-quote` | Post-construction job, needs a price by phone |
| `sms-opt-in` | Agreed to reminder texts — **only text people with this tag** |
| `sms-marketing-opt-in` | Agreed to offer texts |
| `phone-calls-only` | Did not agree to texts |
| `newsletter` | Footer newsletter signup |

## HighLevel recipes (about 10 minutes each)

In HighLevel go to **Automation → Workflows → Create Workflow → Start from scratch**.

### 1. Lead follow-up

- **Trigger:** Contact Tag added → `website-lead`
- **Filter:** tag does **not** include `booked-appointment`
- **If/Else:** has tag `sms-opt-in`
  - Yes → **Send SMS:** "Hi {{contact.first_name}}, thanks for reaching out to R A Pro Cleaning! Want us to get you on the schedule? Reply here or call (720) 677-8799. Reply STOP to opt out."
  - No → **Create task** for the office: "Call {{contact.first_name}} back"
- **Wait** 1 day → if still no `booked-appointment` tag, send one follow-up email.

Also make one for `deposit-pending`: wait 2 hours; if no `deposit-paid` tag, create a task to call.

### 2. Appointment reminders

- **Trigger:** Customer Booked Appointment (choose all cleaning calendars)
  - Note: the website books with HighLevel's own confirmation turned off, because we call within 24 hours.
- **Wait:** until 1 day before the appointment start time
- **If/Else:** has tag `sms-opt-in` → **Send SMS:** "Reminder: your R A Pro cleaning is tomorrow at {{appointment.start_time}}. Need to change it? Call (720) 677-8799."
- Otherwise → **Send Email** with the same words.

### 3. Review request

- **Trigger:** Appointment Status → **Showed**
- **Wait:** 2 hours
- **Send Review Request** (or SMS/email with your Google review link) — SMS only if tag `sms-opt-in`.
- Mark appointments as **Showed** after each clean; that is what starts this.

### 4. Invoice for the balance

Each booking's contact note shows the total, the deposit paid and the
**balance due after the cleaning**.

- **Payments → Invoices → New**, pick the contact, enter the balance, **Send**
  (HighLevel lets them pay by card through the same Stripe account).
- To automate the reminder to do it: in recipe 3, add **Create task:** "Send
  balance invoice to {{contact.first_name}}".

## Things to consolidate (your call — nothing removed)

1. **Two booking paths.** `/book` (prices + deposit) and the HighLevel booking
   link in the README (no deposit). Customers on the HighLevel link skip the
   deposit. Pick one for your Google Business Profile and ads — `/book` is the
   one that takes deposits and assigns cleaners.
2. **Two office emails per lead.** SMTP and Formspree both send one, on purpose,
   as a backup. Once SMTP is confirmed working on the live site, you can turn
   Formspree off by setting `FORMSPREE_ENDPOINT` to an empty Formspree form, or
   leave it.
3. **BookingKoala.** If you no longer use BookingKoala, delete its webhook in
   BookingKoala. If you still do, set `BOOKING_WEBHOOK_SECRET` in Vercel and
   change the webhook URL there to
   `https://raprocleaningservices.com/api/booking-webhook?secret=<the same value>`.

## Checks you can run on the live site

- `https://raprocleaningservices.com/api/calendar-check` — shows whether every
  service finds its HighLevel calendar and whether the API key can make
  appointments. Shows names only, never IDs or keys.
