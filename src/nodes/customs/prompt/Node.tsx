import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { PromptNodeType } from './type'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<PromptNodeType>> = ({ data }) => {
  return <NodeCard nodeType="prompt">{data.text}</NodeCard>
}

export default memo(Node)
