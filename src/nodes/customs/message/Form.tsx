import { FC, memo } from 'react'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'
import { MessageNodeData, MessageNodeType } from './type'
import { Field } from 'formik'

interface Props {
  node?: MessageNodeType
}

const MessageForm: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormToNode: TransFormToNode<MessageNodeData> = (value) => {
    return {
      data: value,
      id: node?.id || getRandomId(),
      type: 'message',
      position: { x: 0, y: 0 },
    }
  }

  return (
    <NodeFormContiner data={data || { text: '' }} transformToNode={transFormToNode} title="Message" updating={!!node}>
      <div>
        <Field
          as="textarea"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          name="text"
          placeholder="Enter message..."
        />
      </div>
    </NodeFormContiner>
  )
}

export default memo(MessageForm)
