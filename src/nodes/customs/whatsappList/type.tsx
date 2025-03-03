import { Node } from '@xyflow/react'

export const WHATSAPP_LIST_NODE_KEY = 'whatsapp-list'

export type WhatsappListNodeData = {
  text: string
  buttons: string[]
  footer?: string
  header?: string
  buttonLabel?: string
  correctIndex: number
}

export type WhatsappListNodeType = Node<WhatsappListNodeData, typeof WHATSAPP_LIST_NODE_KEY>
