import { create } from 'zustand'
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Connection,
  reconnectEdge,
  HandleType,
} from '@xyflow/react'
import { AppNode, initialNodes, NodeTypeKeys } from '../nodes'
import { AppEdge, initialEdges } from '../edges'

export type ReactFlowState = {
  nodes: AppNode[]
  edges: AppEdge[]
  onNodesChange: OnNodesChange<AppNode>
  onEdgesChange: OnEdgesChange<AppEdge>
  onConnect: OnConnect
  setNode: (nodes: AppNode) => void

  selectedNodeId: string | null
  setSelectedNodeId: (id: string | null) => void
  nodeToAdd: NodeTypeKeys | null
  setNodeToAdd: (nodeToAdd: NodeTypeKeys | null) => void
  editNodeData: (nodeId: string, nodeData: AppNode['data']) => void
  onReconnect: (edge: AppEdge, connection: Connection) => void
  onReconnectStart: (event: React.MouseEvent, edge: AppEdge, handleType: HandleType) => void
  onReconnectEnd: (event: MouseEvent | TouchEvent, edge: AppEdge, handleType: HandleType) => void
  reconnectingEdge: AppEdge | null
}

const useReactFlowStore = create<ReactFlowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
  setNode: (node) => {
    set({ nodes: [...get().nodes, node] })
  },
  selectedNodeId: null,
  setSelectedNodeId: (selectedNodeId) => {
    set({ selectedNodeId, nodeToAdd: null })
  },
  nodeToAdd: null,
  setNodeToAdd: (nodeToAdd: ReactFlowState['nodeToAdd']) => {
    set({ nodeToAdd, selectedNodeId: null })
  },
  editNodeData: (nodeId, nodeData) => {
    const updated = get().nodes.map((node) => (node.id === nodeId ? { ...node, data: nodeData } : node)) as AppNode[]
    set({ nodes: updated })
  },
  onReconnect: (oldEdge, newConnection) => {
    const newEdges = reconnectEdge(oldEdge, newConnection, get().edges)
    set({ edges: newEdges })
  },
  onReconnectStart: (_, edge) => {
    set({ reconnectingEdge: edge })
  },
  onReconnectEnd: () => {
    set({ reconnectingEdge: null })
  },
  reconnectingEdge: null,
}))

export default useReactFlowStore
