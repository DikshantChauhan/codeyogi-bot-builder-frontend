import type { BuiltInEdge, EdgeTypes } from '@xyflow/react'
import { getFlowFromLocalStorage } from '../utils'

import { DIRECTIONAL_EDGE_KEY, DirectionalEdgeType } from './custom/directional/type'
import DirectionalEdge from './custom/directional/Edge'

export const initialEdges: AppEdge[] = getFlowFromLocalStorage()?.edges || [
  // {
  //   id: '1',
  //   source: '1',
  //   target: '2',
  //   type: "directional",
  // },
]

export const edgeTypes = {
  [DIRECTIONAL_EDGE_KEY]: DirectionalEdge,
} satisfies EdgeTypes

export type AppEdge = BuiltInEdge | DirectionalEdgeType
