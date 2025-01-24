import { Node } from '@xyflow/react'

export const WHATSAPP_AUDIO_NODE_KEY = 'whatsapp-audio'

export type WhatsappAudioNodeData = {
  id?: string
  url?: string
}

export type WhatsappAudioNodeType = Node<WhatsappAudioNodeData, typeof WHATSAPP_AUDIO_NODE_KEY>
