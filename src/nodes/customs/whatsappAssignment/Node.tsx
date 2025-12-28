import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'
import { WHATSAPP_ASSIGNMENT_NODE_KEY } from './type'
import { NodeRegistryNodeProps } from '../../../models/Node.model'

const WhatsappAssignmentNode: FC<NodeRegistryNodeProps<typeof WHATSAPP_ASSIGNMENT_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType={WHATSAPP_ASSIGNMENT_NODE_KEY} isSelected={!!node.selected}>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium">{node.data.assignmentId}</h2>
        <p className="text-xs text-gray-500">{node.data.message}</p>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappAssignmentNode)
