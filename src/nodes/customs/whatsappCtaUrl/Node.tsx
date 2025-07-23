import { NodeProps } from '@xyflow/react'
import { WhatsappCtaUrlNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappCtaUrlNode: FC<NodeProps<WhatsappCtaUrlNodeType>> = ({ id, data, selected }) => {
  const getHeaderPreview = () => {
    if (!data.header) return null

    switch (data.header.type) {
      case 'text':
        return data.header.text ? <div className="text-[0.5rem] font-medium text-gray-900 truncate">{data.header.text}</div> : null
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
    <NodeCard isSelected={!!selected} nodeId={id} nodeType="whatsapp-cta-url">
      <div className="flex items-start space-x-2 p-1 bg-gray-50 rounded border">
        {/* CTA URL Info */}
        <div className="flex-1 min-w-0">
          <div className="text-[0.5rem] font-medium text-gray-900">CTA Button</div>

          {getHeaderPreview()}

          {data.bodyText && <div className="text-[0.5rem] text-gray-600 mt-1 line-clamp-2">{data.bodyText}</div>}

          {data.buttonText && <div className="text-[0.5rem] text-green-600 font-medium mt-1">🔗 {data.buttonText}</div>}

          {data.footerText && <div className="text-[0.5rem] text-gray-500 mt-1 line-clamp-1">{data.footerText}</div>}
        </div>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappCtaUrlNode)
