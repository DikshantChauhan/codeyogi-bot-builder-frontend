import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_VIDEO_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappVideoNode: FC<NodeRegistryNodeProps<typeof WHATSAPP_VIDEO_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType="whatsapp-video" isSelected={!!node.selected}>
      <div className="flex items-start space-x-2 p-1 bg-gray-50 rounded border">
        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <div className="text-[0.5rem] font-medium text-gray-900">Video</div>
          {node.data.caption && <div className="text-[0.5rem] text-gray-600 mt-1 line-clamp-2">{node.data.caption}</div>}
        </div>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappVideoNode)
