import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_STICKER_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappStickerNode: FC<NodeRegistryNodeProps<typeof WHATSAPP_STICKER_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType="whatsapp-sticker" isSelected={!!node.selected}>
      {node.data.url && (
        <div className="w-24 h-24 mx-auto">
          <img src={node.data.url} alt="Sticker" className="w-full h-full object-contain" />
        </div>
      )}
    </NodeCard>
  )
}

export default memo(WhatsappStickerNode)
