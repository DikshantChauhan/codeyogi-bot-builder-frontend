import { memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { StartNodeData } from './type'

interface Props {}

const info = `🔹 Start Node Requirement

- A flow must contain exactly one \`start\` node.
- The \`start\` node defines where the flow begins.
- If no start node is found or if more than one exists, show an error.
`

const Form: React.FC<Props> = ({}) => {
  const transFormNodeDataOrFail: TransFormNodeDataOrFail<StartNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={{}} transFormNodeDataOrFail={transFormNodeDataOrFail} info={info}>
      <span>-----</span>
    </NodeFormContainer>
  )
}

export default memo(Form)
