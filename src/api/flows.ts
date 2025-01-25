import { Flow } from "../store/flow.store"

const STORAGE_KEY = 'flows'

export const flowsApi = {
  listFlows: (): Promise<Flow[]> => {
    return new Promise((resolve) => {
      const flows = localStorage.getItem(STORAGE_KEY)
      resolve(flows ? JSON.parse(flows) : [])
    })
  },

  addFlow: async (flow: Omit<Flow, 'createdAt'>): Promise<Flow> => {
    const flows = await flowsApi.listFlows()
    const newFlow: Flow = {
      ...flow,
      createdAt: new Date().toISOString(),
    }
    flows.unshift(newFlow)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flows))
    return newFlow
  },

  updateFlow: async (flow: Flow): Promise<Flow> => {
    const flows = await flowsApi.listFlows()
    const updatedFlows = flows.map((f) => (f.name === flow.name ? flow : f))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFlows))
    return flow
  },

  deleteFlow: async (name: string): Promise<void> => {
    const flows = await flowsApi.listFlows()
    const updatedFlows = flows.filter((flow) => flow.name !== name)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFlows))
  },
}
