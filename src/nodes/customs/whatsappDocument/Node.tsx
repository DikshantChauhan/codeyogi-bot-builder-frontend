import { NodeProps } from '@xyflow/react'
import { WhatsappDocumentNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappDocumentNode: FC<NodeProps<WhatsappDocumentNodeType>> = ({ id, data }) => {
  return (
    <NodeCard nodeId={id} nodeType="whatsapp-document">
      {data.url && (
        <div className="text-sm text-blue-500 underline">
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            View Document
          </a>
        </div>
      )}
    </NodeCard>
  )
}

export default memo(WhatsappDocumentNode)
