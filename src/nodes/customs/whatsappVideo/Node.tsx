import { NodeProps } from '@xyflow/react'
import { WhatsappVideoNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappVideoNode: FC<NodeProps<WhatsappVideoNodeType>> = ({ data }) => {
  return (
    <NodeCard nodeType="whatsapp-video">
      {data.url && (
        <div className="space-y-2">
          <video className="w-full rounded-md" controls>
            <source src={data.url} type="video/mp4" />
            Your browser does not support the video element.
          </video>
          {data.caption && <p className="text-sm text-gray-600">{data.caption}</p>}
        </div>
      )}
    </NodeCard>
  )
}

export default memo(WhatsappVideoNode)
