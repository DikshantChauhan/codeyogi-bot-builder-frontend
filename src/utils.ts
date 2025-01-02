import { Edge, ReactFlowJsonObject } from '@xyflow/react'
import { FLOW_LOCAL_STORAGE_KEY } from './constants'
import { AppNode } from './nodes'

const SEPRATOR = '-'

export const getRandomId = () => Math.random().toString(36).substring(7)

export const getFlowFromLocalStorage = () => {
  const data = localStorage.getItem(FLOW_LOCAL_STORAGE_KEY)
  const parsedData = data ? (JSON.parse(data) as ReactFlowJsonObject<AppNode, Edge>) : null
  return parsedData
}

export type HandleName = `${string}${typeof SEPRATOR}${number}`

export const getHandleName = (dataKey: string, index: number): HandleName => {
  return (dataKey + SEPRATOR + index) as HandleName
}

export const parseEdgeId = (edgeId: HandleName) => {
  const [dataKey, index] = edgeId.split(SEPRATOR)
  return { dataKey: dataKey, index: parseInt(index) }
}

export const getSourceHandleConnection = (sourceNodeId: string, handleName: string, edges: Edge[]) => {
  const connections = edges.filter((edge) => edge.source === sourceNodeId && edge.sourceHandle === handleName)
  return connections
}