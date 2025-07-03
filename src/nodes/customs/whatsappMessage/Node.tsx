import { NodeProps } from '@xyflow/react'
import { WhatsappMessageNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<WhatsappMessageNodeType>> = ({ id, data }) => {
  return (
    <NodeCard nodeId={id} nodeType="whatsapp-message">
      <div>
        <div>{data.text}</div>
        {data.previewUrl && <div className="text-gray-500 mt-1">📎 URL preview enabled</div>}
      </div>
    </NodeCard>
  )
}

export default memo(Node)
