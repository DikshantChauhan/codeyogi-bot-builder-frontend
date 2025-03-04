import { Node } from '@xyflow/react'

export const WHATSAPP_USER_UPDATE_NODE_KEY = 'whatsapp-user-update'

export type WhatsappUserUpdateNodeData = {
  name?: string
  level_id?: string
  node_id?: string
  age?: string
}

export type WhatsappUserUpdateNodeType = Node<WhatsappUserUpdateNodeData, typeof WHATSAPP_USER_UPDATE_NODE_KEY>
