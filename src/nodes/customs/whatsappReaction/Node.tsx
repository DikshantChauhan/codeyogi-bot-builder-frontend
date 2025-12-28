import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_REACTION_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappReactionNode: FC<NodeRegistryNodeProps<typeof WHATSAPP_REACTION_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType="whatsapp-reaction" isSelected={!!node.selected}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{node.data.emoji}</span>
        {node.data.messageId && <span className="text-sm text-gray-500">to message: {node.data.messageId}</span>}
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappReactionNode)
