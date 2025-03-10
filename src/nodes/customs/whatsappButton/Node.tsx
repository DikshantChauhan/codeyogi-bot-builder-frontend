import { NodeProps } from '@xyflow/react'
import { WHATSAPP_BUTTON_NODE_KEY, WhatsappButtonNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappButtonNode: FC<NodeProps<WhatsappButtonNodeType>> = ({ id, data }) => {
  const options = data.buttons.map((button) => ['', button] as [string, string])
  return (
    <NodeCard nodeId={id} nodeType={WHATSAPP_BUTTON_NODE_KEY} options={options}>
      {data.text}
    </NodeCard>
  )
}

export default memo(WhatsappButtonNode)
