import { Node } from '@xyflow/react'

export const END_NODE_KEY = 'end'

export type EndNodeData = {
  text?: string
}

export type EndNodeType = Node<EndNodeData, typeof END_NODE_KEY>
