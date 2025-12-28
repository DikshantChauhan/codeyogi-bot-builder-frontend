import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_BUTTON_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappButtonNode: FC<NodeRegistryNodeProps<typeof WHATSAPP_BUTTON_NODE_KEY>> = (node) => {
  const options = node.data.buttons.map((button) => ['', button] as [string, string])
  return (
    <NodeCard nodeId={node.id} nodeType={WHATSAPP_BUTTON_NODE_KEY} options={options} isSelected={!!node.selected}>
      {node.data.text}
    </NodeCard>
  )
}

export default memo(WhatsappButtonNode)
