import { Node } from '@xyflow/react'

export const WHATSAPP_VIDEO_NODE_KEY = 'whatsapp-video'

export type WhatsappVideoNodeData = { media: string; mediaType: 'id' | 'link'; caption?: string }

export type WhatsappVideoNodeType = Node<WhatsappVideoNodeData, typeof WHATSAPP_VIDEO_NODE_KEY>
