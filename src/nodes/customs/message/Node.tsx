import { NodeProps } from '@xyflow/react'
import { MessageNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<MessageNodeType>> = ({ id, data }) => {
  return <NodeCard nodeId={id} nodeType="message">{data.text}</NodeCard>
}

export default memo(Node)
