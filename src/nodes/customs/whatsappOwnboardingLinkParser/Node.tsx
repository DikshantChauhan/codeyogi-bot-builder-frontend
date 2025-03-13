import { NodeProps } from '@xyflow/react'
import { WhatsappOwnboardingLinkParserNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<WhatsappOwnboardingLinkParserNodeType>> = ({ id, data }) => {
  const listOptions = (data.paths || []).map((item) => ['', item] as [string, string])
  return (
    <NodeCard nodeId={id} nodeType="whatsapp-ownboarding-link-parser" options={listOptions}>
      <div>{data.link}</div>
    </NodeCard>
  )
}

export default memo(Node)
