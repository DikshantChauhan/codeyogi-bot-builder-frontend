import { create } from 'zustand'
import { flowsApi } from '../api/flows'
import { toast } from 'react-toastify'
import { AppNode } from '../nodes'
import { NodeTypeKeys } from '../nodes'
import { ReactFlowJsonObject } from '@xyflow/react'
import { AppEdge } from '../edges'
import useReactFlowStore from './reactFlow.store'

export interface Flow {
  name: string
  nodes: NodeTypeKeys[]
  type: 'campaign' | 'nudge'
  data: Omit<ReactFlowJsonObject<AppNode, AppEdge>, 'viewport'>
  createdAt: string
}

type FlowState = {
  flows: Flow[]
  initLoading: boolean
  addFlow: (flowData: Omit<Flow, 'createdAt'>) => Promise<Flow>
  deleteFlow: (name: string) => Promise<void>
  initFlows: () => Promise<void>
  selectedFlowName: string | null
  setSelectedFlowName: (flowName: string) => void
  updateFlow: () => Promise<void>
  getSelectedFlow: () => Flow | null
  getSelectedFlowAllowedNodes: () => NodeTypeKeys[]
}

const useFlowStore = create<FlowState>((set, get) => ({
  flows: [],
  initLoading: true,

  initFlows: async () => {
    try {
      const data = await flowsApi.listFlows()
      set({ flows: data, initLoading: false })
    } catch (err) {
      toast.error('Failed to load flows')
      set({ initLoading: false })
    }
  },

  addFlow: async (newFlow) => {
    try {
      const flow = await flowsApi.addFlow(newFlow)
      set((state) => ({ flows: [flow, ...state.flows] }))
      return flow
    } catch (err) {
      toast.error('Failed to add flow')
      throw err
    }
  },

  deleteFlow: async (name) => {
    try {
      await flowsApi.deleteFlow(name)
      set((state) => ({
        flows: state.flows.filter((flow) => flow.name !== name),
      }))
    } catch (err) {
      toast.error('Failed to delete flow')
      throw err
    }
  },

  selectedFlowName: null,

  setSelectedFlowName: (flowName: string) => {
    const selectedFlow = get().flows.find((flow) => flow.name === flowName)
    if (!selectedFlow) {
      toast.error(`Selected flow ${flowName} not found`)
      return
    }
    useReactFlowStore.getState().nodes = selectedFlow.data.nodes
    useReactFlowStore.getState().edges = selectedFlow.data.edges
    set({ selectedFlowName: flowName })
  },

  updateFlow: async () => {
    const selectedFlow = get().getSelectedFlow()
    if (!selectedFlow) {
      toast.error('No flow selected')
      return
    }
    const nodes = useReactFlowStore.getState().nodes
    const edges = useReactFlowStore.getState().edges
    const updatedFlow = { ...selectedFlow, data: { nodes, edges } }

    await flowsApi.updateFlow(updatedFlow)
    set((state) => ({
      flows: state.flows.map((f) => (f.name === selectedFlow.name ? updatedFlow : f)),
    }))
  },

  getSelectedFlow: () => {
    const selectedFlow = get().flows.find((flow) => flow.name === get().selectedFlowName)
    return selectedFlow || null
  },

  getSelectedFlowAllowedNodes: () => {
    const selectedFlow = get().getSelectedFlow()
    return selectedFlow?.nodes || []
  },
}))

export default useFlowStore
