import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Edge,
} from "@xyflow/react";
import { AppNode, initialNodes, NodeTypeKeys } from "../nodes";
import { initialEdges } from "../edges";

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[] | AppNode) => void;
  setEdges: (edges: Edge[]) => void;

  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  nodeToAdd: NodeTypeKeys | null;
  setNodeToAdd: (nodeToAdd: NodeTypeKeys | null) => void;
};

const useAppStore = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes: [...get().nodes, ...(Array.isArray(nodes) ? nodes : [nodes])] });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  selectedNodeId: null,
  setSelectedNodeId: (selectedNodeId) => {
    set({ selectedNodeId });
  },
  nodeToAdd: null,
  setNodeToAdd: (nodeToAdd: AppState["nodeToAdd"]) => {
    set({ nodeToAdd });
  },
}));

export const appselector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  // setEdges: state.setEdges,
  setSelectedNodeId: state.setSelectedNodeId,
});

export default useAppStore;
