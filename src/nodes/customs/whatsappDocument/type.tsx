import { Node } from '@xyflow/react'

export const WHATSAPP_DOCUMENT_NODE_KEY = 'whatsapp-document'

export type WhatsappDocumentNodeData = {
  id?: string
  url?: string
}

export type WhatsappDocumentNodeType = Node<WhatsappDocumentNodeData, typeof WHATSAPP_DOCUMENT_NODE_KEY>
