import { Node } from '@xyflow/react'

export const WHATSAPP_BUTTON_NODE_KEY = 'whatsapp-button'

export type WhatsappButtonNodeData = {
  text: string
  buttons: string[]
}

export type WhatsappButtonNodeType = Node<WhatsappButtonNodeData, typeof WHATSAPP_BUTTON_NODE_KEY>
