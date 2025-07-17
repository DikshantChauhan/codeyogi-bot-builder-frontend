import { Node } from '@xyflow/react'

export const WHATSAPP_ONBOARDING_LINK_PARSER_NODE_KEY = 'whatsapp-onboarding-link-parser'

export const WhatsappOnboardingLinkParserNodePaths = ['teacher', 'student', 'unknown'] as const
export type WhatsappOnboardingLinkParserNodeData = {
  link: string
  paths: typeof WhatsappOnboardingLinkParserNodePaths
}

export type WhatsappOnboardingLinkParserNodeType = Node<WhatsappOnboardingLinkParserNodeData, typeof WHATSAPP_ONBOARDING_LINK_PARSER_NODE_KEY>
