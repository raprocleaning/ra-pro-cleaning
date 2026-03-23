'use client'
import { useState, useRef, useEffect } from 'react'

type Message = {
  from: 'bot' | 'user'
  text: string
  options?: string[]
}

const BOT_NAME = 'RA Pro Assistant'

const INITIAL_MESSAGE: Message = {
  from: 'bot',
  text: "Hi there! 👋 I'm the RA Pro Cleaning assistant. How can I help you today?",
  options: [
    'What services do you offer?',
    'How much does it cost?',
    'How do I book?',
    'Do you serve my area?',
  ],
}

function getBotReply(userText: string): Message {
  const t = userText.toLowerCase()

  if (t.includes('service') || t.includes('offer') || t.includes('clean')) {
    return {
      from: 'bot',
      text: "We offer a full range of cleaning services:\n\n• 🏠 House Cleaning\n• 🔍 Deep Cleaning\n• ✨ Standard Cleaning\n• 🏢 Office Cleaning\n• 📦 Move In/Out Cleaning\n• 🏨 Airbnb Cleaning\n• 🧹 Carpet Cleaning\n\nWhich service would you like to know more about?",
      options: ['Deep Cleaning', 'Carpet Cleaning', 'Move In/Out', 'How much does it cost?'],
    }
  }

  if (t.includes('deep')) {
    return {
      from: 'bot',
      text: "Our Deep Cleaning is a thorough top-to-bottom clean — every surface, corner, cabinet interior, baseboards, and appliance. Starting at $300. Perfect for first-time clients or seasonal resets.",
      options: ['How do I book?', 'What else do you offer?', 'Do you serve my area?'],
    }
  }

  if (t.includes('carpet')) {
    return {
      from: 'bot',
      text: "Our Carpet Cleaning uses hot water extraction to remove deep stains, allergens, and embedded dirt from all carpet types. Pricing is custom based on rooms and carpet condition. Fast dry time — typically 2–4 hours!",
      options: ['How do I book?', 'What else do you offer?', 'How much does it cost?'],
    }
  }

  if (t.includes('move') || t.includes('moving')) {
    return {
      from: 'bot',
      text: "Our Move In/Out Cleaning is a deep clean designed for transitions — we'll leave your old place spotless or get your new home ready before you unpack. Custom pricing based on size.",
      options: ['How do I book?', 'How much does it cost?', 'What else do you offer?'],
    }
  }

  if (t.includes('price') || t.includes('cost') || t.includes('much') || t.includes('rate') || t.includes('fee')) {
    return {
      from: 'bot',
      text: "Here's a quick overview:\n\n• Deep Cleaning — from $300\n• Standard Cleaning — from $200\n• Carpet Cleaning — custom quote\n• Move In/Out — custom quote\n• Airbnb Cleaning — custom quote\n\nFor an exact quote, I recommend booking a free consultation!",
      options: ['How do I book?', 'Get a free quote', 'What services do you offer?'],
    }
  }

  if (t.includes('book') || t.includes('schedul') || t.includes('appoint') || t.includes('quote') || t.includes('consult')) {
    return {
      from: 'bot',
      text: "Booking is easy! You can:\n\n1️⃣ Click the button below to book online instantly\n2️⃣ Or call/text us directly for a free quote\n\nWe'll confirm your appointment within a few hours!",
      options: ['Book Now →', 'Call us', 'What services do you offer?'],
    }
  }

  if (t.includes('book now') || t.includes('book →')) {
    return {
      from: 'bot',
      text: "Great! Clicking the link below will take you to our online booking page. It only takes a few minutes! 🎉",
      options: ['Open booking page →', 'Ask another question'],
    }
  }

  if (t.includes('call') || t.includes('phone') || t.includes('number') || t.includes('contact')) {
    return {
      from: 'bot',
      text: "You can reach us at:\n\n📞 (929) 489-8268\n📧 raprocleaningservices@gmail.com\n\nOr visit our Contact page — we respond quickly!",
      options: ['How do I book?', 'What services do you offer?'],
    }
  }

  if (t.includes('area') || t.includes('denver') || t.includes('location') || t.includes('serve') || t.includes('where')) {
    return {
      from: 'bot',
      text: "We proudly serve Denver and the surrounding areas, including:\n\n📍 Denver · Aurora · Centennial · Littleton · Englewood · Highlands Ranch · Parker\n\nNot sure if we cover your area? Just ask!",
      options: ['How do I book?', 'How much does it cost?', 'What services do you offer?'],
    }
  }

  if (t.includes('airbnb') || t.includes('rental') || t.includes('host')) {
    return {
      from: 'bot',
      text: "Our Airbnb Cleaning is fast, thorough, and designed to keep your 5-star rating! We handle full turnover cleaning between guest stays — linens, surfaces, bathrooms, and more. Custom pricing.",
      options: ['How do I book?', 'How much does it cost?', 'What else do you offer?'],
    }
  }

  if (t.includes('office') || t.includes('commercial') || t.includes('business')) {
    return {
      from: 'bot',
      text: "Our Office Cleaning creates a productive, healthy workspace for your team. We handle desks, common areas, restrooms, floors, and more on a schedule that works for you. Custom pricing.",
      options: ['How do I book?', 'How much does it cost?', 'What else do you offer?'],
    }
  }

  if (t.includes('standard') || t.includes('regular') || t.includes('recurring')) {
    return {
      from: 'bot',
      text: "Our Standard Cleaning is perfect for recurring maintenance — keeping your home consistently clean between deep cleans. Starting at $200. We can set up weekly, bi-weekly, or monthly visits!",
      options: ['How do I book?', 'How much does it cost?', 'What else do you offer?'],
    }
  }

  if (t.includes('open') || t.includes('booking page')) {
    window.open('https://raprocleaningservices.bookingkoala.com', '_blank')
    return {
      from: 'bot',
      text: "Opening the booking page now! 🎉 Let us know if you have any other questions.",
      options: ['What services do you offer?', 'How much does it cost?'],
    }
  }

  if (t.includes('thank') || t.includes('great') || t.includes('awesome') || t.includes('perfect')) {
    return {
      from: 'bot',
      text: "You're welcome! We look forward to making your space shine ✨ Is there anything else I can help you with?",
      options: ['How do I book?', 'What services do you offer?', 'How much does it cost?'],
    }
  }

  if (t.includes('another question') || t.includes('else')) {
    return {
      from: 'bot',
      text: "Of course! What would you like to know?",
      options: [
        'What services do you offer?',
        'How much does it cost?',
        'How do I book?',
        'Do you serve my area?',
      ],
    }
  }

  // Default fallback
  return {
    from: 'bot',
    text: "Great question! For the most accurate answer, feel free to reach us directly:\n\n📞 (929) 489-8268\n📧 raprocleaningservices@gmail.com\n\nOr I can help you with:",
    options: [
      'What services do you offer?',
      'How much does it cost?',
      'How do I book?',
      'Do you serve my area?',
    ],
  }
}

