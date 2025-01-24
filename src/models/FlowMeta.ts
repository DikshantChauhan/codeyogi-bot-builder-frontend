import { NodeTypeKeys } from '../nodes'

export interface FlowMeta {
  name: string
  nodes: NodeTypeKeys[]
  type: 'campaign' | 'nudge'
  createdAt: string
}
