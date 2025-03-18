import { Node } from '@xyflow/react'

export const WHATSAPP_VALIDATE_DISE_CODE_NODE_KEY = 'whatsapp-validate-dise-code'

export const WhatsappValidateDiseCodePaths = ['valid', 'invalid'] as const
export type WhatsappValidateDiseCodeNodeData = {
  paths: typeof WhatsappValidateDiseCodePaths
}

export type WhatsappValidateDiseCodeNodeType = Node<WhatsappValidateDiseCodeNodeData, typeof WHATSAPP_VALIDATE_DISE_CODE_NODE_KEY>
