import { Edge, HandleType, ReactFlowJsonObject } from '@xyflow/react'
import { FLOW_LOCAL_STORAGE_KEY } from './constants'
import { AppNode } from './nodes'

const ID_SEPRATOR = '-'

export const getRandomId = () => Math.random().toString(36).substring(7)

export const getFlowFromLocalStorage = () => {
  const data = localStorage.getItem(FLOW_LOCAL_STORAGE_KEY)
  const parsedData = data ? (JSON.parse(data) as ReactFlowJsonObject<AppNode, Edge>) : null
  return parsedData
}

export type EdgeId =
  | `${string}${typeof ID_SEPRATOR}${HandleType}`
  | `${string}${typeof ID_SEPRATOR}${HandleType}${typeof ID_SEPRATOR}${string}${typeof ID_SEPRATOR}${number}`

export const getEdgeId = (nodeId: string, type: HandleType, multiEdgeData?: { dataKey: string; index: number }): EdgeId => {
  return `${nodeId}${ID_SEPRATOR}${type}${multiEdgeData ? ID_SEPRATOR + multiEdgeData.dataKey + ID_SEPRATOR + multiEdgeData.index : ''}` as EdgeId
}

export const parseEdgeId = (edgeId: EdgeId) => {
  const [nodeId, type, dataKey, index] = edgeId.split(ID_SEPRATOR)
  return { nodeId, type: type as HandleType, dataKey: dataKey ? dataKey : undefined, index: index ? parseInt(index) : undefined }
}
