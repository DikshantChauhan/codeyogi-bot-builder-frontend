import { Campaign, NormalizedCampaign } from '../models/Campaign.model'
import { Flow } from '../models/Flow.model'

const Campaign1: NormalizedCampaign = {
  id: '1',
  name: 'Campaign 1',
  allowedNodes: ['message', 'if-else', 'prompt'],
  levels: ['level1', 'level2'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const Campaign2: NormalizedCampaign = {
  id: '2',
  name: 'Campaign 2',
  allowedNodes: ['message', 'if-else', 'quiz'],
  levels: ['level1', 'level2'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const level1: Flow = {
  id: 'level1',
  name: 'Level 1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  type: 'level',
  data: {
    nodes: [],
    edges: [],
  },
}

const level2: Flow = {
  id: 'level2',
  name: 'Level 2',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  type: 'level',
  data: {
    nodes: [],
    edges: [],
  },
}

const delayFlow1: Flow = {
  id: 'delay1',
  name: 'Delay 1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  type: 'nudge',
  data: {
    nodes: [],
    edges: [],
  },
}

const delayFlow2: Flow = {
  id: 'delay2',
  name: 'Delay 2',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  type: 'nudge',
  data: {
    nodes: [],
    edges: [],
  },
}

export const fetchCampaignslistAPI = async (): Promise<NormalizedCampaign[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [Campaign1, Campaign2]
}

export const fetchCampaignDetailsAPI = async (campaignId: string): Promise<Campaign> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { ...Campaign1, levels: [level1, level2] }
}

export const fetchFlowAPI = async (flowId: string): Promise<{ flow: Flow; campaign: NormalizedCampaign }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    flow: level1,
    campaign: Campaign1,
  }
}

export const fetchNudgeFlowsListAPI = async (): Promise<Flow[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [delayFlow1, delayFlow2]
}
