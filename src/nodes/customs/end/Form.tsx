import { FC, memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { EndNodeData, EndNodeType } from './type'
import { Field } from 'formik'

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
      <div>
        <Field
          as="textarea"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          name="text"
          placeholder="Enter end message..."
        />
      </div>
    </NodeFormContainer>
  )
}

export default memo(EndForm)
