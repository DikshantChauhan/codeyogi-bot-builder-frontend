import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { PromptNodeType } from './type'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<PromptNodeType>> = ({ id }) => {
  return <NodeCard nodeId={id} nodeType="prompt" />
}

export default memo(Node)
