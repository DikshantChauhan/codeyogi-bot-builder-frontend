import { Node } from '@xyflow/react'

export const END_NODE_KEY = 'end'

export type EndNodeData = Record<string, never>

export type EndNodeType = Node<EndNodeData, typeof END_NODE_KEY> 