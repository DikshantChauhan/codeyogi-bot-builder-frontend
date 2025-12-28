import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_ONBOARDING_LINK_PARSER_NODE_KEY } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeRegistryNodeProps<typeof WHATSAPP_ONBOARDING_LINK_PARSER_NODE_KEY>> = (node) => {
  const listOptions = (node.data.paths || []).map((item) => ['', item] as [string, string])
  return (
    <NodeCard nodeId={node.id} nodeType="whatsapp-onboarding-link-parser" options={listOptions} isSelected={!!node.selected}>
      <div>{node.data.link}</div>
    </NodeCard>
  )
}

export default memo(Node)
