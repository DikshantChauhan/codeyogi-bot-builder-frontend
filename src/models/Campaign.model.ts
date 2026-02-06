import { Flow } from './Flow.model'
import { AppNodeKeys } from './Node.model'
import { Entity } from './Entity.model'

export enum CampaignType {
  LEVEL_BASED = 'level-based',
  NON_LEVEL_BASED = 'non-level-based',
}

export interface Campaign extends Entity {
  name: string
  allowed_nodes: AppNodeKeys[]
  levels: Flow[]
  constants?: string[]
  type: CampaignType
}

export type NormalizedCampaign = Omit<Campaign, 'levels'> & {
  levels: string[]
}
