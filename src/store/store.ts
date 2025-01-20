import { create } from 'zustand'
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Edge,
  Connection,
  reconnectEdge,
  HandleType,
} from '@xyflow/react'
import { AppNode, initialNodes, NodeTypeKeys } from '../nodes'
import { initialEdges } from '../edges'

export type AppState = {
  nodes: AppNode[]
  edges: Edge[]
  onNodesChange: OnNodesChange<AppNode>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  setNodes: (nodes: AppNode[] | AppNode) => void
  setEdges: (edges: Edge[]) => void

  selectedNodeId: string | null
  setSelectedNodeId: (id: string | null) => void
  nodeToAdd: NodeTypeKeys | null
  setNodeToAdd: (nodeToAdd: NodeTypeKeys | null) => void
  editNodeData: (nodeId: string, nodeData: AppNode['data']) => void
  onReconnect: (edge: Edge, connection: Connection) => void
  onReconnectStart: (event: React.MouseEvent, edge: Edge, handleType: HandleType) => void
  onReconnectEnd: (event: MouseEvent | TouchEvent, edge: Edge, handleType: HandleType) => void
  reconnectingEdge: Edge | null
}

const useAppStore = create<AppState>((set, get) => ({
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
  setNodes: (nodes) => {
    set({ nodes: [...get().nodes, ...(Array.isArray(nodes) ? nodes : [nodes])] })
  },
  setEdges: (edges) => {
    set({ edges })
  },
  selectedNodeId: null,
  setSelectedNodeId: (selectedNodeId) => {
    set({ selectedNodeId, nodeToAdd: null })
  },
  nodeToAdd: null,
  setNodeToAdd: (nodeToAdd: AppState['nodeToAdd']) => {
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

export default useAppStore
