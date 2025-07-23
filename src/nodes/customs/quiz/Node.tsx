import { NodeProps } from '@xyflow/react'
import { FC, memo, useMemo } from 'react'
import { QuizNodeType } from './type'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<QuizNodeType>> = ({ id, data, selected }) => {
  const optionsList = useMemo(() => {
    return data.options.map((option) => ['', option] as [string, string])
  }, [data.options])
  return (
    <NodeCard nodeId={id} nodeType="quiz" options={optionsList} isSelected={!!selected}>
      {data.question}
    </NodeCard>
  )
}

export default memo(Node)
