import { NodeProps } from '@xyflow/react'
import { MessageNodeData, MessageNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'
import { MdOutlineMessage } from 'react-icons/md'

const Node: FC<NodeProps<MessageNodeType>> = ({ data }) => {
  return (
    <NodeCard<MessageNodeData> Icon={MdOutlineMessage} iconBg="bg-blue-300" title="Message">
      {data.text}
    </NodeCard>
  )
}

export default memo(Node)
