import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { WHATSAPP_VALIDATE_DISE_CODE_NODE_KEY } from './type'
import { FC, memo, useMemo } from 'react'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeRegistryNodeProps<typeof WHATSAPP_VALIDATE_DISE_CODE_NODE_KEY>> = (node) => {
  const options = useMemo(() => node.data.paths.map((value) => ['', value] as [string, string]), [node.data.paths])
  return (
    <NodeCard nodeId={node.id} nodeType={WHATSAPP_VALIDATE_DISE_CODE_NODE_KEY} options={options} isSelected={!!node.selected}>
      <div className="mt-4">
        <p>{node.data.dise_code}</p>
      </div>
    </NodeCard>
  )
}

export default memo(Node)
