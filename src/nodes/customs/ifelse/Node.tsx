import { NodeProps } from '@xyflow/react'
import { IfElseNodeType } from './type'
import { FC, memo, useMemo } from 'react'
import NodeCard from '../../../components/NodeCard'
import { IoIosGitNetwork } from 'react-icons/io'

const IfElseNode: FC<NodeProps<IfElseNodeType>> = ({ data }) => {
  const options = useMemo(
    () =>
      data.conditions.map((conndition, index) => {
        const label = index === 0 ? 'If' : index === data.conditions.length - 1 ? 'Else' : `Else If`
        return [label, conndition] as [string, string]
      }),
    [data]
  )

  return <NodeCard Icon={IoIosGitNetwork} title="If/Else" iconBg="bg-orange-600" options={options} />
}

export default memo(IfElseNode)
