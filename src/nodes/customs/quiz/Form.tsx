import { memo } from 'react'
import NodeFormContainer,  { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { Field } from 'formik'
import { QuizNodeData, QuizNodeType } from '../quiz/type'
import ListField from '../../../components/ListField'

interface Props {
  node?: QuizNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<QuizNodeData> = (value) => {
    // TODO: validate question, options, rightIndex
    return value
4  }

  return (
    <NodeFormContainer initialValues={data || { question: '', options: ['', ''], rightIndex: -1 }} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      {({ values }) => (
        <>
          <Field
            name="question"
            placeholder="Enter question"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <ListField name="options" labelGenerator={(index) => `Option ${index + 1}`} placeholderGenerator={(index) => `Enter option ${index + 1}`} />

          <p className="text-sm text-gray-600">Select correct answer:</p>
          <div className="flex flex-wrap space-x-2 space-y-1">
            {values?.options.map((_, index) => (
              <label key={index} className="min-w-max max-w-max">
                <Field type="radio" name="rightIndex" value={index} className="appearance-none absolute" />
                <span
                  className={`block text-center border px-2 py-1 rounded w-full cursor-pointer ${
                    index === +values.rightIndex ? 'bg-green-600 text-white ' : ''
                  }`}
                >
                  Option {index + 1}
                </span>
              </label>
            ))}
          </div>
        </>
      )}
    </NodeFormContainer>
  )
}

export default memo(Form)
