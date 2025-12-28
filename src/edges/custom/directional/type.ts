import { Edge } from '@xyflow/react'

export const DIRECTIONAL_EDGE_KEY = 'directional'

export type DirectionalEdgeData = Record<string, never>

export type DirectionalEdgeType = Edge<DirectionalEdgeData, typeof DIRECTIONAL_EDGE_KEY>
