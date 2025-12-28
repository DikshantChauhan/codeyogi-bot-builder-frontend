import { WHATSAPP_MESSAGE_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'
import { NodeRegistryNodeProps } from '../../../models/Node.model'

const Node: FC<NodeRegistryNodeProps<typeof WHATSAPP_MESSAGE_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType="whatsapp-message" isSelected={!!node.selected}>
      <div>
        <div>{node.data.text}</div>
        {node.data.previewUrl && <div className="text-gray-500 mt-1">📎 URL preview enabled</div>}
      </div>
    </NodeCard>
  )
}

export default memo(Node)
