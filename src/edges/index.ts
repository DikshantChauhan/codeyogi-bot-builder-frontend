import type { Edge, EdgeTypes } from '@xyflow/react'
import { getFlowFromLocalStorage } from '../utils'

export const initialEdges: Edge[] = getFlowFromLocalStorage()?.edges || []

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes
