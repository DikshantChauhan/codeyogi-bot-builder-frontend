import { NodeProps } from '@xyflow/react'
import { EndNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const EndNode: FC<NodeProps<EndNodeType>> = ({ id }) => {
  return <NodeCard nodeId={id} nodeType="end"></NodeCard>
}

export default memo(EndNode)
