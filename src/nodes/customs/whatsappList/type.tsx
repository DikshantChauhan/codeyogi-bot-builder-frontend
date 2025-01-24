import { Node } from '@xyflow/react'

export const WHATSAPP_LIST_NODE_KEY = 'whatsapp-list'

export type ListItem = {
  title: string
  description?: string
}

export type WhatsappListNodeData = {
  header: string
  body: string
  buttonText: string
  items: ListItem[]
}

export type WhatsappListNodeType = Node<WhatsappListNodeData, typeof WHATSAPP_LIST_NODE_KEY>
