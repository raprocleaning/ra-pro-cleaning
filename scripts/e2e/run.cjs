// End-to-end check of every website workflow — enquiries, newsletter, chat,
// booking, cleaner assignment, Stripe deposits, the BookingKoala webhook —
// against the real API routes, with HighLevel, Stripe, Formspree and the mail
// server answered locally (stub.cjs, smtp.cjs). Nothing leaves this machine:
// any outbound call the stub does not recognise is refused, not sent.
//
// Usage: npm run build && npm run test:e2e
const { spawn } = require('child_process'), fs = require('fs'), os = require('os'), path = require('path')
const REPO = process.argv[2] || path.resolve(__dirname, '../..'), H = __dirname
const W = path.join(os.tmpdir(), 'ra-pro-e2e')
fs.rmSync(W, { recursive: true, force: true }); fs.mkdirSync(W)
const Stripe = require(path.join(REPO, 'node_modules/stripe'))
const LOG = path.join(W, 'calls.log'), STATE = path.join(W, 'state.json'), MAIL = path.join(W, 'mail.log')
const setState = (s) => fs.writeFileSync(STATE, JSON.stringify(s))
const calls = () => fs.existsSync(LOG) ? fs.readFileSync(LOG, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : []
const mails = () => fs.existsSync(MAIL) ? fs.readFileSync(MAIL, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : []
const reset = () => { for (const f of [LOG, MAIL]) fs.rmSync(f, { force: true }); setState({}) }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const WHSEC = 'whsec_test_harness'
const BOOKING_SECRET = 'bk_secret_harness'

const results = []
const check = (name, ok, detail) => { results.push({ name, ok: !!ok }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${!ok && detail ? `\n      ${detail}` : ''}`) }

function start(port, extraEnv) {
  const env = {
    ...process.env, PORT: String(port), NODE_OPTIONS: `--require ${path.join(H, 'stub.cjs')}`,
    STUB_LOG: LOG, STUB_STATE: STATE, GHL_API_KEY: 'test-key', GHL_LOCATION_ID: 'loc_test',
    SMTP_HOST: '127.0.0.1', SMTP_PORT: '2525', SMTP_SECURE: 'false', SMTP_USER: 'website@test', SMTP_PASS: 'x',
    LEAD_NOTIFY_TO: 'office@test', BOOKING_WEBHOOK_SECRET: BOOKING_SECRET, ...extraEnv,
  }
  const p = spawn(path.join(REPO, 'node_modules/.bin/next'), ['start', '-p', String(port)], { cwd: REPO, env, stdio: ['ignore', 'pipe', 'pipe'] })
  p.stdout.on('data', (d) => fs.appendFileSync(path.join(W, `server-${port}.log`), d))
  p.stderr.on('data', (d) => fs.appendFileSync(path.join(W, `server-${port}.log`), d))
  return p
}
async function ready(port) { for (let i = 0; i < 60; i++) { try { await fetch(`http://localhost:${port}/robots.txt`); return } catch { await sleep(500) } } throw new Error('server did not start') }
const post = async (port, p, body, headers = {}) => {
  const r = await fetch(`http://localhost:${port}${p}`, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) })
  return { status: r.status, json: await r.json().catch(() => ({})) }
}
const tomorrowPlus = (n) => { const d = new Date(Date.now() + (n + 1) * 86400000); return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Denver' }).format(d) }
const ghl = (path) => calls().filter((c) => c.host === 'services.leadconnectorhq.com' && c.path.startsWith(path))
const apptBody = () => { const a = ghl('/calendars/events/appointments'); return a.length ? JSON.parse(a[a.length - 1].body) : null }
const notes = () => ghl('/contacts/').filter((c) => c.path.endsWith('/notes')).map((c) => JSON.parse(c.body).body)

const booking = (over = {}) => ({
  source: 'booking-form', fullName: 'Test Customer', phone: '720-555-0100', email: 'test.customer@example.com',
  zipCode: '80202', address: '1 Test St', service: 'Standard Cleaning', sqft: '1,000 – 1,249 sq ft', frequency: 'One-Time',
  price: 250, quoteOnRequest: false, extras: [], bookingDate: tomorrowPlus(2), bookingTime: '10:00 AM',
  preferredDate: `${tomorrowPlus(2)} at 10:00 AM`, message: '', smsOptIn: true, smsMarketingOptIn: false, ...over,
})

;(async () => {
  const smtp = spawn('node', [path.join(H, 'smtp.cjs'), MAIL, '2525'], { stdio: 'inherit' })
  const A = 3101, B = 3102
  const a = start(A, {}), b = start(B, { STRIPE_SECRET_KEY: 'sk_test_harness', STRIPE_WEBHOOK_SECRET: WHSEC })
  try {
    await ready(A); await ready(B)

    console.log('\n— Website inquiries —')
    reset()
    let r = await post(A, '/api/contact', { fullName: 'Jane Doe', phone: '7205550101', email: 'Jane@Example.com', zipCode: '80202', propertyType: 'House', message: 'Quote please', smsOptIn: false })
    check('contact form accepted', r.status === 200 && r.json.ok, JSON.stringify(r))
    check('contact saved to CRM (upsert, email lower-cased)', ghl('/contacts/upsert').some((c) => JSON.parse(c.body).email === 'jane@example.com'))
    check('note added to contact', notes().some((n) => n.includes('Contact Form')))
    check('office + customer emails sent', mails().length === 2, JSON.stringify(mails().map((m) => m.to)))
    check('no calendar slot for a plain enquiry', !apptBody())

    reset()
    r = await post(A, '/api/contact', { fullName: 'Newsletter Signup', email: 'reader@example.com', message: 'Newsletter signup', propertyType: 'Newsletter' })
    check('footer newsletter signup accepted', r.status === 200 && r.json.ok, JSON.stringify(r))
    const nl = ghl('/contacts/upsert')[0]
    check('newsletter contact tagged newsletter, not named "Newsletter Signup"', nl && JSON.parse(nl.body).tags.includes('newsletter') && JSON.parse(nl.body).firstName !== 'Newsletter', nl && nl.body)
    check('no booking confirmation sent to a newsletter reader', !mails().some((m) => m.to.some((t) => t.includes('reader@'))))

    reset()
    r = await post(A, '/api/contact', { fullName: 'Chat Lead', phone: '7205550102', email: 'chat@example.com', source: 'ai-chat', service: 'Deep Cleaning', sqft: '1,500', price: 380, preferredDate: 'Next Friday', smsOptIn: true })
    check('chat lead accepted and tagged ai-booking', r.status === 200 && JSON.parse(ghl('/contacts/upsert')[0].body).tags.includes('ai-booking'))

    console.log('\n— Booking, scheduling, cleaner assignment —')
    reset()
    r = await post(A, '/api/contact', booking())
    const ap = apptBody()
    check('booking accepted', r.status === 200 && r.json.ok, JSON.stringify(r))
    check('appointment placed on the Standard calendar', ap && ap.calendarId === 'cal_std', JSON.stringify(ap))
    check('appointment in Denver time', ap && /T10:00:00-0[67]:00$/.test(ap.startTime), ap && ap.startTime)
    check('appointment assigned to a cleaner', ap && ap.assignedUserId, JSON.stringify(ap))
    check('booking confirmation email to customer', mails().some((m) => m.to.some((t) => t.includes('test.customer@')) && /got your booking/.test(m.raw)))

    reset()
    const d = tomorrowPlus(2)
    setState({ events: [{ id: 'e1', calendarId: 'cal_std', assignedUserId: 'u_ana', startTime: `${d}T09:00:00-06:00`, endTime: `${d}T12:00:00-06:00` }] })
    r = await post(A, '/api/contact', booking())
    check('second cleaner gets the job when the first is already booked then', apptBody()?.assignedUserId === 'u_bea', JSON.stringify(apptBody()))

    reset()
    setState({ events: [
      { id: 'e1', assignedUserId: 'u_ana', startTime: `${d}T09:00:00-06:00`, endTime: `${d}T12:00:00-06:00` },
      { id: 'e2', assignedUserId: 'u_bea', startTime: `${d}T10:30:00-06:00`, endTime: `${d}T13:30:00-06:00` },
    ] })
    r = await post(A, '/api/contact', booking())
    check('every cleaner busy: still booked, and flagged on the contact', r.json.ok && apptBody() && notes().some((n) => /overlap|double-booked|already booked/i.test(n)), JSON.stringify(notes()))
    check('every cleaner busy: office email warns about the clash', mails().some((m) => m.to.some((t) => t.includes('office@')) && /clash|overlap|double/i.test(m.raw)))

    reset(); setState({ eventsFail: true })
    r = await post(A, '/api/contact', booking())
    check('calendar unreadable: booking still placed with first cleaner', apptBody()?.assignedUserId === 'u_ana', JSON.stringify(apptBody()))

    reset()
    r = await post(A, '/api/contact', booking({ service: 'Post-Construction Cleaning', price: null, quoteOnRequest: true }))
    check('post-construction request: no slot taken, tagged needs-quote', r.json.ok && !apptBody() && JSON.parse(ghl('/contacts/upsert')[0].body).tags.includes('needs-quote'))

    reset(); setState({ ghlDown: true })
    r = await post(A, '/api/contact', booking())
    check('CRM down: booking still emailed to office, customer told OK', r.status === 200 && r.json.ok && r.json.crmSaved === false && mails().length >= 1, JSON.stringify(r))

    console.log('\n— Card deposit (Stripe) —')
    reset()
    r = await post(B, '/api/contact', booking())
    check('direct booking blocked while deposits are on (402)', r.status === 402)
    r = await post(B, '/api/checkout', booking())
    check('checkout returns a Stripe payment page', r.status === 200 && /checkout\.stripe\.com/.test(r.json.url || ''), JSON.stringify(r))
    check('abandoned-checkout lead saved (deposit-pending)', ghl('/contacts/upsert').some((c) => JSON.parse(c.body).tags.includes('deposit-pending')))
    const sess = JSON.parse(fs.readFileSync(STATE + '.session', 'utf8'))
    check('deposit is $50 and price re-computed server-side', sess.amount === 5000 && sess.metadata.ra_total === '250', JSON.stringify(sess).slice(0, 200))
    r = await post(B, '/api/checkout', booking({ price: 1 , sqft: '4,800 – 4,999 sq ft' }))
    check('tampered browser price ignored', JSON.parse(fs.readFileSync(STATE + '.session', 'utf8')).metadata.ra_total === '800')

    const event = (type, paid = true) => JSON.stringify({ id: 'evt_1', object: 'event', type, data: { object: {
      id: 'cs_test_1', object: 'checkout.session', payment_status: paid ? 'paid' : 'unpaid', amount_total: 5000,
      payment_intent: 'pi_1', metadata: sess.metadata } } })
    const signed = (payload, secret = WHSEC) => ({ 'stripe-signature': Stripe.webhooks.generateTestHeaderString({ payload, secret }) })
    reset()
    let p = event('checkout.session.completed'); r = await post(B, '/api/stripe-webhook', p, signed(p, 'whsec_wrong'))
    check('webhook with bad signature rejected', r.status === 400)
    reset(); r = await post(B, '/api/stripe-webhook', p, signed(p))
    check('paid webhook books the job', r.status === 200 && r.json.booked && apptBody(), JSON.stringify(r))
    check('paid booking tagged deposit-paid', ghl('/contacts/upsert').some((c) => JSON.parse(c.body).tags.includes('deposit-paid')))
    check('customer email shows deposit + balance', mails().some((m) => m.to.some((t) => t.includes('test.customer@')) && /deposit/i.test(m.raw) && /\$750|\$200/.test(m.raw)))
    reset(); setState({ piMeta: { ra_booked: '1' } }); r = await post(B, '/api/stripe-webhook', p, signed(p))
    check('duplicate Stripe delivery does not double-book', r.json.duplicate && !apptBody())
    reset(); p = event('checkout.session.completed', false); r = await post(B, '/api/stripe-webhook', p, signed(p))
    check('unpaid session not booked', r.status === 200 && !apptBody())

    console.log('\n— Legacy BookingKoala webhook —')
    reset()
    const bk = { customer_first_name: 'Rep', customer_last_name: 'Eat', customer_email: 'repeat@example.com', customer_phone: '7205550199', service_type: 'Standard Cleaning', square_footage: 1100 }
    r = await post(A, '/api/booking-webhook', bk)
    check('BookingKoala webhook without the secret rejected', r.status === 401, JSON.stringify(r))
    r = await post(A, `/api/booking-webhook?secret=${BOOKING_SECRET}`, bk)
    check('BookingKoala booking saved', r.status === 200 && r.json.ok, JSON.stringify(r))
    r = await post(A, `/api/booking-webhook?secret=${BOOKING_SECRET}`, bk)
    check('BookingKoala repeat customer saved (no duplicate-contact error)', r.status === 200 && r.json.ok, JSON.stringify(r))

    console.log('\n— Diagnostics —')
    r = await fetch(`http://localhost:${A}/api/calendar-check`).then(async (x) => ({ status: x.status, json: await x.json() }))
    check('calendar-check maps every priced service', r.json.mapping?.every((m) => !String(m.calendar).includes('NO MATCH')), JSON.stringify(r.json))
    check('calendar-check never leaks calendar IDs', !JSON.stringify(r.json).includes('cal_'))
  } catch (e) { console.error(e); check('harness ran', false, e.message) }
  finally {
    a.kill(); b.kill(); smtp.kill()
    const failed = results.filter((x) => !x.ok).length
    console.log(`\n${results.length - failed}/${results.length} passed`)
    process.exit(failed ? 1 : 0)
  }
})()
