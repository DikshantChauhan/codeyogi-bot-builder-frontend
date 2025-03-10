import { NodeProps } from '@xyflow/react'
import { WhatsappLinkButtonNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappLinkButtonNode: FC<NodeProps<WhatsappLinkButtonNodeType>> = ({ id, data }) => {
  return (
    <NodeCard nodeId={id} nodeType="whatsapp-link-button">
      <div className="space-y-2">
        <p className="text-sm">{data.text}</p>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
        >
          {data.label}
        </a>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappLinkButtonNode)
