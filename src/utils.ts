import { XYPosition } from '@xyflow/react'
import { AppEdge } from './models/Edge.model'
import { Flow } from './models/Flow.model'
import { AppNode } from './models/Node.model'
import { START_NODE_KEY } from './nodes/customs/start/type'
import { END_NODE_KEY } from './nodes/customs/end/type'

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
      selected,
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
  const sanitizeEdges: AppEdge[] = []
  edges.forEach((edge) => {
    const isTargetPresent = nodes.find((node) => node.id === edge.target)
    const isSourcePresent = nodes.find((node) => node.id === edge.source)
    if (isTargetPresent && isSourcePresent) {
      sanitizeEdges.push({ ...edge })
    }
  })

  return sanitizeEdges
}

export function validateFlow(
  nodes: AppNode[],
  edges: AppEdge[]
): {
  error: string
  cause: {
    nodeIds?: string[]
    edgeIds?: string[]
  }
} | null {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  // 1. Find start node
  const startNodes = nodes.filter((n) => n.type === START_NODE_KEY)
  if (startNodes.length !== 1) {
    return {
      error: 'Flow must contain exactly one start node.',
      cause: { nodeIds: startNodes.map((n) => n.id) },
    }
  }

  const startNode = startNodes[0]

  const getOutgoingEdges = (nodeId: string): AppEdge[] => edges.filter((e) => e.source === nodeId)

  const getExpectedOutgoingCount = (node: AppNode): number => {
    if (!node.data || typeof node.data !== 'object') return 0

    return Object.values(node.data).reduce((count, value) => {
      return Array.isArray(value) ? count + value.length : count
    }, 0)
  }

  const isEndNode = (node: AppNode) => node.type === END_NODE_KEY

  // 2. Check each node has correct number of outgoing edges
  for (const node of nodes) {
    const expectedCount = getExpectedOutgoingCount(node)
    const actualCount = getOutgoingEdges(node.id).length

    if (actualCount < expectedCount) {
      return {
        error: `Node "${node.id}" has ${actualCount} outgoing edges, expected ${expectedCount}.`,
        cause: { nodeIds: [node.id] },
      }
    }
  }

  // 3. Check every edge connects existing nodes
  for (const edge of edges) {
    if (!nodeMap.has(edge.source) || !nodeMap.has(edge.target)) {
      return {
        error: `Edge "${edge.id}" has invalid source or target.`,
        cause: { edgeIds: [edge.id] },
      }
    }
  }

  // 4. Traverse from start node: check reachability
  const visitedFromStart = new Set<string>()
  const dfsFromStart = (nodeId: string) => {
    if (visitedFromStart.has(nodeId)) return
    visitedFromStart.add(nodeId)

    for (const edge of getOutgoingEdges(nodeId)) {
      dfsFromStart(edge.target)
    }
  }
  dfsFromStart(startNode.id)

  for (const node of nodes) {
    if (!visitedFromStart.has(node.id)) {
      return {
        error: `Node "${node.id}" is not reachable from the start node.`,
        cause: { nodeIds: [node.id] },
      }
    }
  }

  // 5. Ensure each node (except end) has path to an end node
  const endNodeIds = new Set(nodes.filter((n) => isEndNode(n)).map((n) => n.id))

  const hasPathToEnd = (nodeId: string, visited = new Set<string>()): boolean => {
    if (visited.has(nodeId)) return false
    visited.add(nodeId)

    if (endNodeIds.has(nodeId)) return true

    const nextEdges = getOutgoingEdges(nodeId)
    for (const edge of nextEdges) {
      if (hasPathToEnd(edge.target, visited)) return true
    }

    return false
  }

  for (const node of nodes) {
    if (isEndNode(node)) {
      if (!visitedFromStart.has(node.id)) {
        return {
          error: `End node "${node.id}" is not reachable from the start node.`,
          cause: { nodeIds: [node.id] },
        }
      }
      continue
    }

    const canReachEnd = hasPathToEnd(node.id)
    if (!canReachEnd) {
      return {
        error: `Node "${node.id}" cannot reach any end node.`,
        cause: { nodeIds: [node.id] },
      }
    }
  }

  return null // ✅ All validations passed
}
