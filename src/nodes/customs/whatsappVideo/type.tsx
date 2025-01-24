import { Node } from '@xyflow/react'

export const WHATSAPP_VIDEO_NODE_KEY = 'whatsapp-video'

export type WhatsappVideoNodeData = {
  id?: string
  url?: string
  caption?: string
}

export type WhatsappVideoNodeType = Node<WhatsappVideoNodeData, typeof WHATSAPP_VIDEO_NODE_KEY>
