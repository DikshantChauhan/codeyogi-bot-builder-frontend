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
    whatsapp_ownboarding_dise_code: undefined,
  }

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappUserUpdateNodeData> = (value) => {
    if (!value.name && !value.level_id && !value.age && !value.node_id && !value.whatsapp_ownboarding_dise_code) {
      throw new Error('At least one field is required')
    }
    return value
  }

  return (
    <NodeFormContainer initialValues={data} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <SuggestionField name="name" as="input" label="Name" />
      <SuggestionField name="level_id" as="input" label="Level ID" />
      <SuggestionField name="age" as="input" label="Age" />
      <SuggestionField name="node_id" as="input" label="Node ID" />
      <SuggestionField name="whatsapp_ownboarding_dise_code" as="input" label="Dise Code" />
    </NodeFormContainer>
  )
}

export default memo(Form)
