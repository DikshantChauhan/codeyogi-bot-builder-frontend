import { AppEdge } from './models/Edge.model'
import { Flow } from './models/Flow.model'
import { AppNode, nodesRegistry } from './models/Node.model'

export const getRandomId = () => Math.random().toString(36).substring(7)

export const getSourceHandleConnection = (sourceNodeId: string, handleName: string, edges: AppEdge[]) => {
  const connections = edges.filter((edge) => edge.source === sourceNodeId && edge.sourceHandle === handleName)
  return connections
}

const getLocalFlowKey = (flowId: string) => `flow_${flowId}`

export const getLocalFlow = (payload: { flowId: string } | { localFlowId: string }): Flow | null => {
  let flowString: string | null
  if ('flowId' in payload) {
    flowString = localStorage.getItem(getLocalFlowKey(payload.flowId))
  } else {
    flowString = localStorage.getItem(payload.localFlowId)
  }
  return flowString ? JSON.parse(flowString) : null
}

export const setLocalFlow = (flow: Flow) => {
  localStorage.setItem(getLocalFlowKey(flow.id), JSON.stringify(flow))
}

export const shouldUpdateFlow = (flow: Flow): boolean => {
  const localFlow = getLocalFlow({ flowId: flow.id })
  if (!localFlow) {
    return true
  }
  const isFlowUpdatedOnServer = flow.modified !== localFlow.modified
  if (isFlowUpdatedOnServer) {
    return true
  }

  return JSON.stringify(flow) === JSON.stringify(localFlow)
}

export const parseNodeString = (nodeString: string): AppNode | null => {
  try {
    const node = JSON.parse(nodeString) as AppNode
    if (node.type && node.data && node.position && node.id) {
      return node
    }
    return null
  } catch (error) {
    return null
  }
}
