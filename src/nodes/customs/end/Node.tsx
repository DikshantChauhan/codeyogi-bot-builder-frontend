import { NodeProps } from '@xyflow/react'
import { EndNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const EndNode: FC<NodeProps<EndNodeType>> = ({ id, selected }) => {
  return <NodeCard nodeId={id} nodeType="end" isSelected={!!selected}></NodeCard>
}

export default memo(EndNode)
