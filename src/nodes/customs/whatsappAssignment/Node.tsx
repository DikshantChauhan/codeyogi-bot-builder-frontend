import { NodeProps } from '@xyflow/react'
import { WhatsappAssignmentNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'
import { WHATSAPP_ASSIGNMENT_NODE_KEY } from './type'

const WhatsappAssignmentNode: FC<NodeProps<WhatsappAssignmentNodeType>> = ({ id, data, selected }) => {
  return (
    <NodeCard nodeId={id} nodeType={WHATSAPP_ASSIGNMENT_NODE_KEY} isSelected={!!selected}>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium">{data.assignmentId}</h2>
        <p className="text-xs text-gray-500">{data.message}</p>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappAssignmentNode)
