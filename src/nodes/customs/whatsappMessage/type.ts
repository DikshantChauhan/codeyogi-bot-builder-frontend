import { Node } from '@xyflow/react'

export const WHATSAPP_MESSAGE_NODE_KEY = 'whatsapp-message'

export type WhatsappMessageNodeData = {
  text: string
  previewUrl: boolean
}

export type WhatsappMessageNodeType = Node<WhatsappMessageNodeData, typeof WHATSAPP_MESSAGE_NODE_KEY>
