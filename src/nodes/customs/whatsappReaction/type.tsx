import { Node } from '@xyflow/react'

export const WHATSAPP_REACTION_NODE_KEY = 'whatsapp-reaction'

export type WhatsappReactionNodeData = {
  emoji: string
  messageId?: string
}

export type WhatsappReactionNodeType = Node<WhatsappReactionNodeData, typeof WHATSAPP_REACTION_NODE_KEY>
