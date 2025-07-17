import { FlowAddOrUpdateFormData } from '../components/FlowAddPopup'
import { API_BASE_URL } from '../constants'
import { NormalizedCampaign } from '../models/Campaign.model'
import { Entity } from '../models/Entity.model'
import { Flow } from '../models/Flow.model'
import axios from 'axios'
import { AppNode } from '../models/Node.model'

export const fetchCampaignslistAPI = async (): Promise<NormalizedCampaign[]> => {
  const url = `${API_BASE_URL}/campaigns`
  const response = await axios.get<NormalizedCampaign[]>(url)
  return response.data
}

export const fetchCampaignAPI = async (campaignId: string) => {
  const url = `${API_BASE_URL}/campaign/${campaignId}`
  const response = await axios.get<NormalizedCampaign>(url)
  return response.data
}

export type CampaignCreatePayload = Omit<NormalizedCampaign, keyof Entity>
export const createCampaignAPI = async (campaign: CampaignCreatePayload): Promise<NormalizedCampaign> => {
  const url = `${API_BASE_URL}/campaign`
  const response = await axios.post<NormalizedCampaign>(url, campaign)
  return response.data
}

export type CampaignUpdatePayload = Partial<NormalizedCampaign>
export const updateCampaignAPI = async (campaignId: string, campaign: CampaignUpdatePayload): Promise<NormalizedCampaign> => {
  const url = `${API_BASE_URL}/campaign/${campaignId}`
  const response = await axios.put<NormalizedCampaign>(url, { ...campaign })
  return response.data
}

export const fetchFlowAPI = async (flowId: string): Promise<Flow> => {
  const url = `${API_BASE_URL}/flow/${flowId}`
  const response = await axios.get<Flow>(url)
  response.data.data.nodes = response.data.data.nodes.map((node) => {
    if (node.type === ('whatsapp-ownboarding-link-parser' as any)) {
      return { ...node, type: 'whatsapp-onboarding-link-parser' } as AppNode
    }
    return node
  })
  return response.data
}

export const fetchNudgeFlowsListAPI = async (): Promise<Flow[]> => {
  const url = `${API_BASE_URL}/flow/nudge/all`
  const response = await axios.get<Flow[]>(url)
  return response.data
}

export const createFlowAPI = async (data: { flow_data: FlowAddOrUpdateFormData; campaign_id?: string; level_number?: number }) => {
  const url = `${API_BASE_URL}/flow`
  const response = await axios.post<{ flow: Flow; campaign?: NormalizedCampaign }>(url, data)
  return response.data
}

export const updateFlowAPI = async ({ id, data }: { id: string; data: FlowAddOrUpdateFormData }) => {
  const url = `${API_BASE_URL}/flow/${id}`
  const response = await axios.put<Flow>(url, data)
  return response.data
}
