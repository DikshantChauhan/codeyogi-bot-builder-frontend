import { create } from 'zustand'
import { flowsApi } from '../api/flows'
import { toast } from 'react-toastify'
import { AppNode } from '../nodes'
import { NodeTypeKeys } from '../nodes'
import { ReactFlowJsonObject } from '@xyflow/react'
import { AppEdge } from '../edges'
import { reactFlowStore } from './reactFlow.store'
import { createStrictStore } from './util'

export type SubFlowsMapValue = 'inherit' | 'none' | (string & {})
export type SubFlowsMap = { [nodeId: string]: { nudge: SubFlowsMapValue; validator: SubFlowsMapValue } }

export interface Flow {
  name: string
  nodes: NodeTypeKeys[]
  type: 'campaign' | 'nudge' | 'validator'
  data: Omit<ReactFlowJsonObject<AppNode, AppEdge>, 'viewport'>
  subFlowsMap: SubFlowsMap
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
  getSelectedFlow: () => Flow | null
  getSelectedFlowAllowedNodes: () => NodeTypeKeys[]
  saveFlow: () => Promise<void>
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
    reactFlowStore.setState({ nodes: selectedFlow.data.nodes, edges: selectedFlow.data.edges, nodesSubFlowsMap: selectedFlow.subFlowsMap })
    set({ selectedFlowName: flowName })
  },

  getSelectedFlow: () => {
    const selectedFlow = get().flows.find((flow) => flow.name === get().selectedFlowName)
    return selectedFlow || null
  },

  getSelectedFlowAllowedNodes: () => {
    const selectedFlow = get().getSelectedFlow()
    return selectedFlow?.nodes || []
  },

  saveFlow: async () => {
    const selectedFlow = get().getSelectedFlow()
    if (!selectedFlow) {
      toast.error('No flow selected')
      return
    }
    const nodes = reactFlowStore.getState().nodes
    const edges = reactFlowStore.getState().edges

    const subFlowsMap = reactFlowStore.getState().nodesSubFlowsMap

    const updatedFlow = { ...selectedFlow, data: { nodes, edges }, subFlowsMap }

    await flowsApi.updateFlow(updatedFlow)
    set({ flows: get().flows.map((flow) => (flow.name === selectedFlow.name ? updatedFlow : flow)) })
  },
}))

export const flowStore = useFlowStore

export default createStrictStore(useFlowStore)
