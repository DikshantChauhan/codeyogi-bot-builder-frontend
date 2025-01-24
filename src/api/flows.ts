import { FlowMeta } from '../models/FlowMeta'

const STORAGE_KEY = 'flows'

export const flowsApi = {
  listFlows: (): Promise<FlowMeta[]> => {
    return new Promise((resolve) => {
      const flows = localStorage.getItem(STORAGE_KEY)
      resolve(flows ? JSON.parse(flows) : [])
    })
  },

  addFlow: async (flow: Omit<FlowMeta, 'createdAt'>): Promise<FlowMeta> => {
    const flows = await flowsApi.listFlows()
    const newFlow: FlowMeta = {
      ...flow,
      createdAt: new Date().toISOString(),
    }
    flows.unshift(newFlow)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flows))
    return newFlow
  },

  deleteFlow: async (name: string): Promise<void> => {
    const flows = await flowsApi.listFlows()
    const updatedFlows = flows.filter((flow) => flow.name !== name)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFlows))
  },
}
