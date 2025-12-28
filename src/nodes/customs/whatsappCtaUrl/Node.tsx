import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_CTA_URL_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappCtaUrlNode: FC<NodeRegistryNodeProps<typeof WHATSAPP_CTA_URL_NODE_KEY>> = (node) => {
  const getHeaderPreview = () => {
    if (!node.data.header) return null

    switch (node.data.header.type) {
      case 'text':
        return node.data.header.text ? <div className="text-[0.5rem] font-medium text-gray-900 truncate">{node.data.header.text}</div> : null
      case 'image':
        return <div className="text-[0.5rem] text-blue-600">📷 Image Header</div>
      case 'video':
        return <div className="text-[0.5rem] text-blue-600">🎥 Video Header</div>
      case 'document':
        return <div className="text-[0.5rem] text-blue-600">📄 Document Header</div>
      default:
        return null
    }
  }

  return (
    <NodeCard isSelected={!!node.selected} nodeId={node.id} nodeType="whatsapp-cta-url">
      <div className="flex items-start space-x-2 p-1 bg-gray-50 rounded border">
        {/* CTA URL Info */}
        <div className="flex-1 min-w-0">
          <div className="text-[0.5rem] font-medium text-gray-900">CTA Button</div>

          {getHeaderPreview()}

          {node.data.bodyText && <div className="text-[0.5rem] text-gray-600 mt-1 line-clamp-2">{node.data.bodyText}</div>}

          {node.data.buttonText && <div className="text-[0.5rem] text-green-600 font-medium mt-1">🔗 {node.data.buttonText}</div>}

          {node.data.footerText && <div className="text-[0.5rem] text-gray-500 mt-1 line-clamp-1">{node.data.footerText}</div>}
        </div>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappCtaUrlNode)
