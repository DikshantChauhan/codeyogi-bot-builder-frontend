import { Flow } from './Flow.model'
import { AppNodeKeys } from './Node.model'
import { Entity } from './Entity.model'

export interface Campaign extends Entity {
  name: string
  allowed_nodes: AppNodeKeys[]
  levels: Flow[]
}

export type NormalizedCampaign = Omit<Campaign, 'levels'> & {
  levels: string[]
}
