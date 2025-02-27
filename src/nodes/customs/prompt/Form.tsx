import { FC, memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { PromptNodeData, PromptNodeType } from './type'
import SuggestionField from '../../../components/SuggestionField'

interface Props {
  node?: PromptNodeType
}

const Form: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<PromptNodeData> = (value) => {
    // TODO: validate text
    return value
  }

  return (
    <NodeFormContainer initialValues={data || { text: '' }} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <SuggestionField
        as="textarea"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter prompt..."
        name="text"
      />
    </NodeFormContainer>
  )
}

export default memo(Form)
