import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_IMAGE_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappImageNode: FC<NodeRegistryNodeProps<typeof WHATSAPP_IMAGE_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType="whatsapp-image" isSelected={!!node.selected}>
      <div className="flex items-start space-x-2 p-1 bg-gray-50 rounded border">
        {/* Image Info */}
        <div className="flex-1 min-w-0">
          <div className="text-[0.5rem] font-medium text-gray-900">Image</div>
          {node.data.caption && <div className="text-[0.5rem] text-gray-600 mt-1 line-clamp-2">{node.data.caption}</div>}
        </div>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappImageNode)
