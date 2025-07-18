import { FC, memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappUserUpdateNodeData, WhatsappUserUpdateNodeType } from './type'
import SuggestionField from '../../../components/Field'

interface Props {
  node?: WhatsappUserUpdateNodeType
}

const Form: FC<Props> = ({ node }) => {
  const data = node?.data || {
    node_id: undefined,
    name: undefined,
    level_id: undefined,
    age: undefined,
    whatsapp_onboarding_dise_code: undefined,
    campaign_id: undefined,
    whatsapp_onboarding_course: undefined,
    whatsapp_onboarding_school_name: undefined,
  }

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappUserUpdateNodeData> = (value) => {
    if (
      !value.name &&
      !value.level_id &&
      !value.age &&
      !value.node_id &&
      !value.whatsapp_onboarding_dise_code &&
      !value.whatsapp_onboarding_course &&
      !value.whatsapp_onboarding_school_name &&
      !value.campaign_id
    ) {
      throw new Error('At least one field is required')
    }
    return value
  }

  return (
    <NodeFormContainer initialValues={data} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <SuggestionField name="name" as="input" label="Name" />
      <SuggestionField name="age" as="input" label="Age" />
      <SuggestionField name="campaign_id" as="input" label="Campaign ID" />
      <SuggestionField name="level_id" as="input" label="Level ID" />
      <SuggestionField name="node_id" as="input" label="Node ID" />
      <SuggestionField name="whatsapp_onboarding_dise_code" as="input" label="Dise Code" />
      <SuggestionField name="whatsapp_onboarding_course" as="input" label="Course name" />
      <SuggestionField name="whatsapp_onboarding_school_name" as="input" label="School name" />
    </NodeFormContainer>
  )
}

export default memo(Form)
