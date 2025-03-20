import { FC, memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { MessageNodeData, MessageNodeType } from './type'
import SuggestionField from '../../../components/SuggestionField'

interface Props {
  node?: MessageNodeType
}

const MessageForm: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<MessageNodeData> = (value) => {
    if (!value.text) {
      throw new Error('Text is required')
    }

    return value
  }

  return (
    <NodeFormContainer initialValues={data || { text: '' }} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div>
        <SuggestionField
          as="textarea"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          name="text"
          placeholder="Enter message..."
        />
      </div>
    </NodeFormContainer>
  )
}

export default memo(MessageForm)
