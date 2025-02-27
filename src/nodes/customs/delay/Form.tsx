import { memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { Field } from 'formik'
import { DelayNodeData, DelayNodeType } from './type'
import SuggestionInput from '../../../components/SuggestionField'

interface Props {
  node?: DelayNodeType
}

const parseHumanTime = (humanTime: string): number => {
  const regex = /(\d+)\s*(h|m|s|hour|min|sec|hours|minutes|seconds)?/gi
  let totalSeconds = 0
  let match

  while ((match = regex.exec(humanTime)) !== null) {
    const value = parseInt(match[1])
    const unit = (match[2] || 's').toLowerCase()

    switch (unit[0]) {
      case 'h':
        totalSeconds += value * 3600
        break
      case 'm':
        totalSeconds += value * 60
        break
      default: // seconds
        totalSeconds += value
    }
  }

  return totalSeconds
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<DelayNodeData> = (value) => {
    const delayInSecs = parseHumanTime(value.delayInSecs?.toString() || '0')
    return {
      delayInSecs,
      message: value.message,
    }
  }

  return (
    <NodeFormContainer initialValues={data || { message: '', delayInSecs: 0 }} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <SuggestionInput
        name="message"
        placeholder="Optional message"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Field
        name="delayInSecs"
        placeholder="Delay (e.g. 2h 30m 15s)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-6"
      />
      <div className="text-sm text-gray-500">Examples: "30s", "1h 30m", "2h 15s", "45m"</div>
    </NodeFormContainer>
  )
}

export default memo(Form)
