import { NodeProps } from '@xyflow/react'
import { WhatsappDocumentNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappDocumentNode: FC<NodeProps<WhatsappDocumentNodeType>> = ({ id, data, selected }) => {
  return (
    <NodeCard nodeId={id} nodeType="whatsapp-document" isSelected={!!selected}>
      <div className="flex items-start space-x-2 p-1 bg-gray-50 rounded border">
        {/* Document Info */}
        <div className="flex-1 min-w-0">
          {data.filename ? (
            <div className="text-[0.5rem] font-medium text-gray-900 truncate">{data.filename}</div>
          ) : (
            <div className="text-[0.5rem] font-medium text-gray-900">Untitled</div>
          )}

          {data.caption && <div className="text-[0.5rem] text-gray-600 mt-1 line-clamp-2">{data.caption}</div>}
        </div>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappDocumentNode)
