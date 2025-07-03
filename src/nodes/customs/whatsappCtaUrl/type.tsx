import { Node } from '@xyflow/react'

export const WHATSAPP_CTA_URL_NODE_KEY = 'whatsapp-cta-url'

export type WhatsappCtaUrlNodeData = {
  // Header options
  headerType?: 'text' | 'image' | 'video' | 'document' | 'none'
  headerText?: string // For text header (max 60 chars)
  headerImageLink?: string // For image header
  headerVideoLink?: string // For video header
  headerDocumentLink?: string // For document header

  // Body text (required, max 1024 chars)
  bodyText: string

  // Button configuration (required)
  buttonText: string // Button label (max 20 chars)
  buttonUrl: string // URL to load when button is tapped

  // Footer text (optional, max 60 chars)
  footerText?: string
}

export type WhatsappCtaUrlNodeType = Node<WhatsappCtaUrlNodeData, typeof WHATSAPP_CTA_URL_NODE_KEY>
