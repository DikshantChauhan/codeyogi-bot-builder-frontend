export const ROUTE_CAMPAIGNS_LIST = '/'

export const ROUTE_NUDGES_LIST = '/nudges'

export const ROUTE_NUDGE_FLOW = (nudgeId?: string) => `/nudge/${nudgeId || ':nudge_id'}`
ROUTE_NUDGE_FLOW.dynamicKey = 'nudge_id' as const

export const ROUTE_CAMPAIGN_DETAILS = (campaignId?: string) => `/campaign/${campaignId || ':campaign_id'}`
ROUTE_CAMPAIGN_DETAILS.dynamicKey = 'campaign_id' as const

export const ROUTE_LEVEL_FLOW = (campaignId?: string, flowId?: string) => `${ROUTE_CAMPAIGN_DETAILS(campaignId)}/flow/${flowId || ':flow_id'}`
ROUTE_LEVEL_FLOW.dynamicKey = 'flow_id' as const

export const API_BASE_URL = 'https://7psqs47xjf.execute-api.us-east-1.amazonaws.com'

export const VARIABLE_NAMES = [
  'user.name',
  'user.level_id',
  'user.phone_number',
  'user.age',
  'chat.input',
  'user.total_score',
  'user.level_score',
  'prompt.input',
  'user.node_meta.whatsapp_ownboarding_link.school_name',
  'user.node_meta.whatsapp_ownboarding_link.dise_code',
  'user.node_meta.whatsapp_ownboarding_link.district_id',
  'user.node_meta.whatsapp_ownboarding_link.district_name',
  'user.node_meta.whatsapp_ownboarding_link.state_name',
] as const
