import { memo } from 'react'
import ListField from '../../../components/ListField'
import { IfElseNodeData, IfElseNodeType } from './type'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'

interface Props {
  node?: IfElseNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const transformedConditions = data?.conditions.filter((_, i) => i < data.conditions.length - 1)

  const handleTransformNode: TransFormToNode<IfElseNodeData> = (value) => {
    const conditions = [...value.conditions, 'Else']
    const data = { ...value, conditions }

    return {
      data,
      id: node?.id || getRandomId(),
      type: 'if-else',
      position: { x: 0, y: 0 },
    }
  }

  return (
    <NodeFormContiner
      data={(data && { ...data, conditions: transformedConditions! }) || { conditions: [''] }}
      transformToNode={handleTransformNode}
      title={"If-Else " + node?.id}
      updating={!!node}
    >
      <ListField
        name="conditions"
        labelGenerator={(index) => (index === 0 ? 'If' : `Else-If`)}
        placeholderGenerator={(index) => (index === 0 ? 'Enter condition for If' : 'Enter condition for Else-If')}
      />
    </NodeFormContiner>
  )
}

export default memo(Form)
