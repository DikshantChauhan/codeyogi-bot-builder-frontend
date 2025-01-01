import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { PromptNodeType } from './type'
import NodeCard from '../../../components/NodeCard'
import { RxInput } from 'react-icons/rx'

const Node: FC<NodeProps<PromptNodeType>> = ({ data }) => {
  return (
    <NodeCard Icon={RxInput} iconBg="bg-green-700" title="Prompt">
      {data.text}
    </NodeCard>
  )
}

export default memo(Node)
