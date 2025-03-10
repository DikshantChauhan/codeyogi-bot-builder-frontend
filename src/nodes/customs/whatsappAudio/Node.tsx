import { NodeProps } from '@xyflow/react'
import { WhatsappAudioNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappAudioNode: FC<NodeProps<WhatsappAudioNodeType>> = ({ id, data }) => {
  return (
    <NodeCard nodeId={id} nodeType="whatsapp-audio">
      {data.url && (
        <audio className="w-full h-6" controls>
          <source src={data.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </NodeCard>
  )
}

export default memo(WhatsappAudioNode)
