// Preloaded into the Next server: answers every outside API call locally and
// records it, so the real routes run end to end with no live traffic.
const fs = require('fs')
const LOG = process.env.STUB_LOG
const STATE = process.env.STUB_STATE
const realFetch = globalThis.fetch
const seen = new Set()
const state = () => { try { return JSON.parse(fs.readFileSync(STATE, 'utf8')) } catch { return {} } }
const log = (e) => fs.appendFileSync(LOG, JSON.stringify(e) + '\n')
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

globalThis.fetch = async (input, init = {}) => {
  const url = typeof input === 'string' ? input : input.url ?? String(input)
  const method = (init.method || (input && input.method) || 'GET').toUpperCase()
  let body = init.body
  if (body && typeof body !== 'string') { try { body = new TextDecoder().decode(body) } catch { body = String(body) } }
  const u = new URL(url)
  if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') return realFetch(input, init)
  const s = state()
  log({ method, host: u.hostname, path: u.pathname, query: u.search, body })

  if (u.hostname === 'services.leadconnectorhq.com') {
    if (s.ghlDown) throw new TypeError('fetch failed')
    const p = u.pathname
    if (p === '/contacts/upsert') return json(200, { contact: { id: 'c_' + (JSON.parse(body).email || 'x') } })
    if (p === '/contacts/' && method === 'POST') {
      const email = JSON.parse(body).email
      if (seen.has(email)) return json(400, { statusCode: 400, message: 'This location does not allow duplicated contacts.', meta: { contactId: 'c_' + email } })
      seen.add(email); return json(201, { contact: { id: 'c_' + email } })
    }
    if (/^\/contacts\/[^/]+\/notes$/.test(p)) return json(201, { note: { id: 'n1' } })
    if (p === '/calendars/') return json(200, { calendars: s.calendars ?? [
      { id: 'cal_std', name: 'Standard Clean', teamMembers: [{ userId: 'u_ana' }, { userId: 'u_bea' }] },
      { id: 'cal_deep', name: 'Deep Cleaning', teamMembers: [{ userId: 'u_ana' }, { userId: 'u_bea' }] },
      { id: 'cal_move', name: 'Move In/Out', teamMembers: [{ userId: 'u_ana' }] },
      { id: 'cal_air', name: 'Airbnb / Short-Term Rental', teamMembers: [{ userId: 'u_bea' }] },
    ] })
    if (p === '/calendars/events' && method === 'GET') {
      if (s.eventsFail) return json(403, { message: 'scope' })
      const uid = u.searchParams.get('userId'); return json(200, { events: (s.events ?? []).filter((e) => !uid || e.assignedUserId === uid) })
    }
    if (p === '/calendars/events/appointments') return json(201, { id: 'appt_1' })
    return json(404, { message: 'stub: unknown GHL path ' + p })
  }
  if (u.hostname === 'formspree.io') return json(200, { ok: true })
  if (u.hostname === 'api.stripe.com') {
    const p = u.pathname
    const params = new URLSearchParams(body || '')
    if (p === '/v1/checkout/sessions' && method === 'POST') {
      const md = {}; for (const [k, v] of params) { const m = k.match(/^metadata\[(.+)\]$/); if (m) md[m[1]] = v }
      fs.writeFileSync(STATE + '.session', JSON.stringify({ metadata: md, amount: Number(params.get('line_items[0][price_data][unit_amount]')) }))
      return json(200, { id: 'cs_test_1', object: 'checkout.session', url: 'https://checkout.stripe.com/c/pay/cs_test_1' })
    }
    if (p.startsWith('/v1/payment_intents/') && method === 'GET') return json(200, { id: 'pi_1', object: 'payment_intent', metadata: s.piMeta ?? {} })
    if (p.startsWith('/v1/payment_intents/') && method === 'POST') return json(200, { id: 'pi_1', object: 'payment_intent', metadata: { ra_booked: '1' } })
    return json(404, { error: { message: 'stub: unknown stripe path ' + p } })
  }
  return json(599, { stub: 'blocked outbound ' + url })
}
