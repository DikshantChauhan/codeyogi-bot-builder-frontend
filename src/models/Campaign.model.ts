import { Flow } from './Flow.model'
import { AppNodeKeys } from './Node.model'

export interface Campaign {
  id: string
  name: string
  allowedNodes: AppNodeKeys[]
  levels: Flow[]
  createdAt: string
  updatedAt: string
}

export type NormalizedCampaign = Omit<Campaign, 'levels'> & {
  levels: string[]
}
