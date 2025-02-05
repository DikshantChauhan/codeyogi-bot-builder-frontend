import axios from 'axios'
import { Flow } from '../store/flow.store'
import { toast } from 'react-toastify'

const baseUrl = 'https://7psqs47xjf.execute-api.us-east-1.amazonaws.com'
const STORAGE_KEY = 'flows'

export const flowsApi = {
  listFlows: async (): Promise<Flow[]> => {
    const s3Flows = await flowsApi.fetchS3Flows()
    const flows = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Flow[]
    const flowsMap = new Map(flows.map((flow) => [flow.name, flow]))
    const mergedFlows = s3Flows.map((s3Flow) => (flowsMap.has(s3Flow.name) ? flowsMap.get(s3Flow.name)! : s3Flow))
    flows.forEach((flow) => {
      if (!mergedFlows.some((f) => f.name === flow.name)) {
        mergedFlows.push(flow)
      }
    })
    return mergedFlows
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
    await flowsApi.postFlow(flow)
    return flow
  },

  deleteFlow: async (name: string): Promise<void> => {
    const flows = await flowsApi.listFlows()
    const updatedFlows = flows.filter((flow) => flow.name !== name)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFlows))
  },

  postFlow: async (flow: Flow) => {
    try {
      await axios.post(`${baseUrl}/flows`, { flow })
      toast.success('Flow posted successfully')
    } catch (error) {
      toast.error('Failed to post flow')
    }
  },

  fetchS3Flows: async () => {
    const response = await axios.get(`${baseUrl}/flows`)
    return response.data as Flow[]
  },
}
