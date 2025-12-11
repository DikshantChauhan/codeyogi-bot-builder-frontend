import { Node } from '@xyflow/react'

export const WHATSAPP_USER_UPDATE_NODE_KEY = 'whatsapp-user-update'

export type WhatsappUserUpdateNodeData = {
  name?: string
  level_id?: string
  node_id?: string
  age?: number
  whatsapp_onboarding_dise_code?: string
  whatsapp_onboarding_school_name?: string
  whatsapp_onboarding_course?: string
  campaign_id?: string
  current_level_score?: string
  total_score?: string
}

export type WhatsappUserUpdateNodeType = Node<WhatsappUserUpdateNodeData, typeof WHATSAPP_USER_UPDATE_NODE_KEY>
