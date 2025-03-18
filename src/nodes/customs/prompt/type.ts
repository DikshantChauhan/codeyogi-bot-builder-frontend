import { Node } from '@xyflow/react'

export const PROMPT_NODE_KEY = 'prompt'

export type PromptNodeData = {
  type: 'text' | 'number'
  min?: number
  max?: number
}

export type PromptNodeType = Node<PromptNodeData, typeof PROMPT_NODE_KEY>
