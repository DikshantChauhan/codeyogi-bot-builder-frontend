import { NodeProps } from '@xyflow/react'
import { StartNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const StartNode: FC<NodeProps<StartNodeType>> = ({ id }) => {
  return <NodeCard nodeId={id} nodeType="start"></NodeCard>
}

export default memo(StartNode)
