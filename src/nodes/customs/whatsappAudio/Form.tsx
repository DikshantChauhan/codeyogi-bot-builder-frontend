import { memo, useMemo } from 'react'
import { WhatsappAudioNodeData, WhatsappAudioNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import SuggestionField from '../../../components/SuggestionField'

interface Props {
  node?: WhatsappAudioNodeType
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

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappAudioNodeData> = (value) => {
    if (!value.id && !value.url) {
      throw new Error('Either Audio ID or URL is required')
    }
    return value
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <div className="space-y-2">
          <SuggestionField name="id" placeholder="Enter WhatsApp audio ID" as="input" label="Audio ID (recommended)" />
        </div>
        <div className="text-center text-sm text-gray-500">OR</div>
        <div className="space-y-2">
          <SuggestionField name="url" placeholder="Enter WhatsApp audio URL" as="input" label="Audio URL" />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
