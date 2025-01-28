import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { DelayNodeType } from './type'
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

const Node: FC<NodeProps<DelayNodeType>> = ({ data }) => {
  const options: [string, string][] = [
    ['Delay', formatDuration(data.delayInSecs)]
  ]
  if (data.message) {
    options.unshift(['Message', data.message])
  }
  
  return <NodeCard nodeType="delay" options={options}>Delay</NodeCard>
}

export default memo(Node) 