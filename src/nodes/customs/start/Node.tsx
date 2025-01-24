import { NodeProps } from '@xyflow/react'
import { StartNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const StartNode: FC<NodeProps<StartNodeType>> = () => {
  return <NodeCard nodeType="start"></NodeCard>
}

export default memo(StartNode)
