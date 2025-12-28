import { START_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'
import { NodeRegistryNodeProps } from '../../../models/Node.model'

const StartNode: FC<NodeRegistryNodeProps<typeof START_NODE_KEY>> = (node) => {
  return <NodeCard nodeId={node.id} nodeType="start" isSelected={!!node.selected}></NodeCard>
}

export default memo(StartNode)
