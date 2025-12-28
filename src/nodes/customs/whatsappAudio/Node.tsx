import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_AUDIO_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappAudioNode: FC<NodeRegistryNodeProps<typeof WHATSAPP_AUDIO_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType="whatsapp-audio" isSelected={!!node.selected}>
      {node.data.url && (
        <audio className="w-full h-6" controls>
          <source src={node.data.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </NodeCard>
  )
}

export default memo(WhatsappAudioNode)
