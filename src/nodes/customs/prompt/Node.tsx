import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'
import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { PROMPT_NODE_KEY } from './type'

const Node: FC<NodeRegistryNodeProps<typeof PROMPT_NODE_KEY>> = (node) => {
  return (
    <NodeCard nodeId={node.id} nodeType="prompt" isSelected={!!node.selected}>
      <div>
        <p>Type: {node.data.type}</p>
        {node.data.min !== undefined && <p>Min: {node.data.min}</p>}
        {node.data.max !== undefined && <p>Max: {node.data.max}</p>}
      </div>
    </NodeCard>
  )
}

export default memo(Node)
