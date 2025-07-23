import { NodeProps } from '@xyflow/react'
import { IfElseNodeType } from './type'
import { FC, memo, useMemo } from 'react'
import NodeCard from '../../../components/NodeCard'

const IfElseNode: FC<NodeProps<IfElseNodeType>> = ({ id, data, selected }) => {
  const optionsList = useMemo(
    () =>
      [
        ...data.conditions.map(({ condition, value, variable, type }, index) => {
          const label = index === 0 ? 'If' : `Else If`
          const labelValue = `${variable} ${condition} ${type === 'null' ? type : value}`
          return [label, labelValue]
        }),
        ['Else', 'else'],
      ] as [string, string][],
    [data]
  )

  return <NodeCard nodeId={id} nodeType="if-else" options={optionsList} isSelected={!!selected} />
}

export default memo(IfElseNode)
