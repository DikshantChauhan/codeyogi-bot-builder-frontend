import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_USER_UPDATE_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeRegistryNodeProps<typeof WHATSAPP_USER_UPDATE_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType="whatsapp-user-update" isSelected={!!node.selected}>
      <div className="flex flex-col gap-2">
        {Object.entries(node.data)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => (
            <div key={key} className="flex gap-1">
              <span>{key}:</span>
              <span>{value}</span>
            </div>
          ))}
      </div>
    </NodeCard>
  )
}

export default memo(Node)
