import { ReactFlowJsonObject } from '@xyflow/react'
import { FLOW_LOCAL_STORAGE_KEY } from './constants'
import { AppNode } from './nodes'
import { AppEdge } from './edges'

export const getRandomId = () => Math.random().toString(36).substring(7)

export const getFlowFromLocalStorage = () => {
  const data = localStorage.getItem(FLOW_LOCAL_STORAGE_KEY)
  const parsedData = data ? (JSON.parse(data) as ReactFlowJsonObject<AppNode, AppEdge>) : null
  return parsedData
}


export const getSourceHandleConnection = (sourceNodeId: string, handleName: string, edges: AppEdge[]) => {
  const connections = edges.filter((edge) => edge.source === sourceNodeId && edge.sourceHandle === handleName)
  return connections
}