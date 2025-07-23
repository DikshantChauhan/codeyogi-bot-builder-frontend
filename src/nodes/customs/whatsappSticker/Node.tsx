import { NodeProps } from '@xyflow/react'
import { WhatsappStickerNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappStickerNode: FC<NodeProps<WhatsappStickerNodeType>> = ({ id, data, selected }) => {
  return (
    <NodeCard nodeId={id} nodeType="whatsapp-sticker" isSelected={!!selected}>
      {data.url && (
        <div className="w-24 h-24 mx-auto">
          <img src={data.url} alt="Sticker" className="w-full h-full object-contain" />
        </div>
      )}
    </NodeCard>
  )
}

export default memo(WhatsappStickerNode)
