import { Node } from '@xyflow/react'
import { WhatsappMedia } from '../../../models/Node.model'

export const WHATSAPP_DOCUMENT_NODE_KEY = 'whatsapp-document'

export type WhatsappDocumentNodeData = {
  media: WhatsappMedia
  caption?: string
  filename?: string
}

export type WhatsappDocumentNodeType = Node<WhatsappDocumentNodeData, typeof WHATSAPP_DOCUMENT_NODE_KEY>
