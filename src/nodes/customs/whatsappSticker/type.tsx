import { Node } from '@xyflow/react'

export const WHATSAPP_STICKER_NODE_KEY = 'whatsapp-sticker'

export type WhatsappStickerNodeData = {
  id?: string
  url?: string
}

export type WhatsappStickerNodeType = Node<WhatsappStickerNodeData, typeof WHATSAPP_STICKER_NODE_KEY>
