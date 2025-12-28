import { NodeRegistryNodeProps } from '../../../models/Node.model'
import { IF_ELSE_NODE_KEY } from './type'
import { FC, memo, useMemo } from 'react'
import NodeCard from '../../../components/NodeCard'

const IfElseNode: FC<NodeRegistryNodeProps<typeof IF_ELSE_NODE_KEY>> = (node) => {
  const optionsList = useMemo(
    () =>
      [
        ...node.data.conditions.map(({ condition, lhs, rhs }, index) => {
          const label = index === 0 ? 'If' : `Else If`
          const labelValue = `${lhs} ${condition} ${rhs}`
          return [label, labelValue]
        }),
        ['Else', 'else'],
      ] as [string, string][],
    [node.data.conditions]
  )

  return <NodeCard nodeId={node.id} nodeType="if-else" options={optionsList} isSelected={!!node.selected} />
}

export default memo(IfElseNode)
