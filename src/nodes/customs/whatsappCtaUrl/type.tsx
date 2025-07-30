import { Node } from '@xyflow/react'
import { MessageHeader } from '../../../models/Node.model'

export const WHATSAPP_CTA_URL_NODE_KEY = 'whatsapp-cta-url'

export type WhatsappCtaUrlNodeData = {
  header?: MessageHeader
  bodyText: string
  buttonText: string
  buttonUrl: string
  footerText?: string
}

export type WhatsappCtaUrlNodeType = Node<WhatsappCtaUrlNodeData, typeof WHATSAPP_CTA_URL_NODE_KEY>
