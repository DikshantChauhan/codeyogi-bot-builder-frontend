import { NodeProps } from '@xyflow/react'
import { FC, memo, useMemo } from 'react'
import { QuizNodeData, QuizNodeType } from './type'
import NodeCard from '../../../components/NodeCard'
import { FaListCheck } from 'react-icons/fa6'

const Node: FC<NodeProps<QuizNodeType>> = ({ data }) => {
  const optionsList = useMemo(() => {
    return data.options.map((option) => ['', option] as [string, string])
  }, [data.options])
  return (
    <NodeCard<QuizNodeData>
      Icon={FaListCheck}
      iconBg="bg-cyan-400"
      title="Quiz"
      children={data.question}
      options={{ dataKey: 'options', list: optionsList }}
    />
  )
}

export default memo(Node)
