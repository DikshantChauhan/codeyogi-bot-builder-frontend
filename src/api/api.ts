import { CampaignAddOrUpdateFormData } from '../components/CampaignAddOrUpdatePopup'
import { FlowAddFormData } from '../components/FlowAddPopup'
import { API_BASE_URL } from '../constants'
import { Campaign, NormalizedCampaign } from '../models/Campaign.model'
import { Flow } from '../models/Flow.model'
import axios from 'axios'

export const fetchCampaignslistAPI = async (): Promise<NormalizedCampaign[]> => {
  const url = `${API_BASE_URL}/campaigns`
  const response = await axios.get<NormalizedCampaign[]>(url)
  return response.data
}

export const fetchCampaignDetailsAPI = async (campaignId: string): Promise<Campaign> => {
  const url = `${API_BASE_URL}/campaign/${campaignId}`
  const response = await axios.get<Campaign>(url)
  return response.data
}

export const createCampaignAPI = async (campaign: CampaignAddOrUpdateFormData): Promise<NormalizedCampaign> => {
  const url = `${API_BASE_URL}/campaign`
  const response = await axios.post<NormalizedCampaign>(url, campaign)
  return response.data
}

export const updateCampaignAPI = async (campaignId: string, campaign: CampaignAddOrUpdateFormData): Promise<NormalizedCampaign> => {
  const url = `${API_BASE_URL}/campaign`
  const response = await axios.put<NormalizedCampaign>(url, { ...campaign, id: campaignId })
  return response.data
}

export const fetchFlowAPI = async (flowId: string): Promise<Flow> => {
  const url = `${API_BASE_URL}/flow/${flowId}`
  const response = await axios.get<Flow>(url)
  return response.data
}

export const fetchNudgeFlowsListAPI = async (): Promise<Flow[]> => {
  const url = `${API_BASE_URL}/flow/nudge/all`
  const response = await axios.get<Flow[]>(url)
  return response.data
}

export const createFlowAPI = async (data: FlowAddFormData & { campaign_id?: string; order?: number }) => {
  const url = `${API_BASE_URL}/flow`
  const response = await axios.post<{ flow: Flow; campaign?: NormalizedCampaign }>(url, data)
  return response.data
}
