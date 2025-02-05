import { Node } from '@xyflow/react'

export const WHATSAPP_BUTTON_NODE_KEY = 'whatsapp-button'

interface MessageHeader {
  type: 'text' | 'image' | 'video' | 'document'
  text?: string
  image?: { id: string } | { link: string }
  video?: { id: string } | { link: string }
  document?: { id: string } | { link: string }
}

export type WhatsappButtonNodeData = {
  text: string
  buttons: string[]
  footer?: string
  header?: MessageHeader
}

export type WhatsappButtonNodeType = Node<WhatsappButtonNodeData, typeof WHATSAPP_BUTTON_NODE_KEY>
