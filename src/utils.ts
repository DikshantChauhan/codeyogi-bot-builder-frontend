import { XYPosition } from '@xyflow/react'
import { AppEdge } from './models/Edge.model'
import { Flow } from './models/Flow.model'
import { AppNode } from './models/Node.model'

export const getRandomId = (length?: number) =>
  Math.random()
    .toString(36)
    .substring(length || 7)

export const getSourceHandleConnection = (sourceNodeId: string, handleName: string, edges: AppEdge[]) => {
  const connections = edges.filter((edge) => edge.source === sourceNodeId && (edge.sourceHandle ? edge.sourceHandle === handleName : true))
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

export const parseNodeSelectionString = (nodeSelectionString: string): { nodes: AppNode[]; edges: AppEdge[] } | null => {
  try {
    const nodeSelection = JSON.parse(nodeSelectionString) as { nodes: AppNode[]; edges: AppEdge[] }
    if (nodeSelection.nodes.length > 0) {
      return nodeSelection
    }
    return null
  } catch (error) {
    return null
  }
}

export const cloneSelectionNodeData = (
  {
    nodes: oldNodes,
    edges: oldEdges,
  }: {
    nodes: AppNode[]
    edges: AppEdge[]
  },
  positionOffset?: { x: number; y: number },
  selected: boolean = false
): { nodes: AppNode[]; edges: AppEdge[] } => {
  const newNodesMapByOldNodesIds = new Map<string, AppNode>()
  oldNodes.forEach((node) => {
    newNodesMapByOldNodesIds.set(node.id, {
      ...node,
      id: getRandomId(),
      selected,
      position: positionOffset ? { x: node.position.x + positionOffset.x, y: node.position.y + positionOffset.y } : node.position,
    })
  })

  const newEdges: AppEdge[] = []
  oldEdges.forEach((edge) => {
    const source = newNodesMapByOldNodesIds.get(edge.source)
    const target = newNodesMapByOldNodesIds.get(edge.target)
    if (!source || !target) {
      return
    }
    newEdges.push({
      ...edge,
      id: getRandomId(10),
      source: source.id,
      target: target.id,
    })
  })

  return { nodes: Array.from(newNodesMapByOldNodesIds.values()), edges: newEdges }
}

export const getOffsetFromCentroid = (nodes: AppNode[], pastePosition: XYPosition): XYPosition => {
  if (nodes.length === 0) return { x: 0, y: 0 }

  // Step 1: Calculate centroid
  const total = nodes.reduce(
    (acc, node) => {
      acc.x += node.position.x
      acc.y += node.position.y
      return acc
    },
    { x: 0, y: 0 }
  )

  const centroid = {
    x: total.x / nodes.length,
    y: total.y / nodes.length,
  }

  // Step 2: Calculate offset from centroid to paste position
  return {
    x: pastePosition.x - centroid.x,
    y: pastePosition.y - centroid.y,
  }
}

export const sanitizeEdges = (edges: AppEdge[], nodes: AppNode[]): AppEdge[] => {
  return edges.filter((edge) => {
    const isTargetPresent = nodes.find((node) => node.id === edge.target)
    const isSourcePresent = nodes.find((node) => node.id === edge.source)
    return isTargetPresent && isSourcePresent
  })
}