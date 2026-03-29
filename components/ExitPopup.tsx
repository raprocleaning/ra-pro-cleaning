'use client'
import { useState, useEffect, useRef } from 'react'

export default function ExitPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    if (dismissed) return
    // Exit-intent: mouse moves toward top of screen
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered.current) {
        triggered.current = true
        setShow(true)
      }
    }
    // Also show after 45 seconds on page
    const timer = setTimeout(() => {
      if (!triggered.current) {
        triggered.current = true
        setShow(true)
      }
    }, 45000)

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [dismissed])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Lead from popup',
          phone,
          email,
          message: 'Lead captured via exit-intent popup. Requested 15% off first cleaning.',
        }),
      })
    } catch { /* fail silently */ }
    setSubmitted(true)
  }

  const dismiss = () => { setShow(false); setDismissed(true) }
  if (!show) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={dismiss}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F2240] px-8 py-6 text-center relative">
          <button onClick={dismiss} className="absolute top-4 right-4 text-white/50 hover:text-white text-xl">✕</button>
          <div className="text-4xl mb-2">🎁</div>
          <h2 className="text-white font-black text-2xl leading-tight">
            Wait! Don&apos;t Leave<br />
            <span className="text-[#00A896]">Without Your 15% Discount</span>
          </h2>
          <p className="text-white/60 text-sm mt-2">
            First-time customers only · Limited availability this week
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-[#0F2240] font-black text-xl mb-2">You&apos;re In!</h3>
              <p className="text-[#4A6583] text-sm mb-4">
                We&apos;ll text/call you shortly with your discount code. Get ready for a spotless clean!
              </p>
              <p className="text-[#00A896] font-black text-lg">Use code: <span className="bg-[#E6F7F5] px-3 py-1 rounded">FIRST15</span></p>
            </div>
          ) : (
            <>
              <p className="text-[#4A6583] text-sm mb-5 text-center">
                Drop your info below and we&apos;ll send your <strong>15% off</strong> code + call to schedule your first clean.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border-2 border-[#B2DFDB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00A896]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Your phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full border-2 border-[#B2DFDB] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00A896]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#00A896] hover:bg-[#007A6C] text-white font-black py-4 rounded-lg text-base transition-colors"
                >
                  Claim My 15% Off →
                </button>
              </form>
              <p className="text-center text-[#4A6583] text-xs mt-3">
                🔒 No spam. We&apos;ll only contact you about your cleaning.
              </p>
            </>
          )}
        </div>

        {/* Trust bar */}
        <div className="border-t border-[#E6F7F5] px-8 py-4 flex justify-center gap-6 text-xs text-[#4A6583]">
          <span>⭐ 5.0 Google</span>
          <span>✅ 41 Reviews</span>
          <span>🔒 Licensed & Insured</span>
        </div>
      </div>
    </div>
  )
}
