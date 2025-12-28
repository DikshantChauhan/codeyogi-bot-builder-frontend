import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { DELAY_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0s'

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const parts = []
  if (h > 0) parts.push(`${h}h`)
  if (m > 0) parts.push(`${m}m`)
  if (s > 0 || parts.length === 0) parts.push(`${s}s`)

  return parts.join(' ')
}

const Node: FC<NodeRegistryNodeProps<typeof DELAY_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType="delay" isSelected={!!node.selected}>
      {formatDuration(node.data.delayInSecs)}
    </NodeCard>
  )
}

export default memo(Node)
