import { NodeProps } from '@xyflow/react'
import { MessageNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<MessageNodeType>> = ({ data }) => {
  return <NodeCard nodeType="message">{data.text}</NodeCard>
}

export default memo(Node)
