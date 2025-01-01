import { NodeProps } from '@xyflow/react'
import { FC, memo, useMemo } from 'react'
import { QuizNodeType } from './type'
import NodeCard from '../../../components/NodeCard'
import { FaListCheck } from 'react-icons/fa6'

const Node: FC<NodeProps<QuizNodeType>> = ({ data }) => {
  const options = useMemo(() => {
    return data.options.map((option) => ['', option] as [string, string])
  }, [data.options])
  return <NodeCard Icon={FaListCheck} iconBg="bg-cyan-400" title="Quiz" children={data.question} options={options} />
}

export default memo(Node)