export default function VirtualAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { from: 'user', text }
    const botReply = getBotReply(text)
    setMessages((prev) => [...prev, userMsg, botReply])
    setInput('')
  }

  const handleOption = (option: string) => {
    if (option === 'Open booking page →') {
      window.open('https://raprocleaningservices.bookingkoala.com', '_blank')
      setMessages((prev) => [
        ...prev,
        { from: 'user', text: option },
        {
          from: 'bot',
          text: "Booking page opened! 🎉 Is there anything else I can help you with?",
          options: ['What services do you offer?', 'How much does it cost?'],
        },
      ])
      return
    }
    if (option === 'Book Now →') {
      window.open('https://raprocleaningservices.bookingkoala.com', '_blank')
      setMessages((prev) => [
        ...prev,
        { from: 'user', text: option },
        {
          from: 'bot',
          text: "Booking page opened in a new tab! We look forward to hearing from you ✨",
          options: ['What services do you offer?', 'Ask another question'],
        },
      ])
      return
    }
    sendMessage(option)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#C8A96E] hover:bg-[#B8935A] text-white shadow-lg flex items-center justify-center transition-all duration-300 rounded-full"
        aria-label="Open chat"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-24px)] bg-white shadow-2xl flex flex-col border border-[#E0E0E0] rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#0A0A0A] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-[#C8A96E] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              RA
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{BOT_NAME}</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <p className="text-white/60 text-xs">Online now</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[360px] bg-[#F9F9F9]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line rounded-2xl ${
                    msg.from === 'user'
                      ? 'bg-[#C8A96E] text-white rounded-br-sm'
                      : 'bg-white text-[#0A0A0A] border border-[#E0E0E0] rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.options && msg.from === 'bot' && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOption(opt)}
                        className="text-xs px-3 py-1.5 border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E] hover:text-white transition-colors rounded-full"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#E0E0E0] p-3 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 text-sm border border-[#E0E0E0] px-3 py-2 rounded-full outline-none focus:border-[#C8A96E] transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 bg-[#C8A96E] disabled:opacity-40 hover:bg-[#B8935A] text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
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
