import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { Field } from 'formik'
import { DelayNodeData, DelayNodeType } from './type'
import SuggestionInput from '../../../components/SuggestionField'
import { AppState } from '../../../store/store'
import { selectedFlowSelector } from '../../../store/selectors/flow.selector'
import { Flow } from '../../../models/Flow.model'
import { connect } from 'react-redux'
import { memo } from 'react'

interface Props {
  node?: DelayNodeType
  flow: Flow | null
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

const toHumanTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${hours}h ${minutes}m ${remainingSeconds}s`
}

const Form: React.FC<Props> = ({ node, flow }) => {
  const data = node?.data

  const initialValues = {
    message: data?.message || '',
    delayInSecs: (data?.delayInSecs ? toHumanTime(data.delayInSecs) : 0) as number,
  }

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<DelayNodeData> = (value) => {
    const delayInSecs = parseHumanTime(value.delayInSecs?.toString() || '0')
    return {
      delayInSecs,
      message: value.message,
    }
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      {flow?.type === 'level' && (
        <SuggestionInput
          name="message"
          placeholder="Optional message ( this will be sent if the delay is not completed and user try to interact i.e will not run on first time running )"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      <Field
        name="delayInSecs"
        placeholder="Delay (e.g. 2h 30m 15s)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-6"
      />
      <div className="text-sm text-gray-500">Examples: "30s", "1h 30m", "2h 15s", "45m"</div>
    </NodeFormContainer>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    flow: selectedFlowSelector(state),
  }
}

export default memo(connect(mapStateToProps)(Form))
