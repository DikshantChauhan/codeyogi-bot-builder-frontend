export const ROUTE_CAMPAIGNS_LIST = '/'

export const ROUTE_CAMPAIGN_DETAILS = (campaignId?: string) => `/campaign/${campaignId || ':campaign_id'}`
ROUTE_CAMPAIGN_DETAILS.dynamicKey = 'campaign_id' as const

export const ROUTE_FLOW = (campaignId?: string, flowId?: string) => `${ROUTE_CAMPAIGN_DETAILS(campaignId)}/flow/${flowId || ':flow_id'}`
ROUTE_FLOW.dynamicKey = 'flow_id' as const

export const API_BASE_URL = 'https://7psqs47xjf.execute-api.us-east-1.amazonaws.com'
