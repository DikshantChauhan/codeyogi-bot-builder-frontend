import { Node } from '@xyflow/react'

export const IF_ELSE_NODE_KEY = 'if-else'

export type IfElseNodeData = {
  conditions: string[]
}

export type IfElseNodeType = Node<IfElseNodeData, typeof IF_ELSE_NODE_KEY>
