'use client'
import { useState, useRef, useEffect } from 'react'

// ─── PRICING TABLES ──────────────────────────────────────────────────────────
// Standard: 10% below Denver market rate (base)
// Deep Clean: Standard × 1.30
// Move In/Out: Standard × 1.50
// Post-Construction: $0.20 per sqft (tier midpoint)
const PRICING: Record<string, { max: number; price: number }[]> = {
  'Standard Cleaning': [
    { max: 1249, price: 155 },
    { max: 1499, price: 175 },
    { max: 1799, price: 195 },
    { max: 2099, price: 215 },
    { max: 2399, price: 235 },
    { max: 2699, price: 250 },
    { max: 2999, price: 270 },
    { max: 3299, price: 290 },
    { max: 3599, price: 300 },
    { max: 3899, price: 320 },
    { max: 4199, price: 335 },
    { max: 4499, price: 345 },
    { max: 4799, price: 360 },
    { max: Infinity, price: 375 },
  ],
  // Standard × 1.30, rounded to nearest $5
  'Deep Cleaning': [
    { max: 1249, price: 200 },
    { max: 1499, price: 230 },
    { max: 1799, price: 255 },
    { max: 2099, price: 280 },
    { max: 2399, price: 305 },
    { max: 2699, price: 325 },
    { max: 2999, price: 350 },
    { max: 3299, price: 380 },
    { max: 3599, price: 390 },
    { max: 3899, price: 415 },
    { max: 4199, price: 435 },
    { max: 4499, price: 450 },
    { max: 4799, price: 470 },
    { max: Infinity, price: 490 },
  ],
  // Standard × 1.50, rounded to nearest $5
  'Move In/Out Cleaning': [
    { max: 1249, price: 235 },
    { max: 1499, price: 265 },
    { max: 1799, price: 295 },
    { max: 2099, price: 325 },
    { max: 2399, price: 355 },
    { max: 2699, price: 375 },
    { max: 2999, price: 405 },
    { max: 3299, price: 435 },
    { max: 3599, price: 450 },
    { max: 3899, price: 480 },
    { max: 4199, price: 505 },
    { max: 4499, price: 520 },
    { max: 4799, price: 540 },
    { max: Infinity, price: 565 },
  ],
  'Airbnb Cleaning': [
    { max: 1249, price: 90  },
    { max: 1499, price: 110 },
    { max: 1799, price: 130 },
    { max: 2099, price: 150 },
    { max: 2399, price: 165 },
    { max: 2699, price: 190 },
    { max: 2999, price: 210 },
    { max: 3299, price: 235 },
    { max: 3599, price: 250 },
    { max: 3899, price: 270 },
    { max: 4199, price: 295 },
    { max: 4499, price: 310 },
    { max: 4799, price: 330 },
    { max: Infinity, price: 340 },
  ],
  'Office Cleaning': [
    { max: 1249, price: 155 },
    { max: 1499, price: 185 },
    { max: 1799, price: 215 },
    { max: 2099, price: 250 },
    { max: 2399, price: 280 },
    { max: 2699, price: 310 },
    { max: 2999, price: 345 },
    { max: 3299, price: 375 },
    { max: 3599, price: 400 },
    { max: 3899, price: 430 },
    { max: 4199, price: 455 },
    { max: 4499, price: 475 },
    { max: 4799, price: 500 },
    { max: Infinity, price: 520 },
  ],
  // $0.20/sqft using tier midpoint sqft
  'Post-Construction Cleaning': [
    { max: 1249, price: 200 },
    { max: 1499, price: 275 },
    { max: 1799, price: 330 },
    { max: 2099, price: 390 },
    { max: 2399, price: 450 },
    { max: 2699, price: 510 },
    { max: 2999, price: 570 },
    { max: 3299, price: 630 },
    { max: 3599, price: 690 },
    { max: 3899, price: 750 },
    { max: 4199, price: 810 },
    { max: 4499, price: 870 },
    { max: 4799, price: 930 },
    { max: Infinity, price: 1100 },
  ],
}

function getPrice(service: string, sqft: number): number | null {
  const table = PRICING[service]
  if (!table) return null
  const tier = table.find((t) => sqft <= t.max)
  return tier ? tier.price : null
}

