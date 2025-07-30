import { Node } from '@xyflow/react'
import { WhatsappMedia } from '../../../models/Node.model'

export const WHATSAPP_IMAGE_NODE_KEY = 'whatsapp-image'

export type WhatsappImageNodeData = {
  media: WhatsappMedia
  caption?: string
}

export type WhatsappImageNodeType = Node<WhatsappImageNodeData, typeof WHATSAPP_IMAGE_NODE_KEY>
