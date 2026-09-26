'use client'
import Script from 'next/script'
import { GHL_CHAT_WIDGET_ID, hasGhlChatWidget } from '@/lib/ghlWidget'

/**
 * Loads HighLevel's chat widget, or nothing at all when no widget ID is set.
 *
 * Deliberately the only chat on the page when it is enabled: two opt-in flows
 * wording consent differently is the kind of thing that fails A2P vetting, and
 * two bubbles in one corner look broken besides.
 */
export default function GhlChatWidget() {
  if (!hasGhlChatWidget) return null

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={GHL_CHAT_WIDGET_ID}
      strategy="afterInteractive"
    />
  )
}