// ─── TYPES ──────────────────────────────────────────────────────────────────
type Step =
  | 'greeting'
  | 'service'
  | 'sqft'
  | 'price'
  | 'confirm'
  | 'extras'
  | 'date'
  | 'name'
  | 'phone'
  | 'email'
  | 'done'

type Message = {
  from: 'bot' | 'user'
  text: string
  options?: string[]
  isPrice?: boolean
  price?: number
  service?: string
  sqft?: number
}

type BookingData = {
  service: string
  sqft: number
  price: number
  extras: string[]
  preferredDate: string
  name: string
  phone: string
  email: string
}

const EXTRAS: { label: string; price: number }[] = [
  { label: 'Inside Oven',             price: 45 },
  { label: 'Inside Fridge',           price: 35 },
  { label: 'Interior Windows',        price: 40 },
  { label: 'Heavy Dirt / Deep Scrub', price: 50 },
  { label: 'Laundry (Wash & Dry)',    price: 40 },
  { label: 'Garage Cleaning',         price: 60 },
  { label: 'Balcony / Patio',         price: 35 },
  { label: 'Blinds Cleaning',         price: 30 },
  { label: 'Organizing',              price: 50 },
]

const SERVICES = [
  'Standard Cleaning',
  'Deep Cleaning',
  'Move In/Out Cleaning',
  'Airbnb Cleaning',
  'Office Cleaning',
  'Post-Construction Cleaning',
  'Carpet Cleaning',
]

const SQFT_OPTIONS = [
  'Under 1,000 sqft',
  '1,000 – 1,500 sqft',
  '1,500 – 2,000 sqft',
  '2,000 – 2,500 sqft',
  '2,500 – 3,000 sqft',
  '3,000 – 3,500 sqft',
  '3,500+ sqft',
]

function sqftFromOption(opt: string): number {
  if (opt.startsWith('Under')) return 900
  if (opt.startsWith('1,000')) return 1250
  if (opt.startsWith('1,500')) return 1650
  if (opt.startsWith('2,000')) return 2200
  if (opt.startsWith('2,500')) return 2750
  if (opt.startsWith('3,000')) return 3200
  return 4000
}

