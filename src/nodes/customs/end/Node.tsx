import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { END_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const EndNode: FC<NodeRegistryNodeProps<typeof END_NODE_KEY>> = (node) => {
  return <NodeCard nodeId={node.id} nodeType="end" isSelected={!!node.selected}></NodeCard>
}

export default memo(EndNode)
