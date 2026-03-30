import { Node } from '@xyflow/react'

export const SYNC_PLATFORM_NODE_KEY = 'sync-platform'

export const SyncPlatformPaths = ['then', 'catch'] as const
export type SyncPlatformNodeData = {
  api_route: string
  api_secret_code: string
  paths: typeof SyncPlatformPaths
}

export type SyncPlatformNodeType = Node<SyncPlatformNodeData, typeof SYNC_PLATFORM_NODE_KEY>
