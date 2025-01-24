import { NodeProps } from '@xyflow/react'
import { IfElseNodeType } from './type'
import { FC, memo, useMemo } from 'react'
import NodeCard from '../../../components/NodeCard'

const IfElseNode: FC<NodeProps<IfElseNodeType>> = ({ data }) => {
  const optionsList = useMemo(
    () =>
      data.conditions.map((conndition, index) => {
        const label = index === 0 ? 'If' : index === data.conditions.length - 1 ? 'Else' : `Else If`
        return [label, conndition] as [string, string]
      }),
    [data]
  )

  return (
    <NodeCard
      nodeType="if-else"
      options={optionsList}
    />
  )
}

export default memo(IfElseNode)
