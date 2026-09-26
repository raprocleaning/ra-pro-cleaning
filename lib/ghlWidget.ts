/**
 * HighLevel's hosted chat widget.
 *
 * The carriers vet the opt-in flow, not the website, and HighLevel's widget
 * ships a flow they have already vetted — which is the point of registering the
 * A2P campaign through it rather than through our own form. It only loads once
 * the widget's ID is set, so the site behaves exactly as before until then.
 *
 * Set NEXT_PUBLIC_GHL_CHAT_WIDGET_ID in the hosting environment. Next inlines
 * the value at build time, so it has to be referenced literally here.
 */
export const GHL_CHAT_WIDGET_ID = process.env.NEXT_PUBLIC_GHL_CHAT_WIDGET_ID ?? ''

/** Whether the hosted widget is configured, and so owns the bottom-right corner. */
export const hasGhlChatWidget = GHL_CHAT_WIDGET_ID.length > 0
