import { Node } from '@xyflow/react'

export const WHATSAPP_FORM_NODE_KEY = 'whatsapp-form'

export type FormField = {
  label: string
  type: 'text' | 'number' | 'email' | 'phone' | 'date'
  required: boolean
}

export type WhatsappFormNodeData = {
  title: string
  description: string
  fields: FormField[]
}

export type WhatsappFormNodeType = Node<WhatsappFormNodeData, typeof WHATSAPP_FORM_NODE_KEY>
