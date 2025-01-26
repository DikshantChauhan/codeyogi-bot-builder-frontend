import { memo } from 'react'
import ListField from '../../../components/ListField'
import { IfElseNodeData, IfElseNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'

interface Props {
  node?: IfElseNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const transformedConditions = data?.conditions.filter((_, i) => i < data.conditions.length - 1)

  const handleTransformNode: TransFormNodeDataOrFail<IfElseNodeData> = (value) => {
    const conditions = [...value.conditions, 'Else']
    const data = { ...value, conditions }

    // TODO: validate conditions

    return data
  }

  return (
    <NodeFormContainer
      initialValues={(data && { ...data, conditions: transformedConditions! }) || { conditions: [''] }}
      transFormNodeDataOrFail={handleTransformNode}
    >
      <ListField
        name="conditions"
        labelGenerator={(index) => (index === 0 ? 'If' : `Else-If`)}
        placeholderGenerator={(index) => (index === 0 ? 'Enter condition for If' : 'Enter condition for Else-If')}
      />
    </NodeFormContainer>
  )
}

export default memo(Form)
