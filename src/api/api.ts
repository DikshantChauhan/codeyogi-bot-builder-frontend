import { FlowAddOrUpdateFormData } from '../components/FlowAddPopup'
import { ADMIN_API_BASE_URL, API_BASE_URL } from '../constants'
import { NormalizedCampaign } from '../models/Campaign.model'
import { Flow } from '../models/Flow.model'
import axios from 'axios'

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

export type CampaignCreatePayload = { name: string; allowed_nodes: string[]; supported_languages: string[] }
export const createCampaignAPI = async (campaign: CampaignCreatePayload): Promise<NormalizedCampaign> => {
  const url = `${API_BASE_URL}/campaign`
  const response = await axios.post<NormalizedCampaign>(url, campaign)
  return response.data
}

export type CampaignUpdatePayload = { name?: string; allowed_nodes?: string[]; levels?: string[]; supported_languages?: string[] }
export const updateCampaignAPI = async (campaignId: string, campaign: CampaignUpdatePayload): Promise<NormalizedCampaign> => {
  const url = `${API_BASE_URL}/campaign/${campaignId}`
  const response = await axios.put<NormalizedCampaign>(url, { ...campaign })
  return response.data
}

export const fetchFlowAPI = async (flowId: string): Promise<Flow> => {
  const url = `${ADMIN_API_BASE_URL}/flow/${flowId}`
  const response = await axios.get<Flow>(url)
  return response.data
}

export const fetchNudgeFlowsListAPI = async (): Promise<Flow[]> => {
  const url = `${ADMIN_API_BASE_URL}/flow/nudge/all`
  const response = await axios.get<Flow[]>(url)
  return response.data
}

export const createFlowAPI = async (data: { flow_data: FlowAddOrUpdateFormData; campaign_id?: string; level_number?: number }) => {
  const url = `${ADMIN_API_BASE_URL}/flow`
  const response = await axios.post<{ flow: Flow; campaign?: NormalizedCampaign }>(url, data)
  return response.data
}

export const updateFlowAPI = async ({ id, data }: { id: string; data: FlowAddOrUpdateFormData }) => {
  const url = `${ADMIN_API_BASE_URL}/flow/${id}`
  const response = await axios.put<Flow>(url, data)
  return response.data
}

export const deleteCampaignAPI = async (campaignId: string) => {
  const url = `${API_BASE_URL}/campaign/${campaignId}`
  await axios.delete(url)
}

export const deleteFlowAPI = async (campaignId: string, flowId: string): Promise<NormalizedCampaign> => {
  const url = `${ADMIN_API_BASE_URL}/campaign/${campaignId}/flow/${flowId}`
  const response = await axios.delete<NormalizedCampaign>(url)
  return response.data
}

export type WhatsAppMediaUploadType = 'image' | 'video' | 'document'

export interface WhatsAppMediaUploadPayload {
  campaign_id: string
  type: WhatsAppMediaUploadType
  s3_url: string
  filename: string
  contentType: string
}

export interface WhatsAppMediaUploadResponse {
  whatsapp_media_id: string
  s3_url: string
  filename: string
  type: WhatsAppMediaUploadType
  campaign_id: string
}

export const uploadWhatsAppMediaAPI = async (payload: WhatsAppMediaUploadPayload): Promise<WhatsAppMediaUploadResponse> => {
  const url = `${ADMIN_API_BASE_URL}/flow/media`
  const response = await axios.post<WhatsAppMediaUploadResponse>(url, payload)
  return response.data
}
