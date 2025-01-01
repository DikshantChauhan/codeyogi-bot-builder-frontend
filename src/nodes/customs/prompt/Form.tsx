import { FC, memo, useCallback } from 'react'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'
import { PromptNodeData, PromptNodeType } from './type'
import { Field } from 'formik'

interface Props {
  node?: PromptNodeType
}

const Form: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormToNode: TransFormToNode<PromptNodeData> = useCallback((value) => {
    return {
      data: value,
      id: node?.id || getRandomId(),
      type: 'prompt',
      position: { x: 0, y: 0 },
    }
  }, [])

  return (
    <NodeFormContiner data={data || { text: '' }} transformToNode={transFormToNode} title="Prompt" updating={!!node}>
      <Field
        as="textarea"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="Enter prompt..."
        name="text"
      />
    </NodeFormContiner>
  )
}

export default memo(Form)
