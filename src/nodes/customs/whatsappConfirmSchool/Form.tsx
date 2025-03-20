import { memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappConfirmSchoolNodeData, WhatsappConfirmSchoolNodeType, WhatsappConfirmSchoolPaths } from './type'
import SuggestionField from '../../../components/SuggestionField'

interface Props {
  node?: WhatsappConfirmSchoolNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = {
    text: node?.data.text || '',
    paths: WhatsappConfirmSchoolPaths,
  }

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappConfirmSchoolNodeData> = (value) => {
    if (!value.text) {
      throw new Error('Text is required')
    }
    return value
  }

  return (
    <NodeFormContainer initialValues={data} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <p className="font-bold">Text</p>
      <SuggestionField name="text" as="textarea" placeholder="school confirmation message" />

      <div className="mt-4">
        <p className="font-bold">Paths</p>
        {data.paths.map((path) => (
          <p>{path}</p>
        ))}
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
