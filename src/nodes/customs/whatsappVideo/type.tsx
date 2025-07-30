import { Node } from '@xyflow/react'
import { WhatsappMedia } from '../../../models/Node.model'

export const WHATSAPP_VIDEO_NODE_KEY = 'whatsapp-video'

export type WhatsappVideoNodeData = { media: WhatsappMedia; caption?: string }

export type WhatsappVideoNodeType = Node<WhatsappVideoNodeData, typeof WHATSAPP_VIDEO_NODE_KEY>
