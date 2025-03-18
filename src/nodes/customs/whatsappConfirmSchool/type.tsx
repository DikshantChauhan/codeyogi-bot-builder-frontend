import { Node } from '@xyflow/react'

export const WHATSAPP_CONFIRM_SCHOOL_NODE_KEY = 'whatsapp-confirm-school'

export const WhatsappConfirmSchoolPaths = ['No', 'Confirm'] as const
export type WhatsappConfirmSchoolNodeData = {
  text: string
  paths: typeof WhatsappConfirmSchoolPaths
}

export type WhatsappConfirmSchoolNodeType = Node<WhatsappConfirmSchoolNodeData, typeof WHATSAPP_CONFIRM_SCHOOL_NODE_KEY>
