import type { BuiltInEdge, EdgeTypes } from '@xyflow/react'

import { DIRECTIONAL_EDGE_KEY, DirectionalEdgeType } from '../edges/custom/directional/type'
import DirectionalEdge from '../edges/custom/directional/Edge'

export const initialEdges: AppEdge[] = []

export const edgeTypes = {
  [DIRECTIONAL_EDGE_KEY]: DirectionalEdge,
} satisfies EdgeTypes

export type AppEdge = BuiltInEdge | DirectionalEdgeType