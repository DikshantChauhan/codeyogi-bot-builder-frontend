import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_LIST_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappListNode: FC<NodeRegistryNodeProps<typeof WHATSAPP_LIST_NODE_KEY>> = (node) => {
  const listOptions = (node.data.buttons || []).map((item) => ['', item] as [string, string])
  return (
    <NodeCard isSelected={!!node.selected} nodeId={node.id} nodeType="whatsapp-list" options={listOptions}>
      <div>
        {node.data.header && <h3 className="font-medium">{node.data.header}</h3>}
        <p className="text-gray-600">{node.data.text}</p>
        {node.data.footer && <p className="text-sm text-gray-500 mt-2">{node.data.footer}</p>}
        {node.data.buttonLabel && <p className="text-sm font-medium mt-2">{node.data.buttonLabel}</p>}
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappListNode)
