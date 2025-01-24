import { Edge } from '@xyflow/react'

export const DIRECTIONAL_EDGE_KEY = 'directional'

export type DirectionalEdgeData = {}

export type DirectionalEdgeType = Edge<DirectionalEdgeData, typeof DIRECTIONAL_EDGE_KEY>
