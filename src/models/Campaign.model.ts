import { Flow } from './Flow.model'
import { AppNodeKeys } from './Node.model'
import { Entity } from './Entity.model'

export interface Campaign extends Entity {
  name: string
  allowed_nodes: AppNodeKeys[]
  levels: Flow[]
  supported_languages?: string[]
  constants?: string[]
}

export type NormalizedCampaign = Omit<Campaign, 'levels'> & {
  levels: string[]
}