function sqftFromText(text: string): number | null {
  const num = parseInt(text.replace(/[^0-9]/g, ''), 10)
  return isNaN(num) || num < 100 || num > 20000 ? null : num
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function VirtualAssistant() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('greeting')
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text: "👋 Hi! I'll get you an instant price quote and collect your booking info.\n\nWhat service are you interested in?",
      options: SERVICES,
    },
  ])
  const [booking, setBooking] = useState<Partial<BookingData>>({})
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  // Reset when closed
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
    // Reset to fresh state each open
    setStep('service')
    setBooking({})
    setSelectedExtras([])
    setInput('')
    setMessages([
      {
        from: 'bot',
        text: "👋 Hi! I'll get you an instant price quote and collect your booking info.\n\nWhat service are you interested in?",
        options: SERVICES,
      },
    ])
  }

  const addMessages = (...msgs: Message[]) => {
    setMessages((prev) => [...prev, ...msgs])
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  // ── Handle option clicks ──
  const handleOption = (opt: string) => {
    if (step === 'service') {
      const userMsg: Message = { from: 'user', text: opt }
      setBooking((b) => ({ ...b, service: opt }))

      if (opt === 'Carpet Cleaning') {
        setStep('name')
        addMessages(userMsg, {
          from: 'bot',
          text: "Great choice! Carpet cleaning is priced based on the number of rooms and condition. We'll give you a custom quote.\n\nTo get started, what's your full name?",
        })
        return
      }

      setStep('sqft')
      addMessages(userMsg, {
        from: 'bot',
        text: `Perfect! What's the approximate square footage of the space?`,
        options: SQFT_OPTIONS,
      })
      return
    }

    if (step === 'sqft') {
      const sqft = sqftFromOption(opt)
      const service = booking.service!
      const price = getPrice(service, sqft)
      const userMsg: Message = { from: 'user', text: opt }

      setBooking((b) => ({ ...b, sqft, price: price ?? 0 }))
      setStep('price')

      if (price) {
        addMessages(userMsg, {
          from: 'bot',
          isPrice: true,
          price,
          service,
          sqft,
          text: `✅ Estimated price for **${service}** (~${sqft.toLocaleString()} sqft):\n\n💰 **$${price}**\n\nWould you like to book this service?`,
          options: ['Yes, book me in!', 'Choose a different service', 'I want to book online directly'],
        })
      } else {
        addMessages(userMsg, {
          from: 'bot',
          text: `For ${service}, we'll give you a custom quote based on your space. Let's collect your info and we'll reach out within 24 hours!`,
          options: ['Continue'],
        })
        setStep('name')
      }
      return
    }

    if (step === 'price') {
      const userMsg: Message = { from: 'user', text: opt }

      if (opt === 'Yes, book me in!') {
        setStep('extras')
        setSelectedExtras([])
        const extrasOptions = EXTRAS.map(e => `${e.label} (+$${e.price})`).concat(['✅ No extras — I\'m good!'])
        addMessages(userMsg, {
          from: 'bot',
          text: "Great! Would you like any extras? Each adds to your total.\n\n👇 Pick all that apply, then tap **\"Done with extras\"**:",
          options: extrasOptions,
        })
      } else if (opt === 'Choose a different service') {
        setStep('service')
        setBooking({})
        addMessages(userMsg, {
          from: 'bot',
          text: 'Sure! Which service would you like?',
          options: SERVICES,
        })
      } else if (opt === 'I want to book online directly') {
        window.open('https://raprocleaningservices.bookingkoala.com', '_blank')
        addMessages(userMsg, {
          from: 'bot',
          text: "Booking page opened! 🎉 We'll see you there. Any other questions?",
          options: ['Get a price quote', 'Contact us'],
        })
        setStep('greeting')
      }
      return
    }

    if (step === 'date') {
      setBooking((b) => ({ ...b, preferredDate: opt }))
      setStep('name')
      addMessages({ from: 'user', text: opt }, {
        from: 'bot',
        text: `Got it — **${opt}** is noted! 📋\n\nNow let's get your contact info.\n\nWhat's your full name?`,
      })
      return
    }

    if (step === 'extras') {
      const userMsg: Message = { from: 'user', text: opt }
      const noExtras = opt.includes('No extras') || opt.includes('Done with extras')

      if (noExtras) {
        // Calculate extras total
        const extrasTotal = selectedExtras.reduce((sum, label) => {
          const found = EXTRAS.find(e => label.startsWith(e.label))
          return sum + (found?.price ?? 0)
        }, 0)
        const basePrice = booking.price ?? 0
        const totalPrice = basePrice + extrasTotal
        if (extrasTotal > 0) setBooking(b => ({ ...b, extras: selectedExtras, price: totalPrice }))
        else setBooking(b => ({ ...b, extras: [] }))

        setStep('date')
        const summary = selectedExtras.length > 0
          ? `\n\n✅ Extras added: ${selectedExtras.map(e => e.split(' (+')[0]).join(', ')}\n💰 Updated total: **$${totalPrice}**`
          : ''
        addMessages(userMsg, {
          from: 'bot',
          text: `Perfect!${summary}\n\n📅 What date works best for your cleaning?\n\nType a date like **"April 15"** or **"next Saturday"** — or pick an option:`,
          options: ['This week', 'Next week', 'Flexible / ASAP'],
        })
      } else {
        // Add the extra to selected list
        const newExtras = [...selectedExtras, opt]
        setSelectedExtras(newExtras)
        const remaining = EXTRAS
          .map(e => `${e.label} (+$${e.price})`)
          .filter(e => !newExtras.includes(e))
          .concat(['✅ Done with extras'])
        addMessages(userMsg, {
          from: 'bot',
          text: `Added! ✅ Selected so far: **${newExtras.map(e => e.split(' (+')[0]).join(', ')}**\n\nAnything else?`,
          options: remaining,
        })
      }
      return
    }

    // Generic options after done
    if (opt === 'Contact us') {
      addMessages({ from: 'user', text: opt }, {
        from: 'bot',
        text: `📞 Call/text: 720-677-8799\n📧 Email: ra@raprocleaningservices.com`,
        options: ['Get a price quote'],
      })
      return
    }
    if (opt === 'Get a price quote' || opt === 'Continue') {
      setStep('service')
      setBooking({})
      addMessages({ from: 'user', text: opt }, {
        from: 'bot',
        text: 'Which service are you interested in?',
        options: SERVICES,
      })
    }
  }

  // ── Handle free-text input ──
  const handleSend = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    const userMsg: Message = { from: 'user', text }

    if (step === 'sqft') {
      const sqft = sqftFromText(text)
      if (!sqft) {
        addMessages(userMsg, { from: 'bot', text: "Please enter a number (e.g. 1500) or choose from the options above." })
        return
      }
      const service = booking.service!
      const price = getPrice(service, sqft)
      setBooking((b) => ({ ...b, sqft, price: price ?? 0 }))
      setStep('price')
      addMessages(userMsg, {
        from: 'bot',
        isPrice: true,
        price: price ?? undefined,
        service,
        sqft,
        text: price
          ? `✅ Estimated price for **${service}** (${sqft.toLocaleString()} sqft):\n\n💰 **$${price}**\n\nWould you like to book this service?`
          : `For ${service} at ${sqft.toLocaleString()} sqft, we'll provide a custom quote. Shall we collect your contact info?`,
        options: price
          ? ['Yes, book me in!', 'Choose a different service', 'I want to book online directly']
          : ['Continue'],
      })
      return
    }

    if (step === 'date') {
      setBooking((b) => ({ ...b, preferredDate: text }))
      setStep('name')
      addMessages(userMsg, { from: 'bot', text: `Got it — **${text}** is noted! 📋\n\nNow let's get your contact info.\n\nWhat's your full name?` })
      return
    }

    if (step === 'name') {
      setBooking((b) => ({ ...b, name: text }))
      setStep('phone')
      addMessages(userMsg, { from: 'bot', text: `Nice to meet you, ${text.split(' ')[0]}! 📞 What's the best phone number to reach you?` })
      return
    }

    if (step === 'phone') {
      setBooking((b) => ({ ...b, phone: text }))
      setStep('email')
      addMessages(userMsg, { from: 'bot', text: "Great! And what's your email address?" })
      return
    }

    if (step === 'email') {
      const updatedBooking = { ...booking, email: text } as BookingData
      setBooking(updatedBooking)
      setStep('done')
      setSubmitting(true)
      addMessages(userMsg)

      // Submit to contact API
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: updatedBooking.name,
            phone: updatedBooking.phone,
            email: updatedBooking.email,
            source: 'ai-chat',
            service: updatedBooking.service,
            sqft: updatedBooking.sqft,
            price: updatedBooking.price,
            extras: updatedBooking.extras || [],
            preferredDate: updatedBooking.preferredDate || 'Flexible',
            smsOptIn: true,
          }),
        })
      } catch {
        // fail silently
      }

      setSubmitting(false)
      addMessages({
        from: 'bot',
        text: `🎉 All set, ${updatedBooking.name?.split(' ')[0]}!\n\nYour booking request has been received:\n• Service: ${updatedBooking.service}\n• Extras: ${updatedBooking.extras?.length ? updatedBooking.extras.map((e: string) => e.split(' (+')[0]).join(', ') : 'None'}\n• Date: ${updatedBooking.preferredDate || 'Flexible'}\n• Est. Price: **$${updatedBooking.price || 'Custom quote'}**\n\nWe'll call you at ${updatedBooking.phone} within 24 hours to confirm.\n\n⭐ After your clean, we'll send a quick text to ask how we did and schedule your next one!\n\nOr book online right now:`,
        options: ['Book Online Now →', 'Ask another question'],
      })
      return
    }

    if (opt === 'Book Online Now →') {
      window.open('https://raprocleaningservices.bookingkoala.com', '_blank')
      return
    }

    // Fallback
    addMessages(userMsg, {
      from: 'bot',
      text: "I'm here to help you book! Would you like a price quote?",
      options: SERVICES,
    })
    setStep('service')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleOptionClick = (opt: string) => {
    if (opt === 'Book Online Now →') {
      window.open('https://raprocleaningservices.bookingkoala.com', '_blank')
      addMessages({ from: 'user', text: opt }, {
        from: 'bot',
        text: "Opening booking page... 🎉 See you there!",
      })
      return
    }
    if (opt === 'Ask another question') {
      setStep('service')
      setBooking({})
      addMessages({ from: 'user', text: opt }, {
        from: 'bot',
        text: 'Of course! What service can I quote you for?',
        options: SERVICES,
      })
      return
    }
    handleOption(opt)
  }

  const inputPlaceholder =
    step === 'name' ? 'Your full name...'
    : step === 'phone' ? 'Your phone number...'
    : step === 'email' ? 'Your email address...'
    : step === 'sqft' ? 'Type sqft (e.g. 1500) or pick above...'
    : 'Type a message...'

  return (
    <>
      {/* ── FLOATING BOOK NOW BUTTON → BookingKoala ─────────────── */}
      <a
        href="https://raprocleaningservices.bookingkoala.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#00A896] hover:bg-[#007A6C] text-white shadow-2xl flex items-center gap-2 px-5 py-3.5 transition-all duration-300 rounded-full font-bold text-sm"
        style={{ boxShadow: '0 8px 30px rgba(0,168,150,0.45)' }}
        aria-label="Book Now"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Book Now
      </a>

      {/* ── FLOATING AI QUOTE CHAT BUTTON ────────────────────────── */}
      <button
        onClick={open ? handleClose : handleOpen}
        className="fixed bottom-20 right-6 z-50 bg-[#0F2240] hover:bg-[#1a3460] text-white shadow-xl flex items-center gap-2 px-4 py-3 transition-all duration-300 rounded-full font-semibold text-xs"
        aria-label={open ? 'Close assistant' : 'Get Instant Quote'}
        style={{ boxShadow: '0 6px 20px rgba(15,34,64,0.35)' }}
      >
        {open ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            Get Instant Quote
          </>
        )}
      </button>

      {/* ── CHAT / BOOKING WINDOW ───────────────────────────────────── */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] bg-white shadow-2xl flex flex-col border border-[#B2DFDB] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#0F2240] px-4 py-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00A896] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              RA
            </div>
            <div>
              <p className="text-white text-sm font-bold">Book & Get Instant Price</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-white/60 text-xs">Responds instantly</p>
              </div>
            </div>
            <button onClick={handleClose} className="ml-auto text-white/50 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress strip */}
          <div className="flex bg-[#0F2240]/5 border-b border-[#B2DFDB]">
            {(['service', 'sqft', 'price', 'extras', 'date', 'name', 'phone', 'email', 'done'] as Step[]).map((s, i) => {
              const stepOrder: Step[] = ['greeting', 'service', 'sqft', 'price', 'extras', 'date', 'name', 'phone', 'email', 'done']
              const currentIdx = stepOrder.indexOf(step)
              const thisIdx = stepOrder.indexOf(s)
              const active = thisIdx <= currentIdx
              return (
                <div
                  key={s}
                  className={`flex-1 h-1 transition-all duration-500 ${active ? 'bg-[#00A896]' : 'bg-[#B2DFDB]/40'}`}
                  style={{ marginRight: i < 6 ? 1 : 0 }}
                />
              )
            })}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px] bg-[#F9FAFA]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Price card */}
                {msg.isPrice && msg.price && (
                  <div className="w-full bg-[#00A896] text-white rounded-2xl rounded-bl-sm p-4 mb-2 shadow-md">
                    <p className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-1">{msg.service}</p>
                    <p className="text-3xl font-black">${msg.price}</p>
                    <p className="text-xs opacity-70 mt-1">Est. for ~{msg.sqft?.toLocaleString()} sqft · Flat rate, no hidden fees</p>
                  </div>
                )}

                <div
                  className={`max-w-[88%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line rounded-2xl ${
                    msg.from === 'user'
                      ? 'bg-[#00A896] text-white rounded-br-sm'
                      : 'bg-white text-[#0F2240] border border-[#B2DFDB] rounded-bl-sm shadow-sm'
                  } ${msg.isPrice ? 'hidden' : ''}`}
                >
                  {msg.text.replace(/\*\*/g, '')}
                </div>

                {msg.options && msg.from === 'bot' && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="text-xs px-3 py-1.5 border border-[#00A896] text-[#00A896] hover:bg-[#00A896] hover:text-white transition-colors rounded-full font-medium"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {submitting && (
              <div className="flex items-center gap-2 text-[#4A6583] text-xs">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A896] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A896] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A896] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                Sending your info...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#B2DFDB] p-3 flex gap-2 bg-white">
            <input
              type={step === 'email' ? 'email' : step === 'phone' ? 'tel' : 'text'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={inputPlaceholder}
              className="flex-1 text-sm border border-[#B2DFDB] px-3 py-2.5 rounded-full outline-none focus:border-[#00A896] transition-colors bg-[#F9FAFA] placeholder-[#4A6583]/50"
              disabled={submitting || step === 'done'}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || submitting || step === 'done'}
              className="w-10 h-10 bg-[#00A896] disabled:opacity-30 hover:bg-[#007A6C] text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
