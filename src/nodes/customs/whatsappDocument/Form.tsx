import { memo, useMemo } from 'react'
import { WhatsappDocumentNodeData, WhatsappDocumentNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import SuggestionField from '../../../components/SuggestionField'

interface Props {
  node?: WhatsappDocumentNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const initialValues = useMemo(
    () => ({
      id: data?.id || '',
      url: data?.url || '',
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappDocumentNodeData> = (value) => {
    if (!value.id && !value.url) {
      throw new Error('Either Document ID or URL is required')
    }
    return value
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <div className="space-y-2">
          <SuggestionField name="id" placeholder="Enter WhatsApp document ID" as="input" label="Document ID (recommended)" />
        </div>
        <div className="text-center text-sm text-gray-500">OR</div>
        <div className="space-y-2">
          <SuggestionField name="url" placeholder="Enter WhatsApp document URL" as="input" label="Document URL" />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
