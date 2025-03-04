import { FC, memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappUserUpdateNodeData, WhatsappUserUpdateNodeType } from './type'
import SuggestionField from '../../../components/SuggestionField'

interface Props {
  node?: WhatsappUserUpdateNodeType
}

const Form: FC<Props> = ({ node }) => {
  const data = node?.data || {
    node_id: undefined,
    name: undefined,
    level_id: undefined,
    age: undefined,
  }

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappUserUpdateNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={data} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <SuggestionField name="name" as="input" label="Name" />
      <SuggestionField name="level_id" as="input" label="Level ID" />
      <SuggestionField name="age" as="input" label="Age" />
      <SuggestionField name="node_id" as="input" label="Node ID" />
    </NodeFormContainer>
  )
}

export default memo(Form)
