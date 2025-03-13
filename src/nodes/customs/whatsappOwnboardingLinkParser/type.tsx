import { Node } from '@xyflow/react'

export const WHATSAPP_OWNBOARDING_LINK_PARSER_NODE_KEY = 'whatsapp-ownboarding-link-parser'

export const WhatsappOwnboardingLinkParserNodePaths = ['teacher', 'student', 'unknown'] as const
export type WhatsappOwnboardingLinkParserNodeData = {
  link: string
  paths: typeof WhatsappOwnboardingLinkParserNodePaths
}

export type WhatsappOwnboardingLinkParserNodeType = Node<WhatsappOwnboardingLinkParserNodeData, typeof WHATSAPP_OWNBOARDING_LINK_PARSER_NODE_KEY>
