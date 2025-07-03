import { FC, memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { EndNodeData, EndNodeType } from './type'
import SuggestionInput from '../../../components/Field'

interface Props {
  node?: EndNodeType
}

const EndForm: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<EndNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={data || { text: '' }} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <SuggestionInput
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="text"
        placeholder="Enter end message..."
      />
    </NodeFormContainer>
  )
}

export default memo(EndForm)
