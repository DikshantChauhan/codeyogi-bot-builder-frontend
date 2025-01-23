import { Node } from '@xyflow/react'

export const START_NODE_KEY = 'start'

export type StartNodeData = {}

export type StartNodeType = Node<StartNodeData, typeof START_NODE_KEY>
