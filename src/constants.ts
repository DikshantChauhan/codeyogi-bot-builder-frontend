export const ROUTE_CAMPAIGNS_LIST = '/'

export const ROUTE_NUDGES_LIST = '/nudges'

export const ROUTE_NUDGE_FLOW = (nudgeId?: string) => `/nudge/${nudgeId || ':nudge_id'}`
ROUTE_NUDGE_FLOW.dynamicKey = 'nudge_id' as const

export const ROUTE_CAMPAIGN_DETAILS = (campaignId?: string) => `/campaign/${campaignId || ':campaign_id'}`
ROUTE_CAMPAIGN_DETAILS.dynamicKey = 'campaign_id' as const

export const ROUTE_LEVEL_FLOW = (campaignId?: string, flowId?: string) => `${ROUTE_CAMPAIGN_DETAILS(campaignId)}/flow/${flowId || ':flow_id'}`
ROUTE_LEVEL_FLOW.dynamicKey = 'flow_id' as const

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const ADMIN_API_BASE_URL = import.meta.env.VITE_ADMIN_API_BASE_URL

export const ALL_SUPPORTED_LANGUAGES = ['english', 'hindi', 'hinglish']
