import { Node } from '@xyflow/react'

export const WHATSAPP_LINK_BUTTON_NODE_KEY = 'whatsapp-link-button'

export type WhatsappLinkButtonNodeData = {
  text: string
  label: string
  url: string
}

export type WhatsappLinkButtonNodeType = Node<WhatsappLinkButtonNodeData, typeof WHATSAPP_LINK_BUTTON_NODE_KEY>
