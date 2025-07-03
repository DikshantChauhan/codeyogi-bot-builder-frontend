import { Node } from '@xyflow/react'

export const WHATSAPP_IMAGE_NODE_KEY = 'whatsapp-image'

export type WhatsappImageNodeData = {
  id?: string // Only if using uploaded media
  link?: string // Only if using hosted media (not recommended)
  caption?: string // Media caption text
}

export type WhatsappImageNodeType = Node<WhatsappImageNodeData, typeof WHATSAPP_IMAGE_NODE_KEY>
