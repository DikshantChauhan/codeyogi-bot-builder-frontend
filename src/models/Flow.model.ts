import { AppEdge } from './Edge.model'
import { AppNode } from './Node.model'
import { Entity } from './Entity.model'

export type FlowType = 'level' | 'nudge'

export interface Flow extends Entity {
  name: string
  type: FlowType
  data: {
    nodes: AppNode[]
    edges: AppEdge[]
  }
}
