import { AppEdge } from './models/Edge.model'

export const getRandomId = () => Math.random().toString(36).substring(7)

export const getSourceHandleConnection = (sourceNodeId: string, handleName: string, edges: AppEdge[]) => {
  const connections = edges.filter((edge) => edge.source === sourceNodeId && edge.sourceHandle === handleName)
  return connections
}
