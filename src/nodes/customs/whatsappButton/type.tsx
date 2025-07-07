import { Node } from '@xyflow/react'
import { MessageHeader } from '../../../models/Node.model'

export const WHATSAPP_BUTTON_NODE_KEY = 'whatsapp-button'

export type WhatsappButtonNodeData = {
  text: string
  buttons: string[]
  footer?: string
  header?: MessageHeader
}

export type WhatsappButtonNodeType = Node<WhatsappButtonNodeData, typeof WHATSAPP_BUTTON_NODE_KEY>
