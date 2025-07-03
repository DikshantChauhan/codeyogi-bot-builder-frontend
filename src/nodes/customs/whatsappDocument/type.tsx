import { Node } from '@xyflow/react'

export const WHATSAPP_DOCUMENT_NODE_KEY = 'whatsapp-document'

export type WhatsappDocumentNodeData = {
  id?: string // Only if using uploaded media
  link?: string // Only if using hosted media (not recommended)
  caption?: string // Media caption text
  filename?: string // Media filename
}

export type WhatsappDocumentNodeType = Node<WhatsappDocumentNodeData, typeof WHATSAPP_DOCUMENT_NODE_KEY>
