import { NextRequest } from 'next/server'
import { POST } from '@/app/api/contact/route'

function makeRequest(body: unknown): NextRequest {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }) as unknown as NextRequest
}

describe('POST /api/contact', () => {
  const originalFetch = globalThis.fetch
  const originalEnv = { ...process.env }

  beforeEach(() => {
    process.env = { ...originalEnv, GHL_API_KEY: '', FORMSPREE_ENDPOINT: 'https://example.test/f/abc' }
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    process.env = originalEnv
    vi.restoreAllMocks()
  })

  it('rejects submissions missing required fields', async () => {
    const res = await POST(makeRequest({ fullName: 'Jane' })) // no phone/email
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.ok).toBe(false)
    expect(json.error).toMatch(/required/i)
  })

  it('returns 502 when both CRM and email delivery fail', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response('boom', { status: 500 })
    )

    const res = await POST(
      makeRequest({
        fullName: 'Jane Smith',
        phone: '720-555-0000',
        email: 'jane@example.com',
      })
    )
    expect(res.status).toBe(502)
    const json = await res.json()
    expect(json.ok).toBe(false)
  })

  it('returns 200 when at least the Formspree email is delivered', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response('{}', { status: 200 })
    )

    const res = await POST(
      makeRequest({
        fullName: 'Jane Smith',
        phone: '720-555-0000',
        email: 'jane@example.com',
        service: 'deep-cleaning',
        smsOptIn: true,
      })
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(json.emailSent).toBe(true)
    // GHL_API_KEY was empty, so CRM is skipped
    expect(json.crmSaved).toBe(false)
  })

  it('posts to the configured Formspree endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    globalThis.fetch = fetchMock

    await POST(
      makeRequest({
        fullName: 'Jane Smith',
        phone: '720-555-0000',
        email: 'jane@example.com',
      })
    )

    const calls = fetchMock.mock.calls
    expect(calls[0]?.[0]).toBe('https://example.test/f/abc')
  })
})
