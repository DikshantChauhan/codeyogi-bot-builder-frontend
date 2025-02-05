import { Node } from '@xyflow/react'

export const PROMPT_NODE_KEY = 'prompt'

export type PromptNodeData = {}

export type PromptNodeType = Node<PromptNodeData, typeof PROMPT_NODE_KEY>
