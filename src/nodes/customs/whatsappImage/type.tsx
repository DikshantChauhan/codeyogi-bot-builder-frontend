import { Node } from '@xyflow/react'

export const WHATSAPP_IMAGE_NODE_KEY = 'whatsapp-image'

export type WhatsappImageNodeData = {
  id?: string
  link?: string
  caption?: string
}

export type WhatsappImageNodeType = Node<WhatsappImageNodeData, typeof WHATSAPP_IMAGE_NODE_KEY>
