import { FC, memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappMessageNodeData, WhatsappMessageNodeType } from './type'
import SuggestionField from '../../../components/Field'
import { Field } from 'formik'

interface Props {
  node?: WhatsappMessageNodeType
}

const WhatsappMessageForm: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappMessageNodeData> = (value) => {
    if (!value.text) {
      throw new Error('Text is required')
    }

    return value
  }

  return (
    <NodeFormContainer initialValues={data || { text: '', previewUrl: false }} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <div>
          <SuggestionField
            as="textarea"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            name="text"
            placeholder="Enter message..."
          />
        </div>
        <div className="flex items-center">
          <Field type="checkbox" name="previewUrl" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          <label className="ml-2 text-sm text-gray-700">Enable URL preview</label>
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(WhatsappMessageForm)
