import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { PromptNodeData, PromptNodeType } from './type'
import NodeCard from '../../../components/NodeCard'
import { RxInput } from 'react-icons/rx'

const Node: FC<NodeProps<PromptNodeType>> = ({ data, id }) => {
  return (
    <NodeCard<PromptNodeData> Icon={RxInput} iconBg="bg-green-700" title="Prompt" nodeId={id}>
      {data.text}
    </NodeCard>
  )
}

export default memo(Node)
