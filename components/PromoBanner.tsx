'use client'
import { useState } from 'react'

export default function PromoBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-[#00A896] text-white text-center py-2.5 px-4 flex items-center justify-center gap-3 text-sm font-semibold shadow-md">
      <span className="animate-pulse">🎉</span>
      <span>
        <strong>FIRST CLEAN 15% OFF</strong> — Book today, use code{' '}
        <span className="bg-white text-[#00A896] font-black px-2 py-0.5 rounded text-xs tracking-widest">
          FIRST15
        </span>{' '}
        · Limited spots this week!
      </span>
      <a
        href="https://raprocleaningservices.bookingkoala.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex items-center gap-1 bg-white text-[#00A896] font-black text-xs px-3 py-1.5 rounded-full hover:bg-[#E6F7F5] transition-colors flex-shrink-0"
      >
        Book Now →
      </a>
      <button
        onClick={() => setVisible(false)}
        className="ml-auto text-white/70 hover:text-white flex-shrink-0"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  )
}
