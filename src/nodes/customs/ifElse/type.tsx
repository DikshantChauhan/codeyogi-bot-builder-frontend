import { Node } from '@xyflow/react'

export const IF_ELSE_NODE_KEY = 'if-else'

export type IfElseNodeData = {
  conditions: {
    variable: string
    condition: '==' | '!=' | '>' | '<' | '>=' | '<='
    type: 'string' | 'number' | 'boolean' | 'variable' | 'null'
    value: string
  }[]
}

export type IfElseNodeType = Node<IfElseNodeData, typeof IF_ELSE_NODE_KEY>
