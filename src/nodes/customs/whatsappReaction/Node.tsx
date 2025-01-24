import { NodeProps } from '@xyflow/react'
import { WhatsappReactionNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappReactionNode: FC<NodeProps<WhatsappReactionNodeType>> = ({ data }) => {
  return (
    <NodeCard nodeType="whatsapp-reaction">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{data.emoji}</span>
        {data.messageId && <span className="text-sm text-gray-500">to message: {data.messageId}</span>}
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappReactionNode)
