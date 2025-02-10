import { AppEdge } from './Edge.model'
import { AppNode } from './Node.model'

export interface Flow {
  id: string
  name: string
  type: 'level' | 'nudge'
  data: {
    nodes: AppNode[]
    edges: AppEdge[]
  }
  createdAt: string
  updatedAt: string
}
