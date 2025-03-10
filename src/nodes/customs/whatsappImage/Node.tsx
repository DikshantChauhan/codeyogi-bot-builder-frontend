import { NodeProps } from '@xyflow/react'
import { WhatsappImageNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappImageNode: FC<NodeProps<WhatsappImageNodeType>> = ({ id, data }) => {
  return (
    <NodeCard nodeId={id} nodeType="whatsapp-image">
      {data.link && (
        <div className="space-y-2">
          <img src={data.link} alt="WhatsApp" className="w-full h-32 object-cover rounded-md" />
          {data.caption && <p className="text-sm text-gray-600">{data.caption}</p>}
        </div>
      )}
    </NodeCard>
  )
}

export default memo(WhatsappImageNode)
