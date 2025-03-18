import { FC, memo, useMemo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { PromptNodeData, PromptNodeType } from './type'
import { Field } from 'formik'

interface Props {
  node?: PromptNodeType
}

const Form: FC<Props> = ({ node }) => {
  const initialValues = useMemo(() => {
    return {
      type: node?.data.type || 'text',
      min: node?.data.min,
      max: node?.data.max,
    }
  }, [node])

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<PromptNodeData> = (value) => {
    // TODO: validate text
    return value
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      {({ values, setFieldValue }) => (
        <div className="space-y-4">
          <div>
            <label className="block font-bold mb-2">Type</label>
            <Field name="type" as="select" className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="text">Text</option>
              <option value="number">Number</option>
            </Field>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block font-bold mb-2">Min</label>
              <input
                checked={values.min !== undefined}
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onClick={() => {
                  setFieldValue('min', values.min === undefined ? 0 : undefined)
                }}
              />
            </div>
            {values.min !== undefined && (
              <Field
                name="min"
                as="input"
                type="number"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block font-bold mb-2">Max</label>
              <input
                checked={values.max !== undefined}
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onClick={() => {
                  setFieldValue('max', values.max === undefined ? 100 : undefined)
                }}
              />
            </div>
            {values.max !== undefined && (
              <Field
                name="max"
                as="input"
                type="number"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        </div>
      )}
    </NodeFormContainer>
  )
}

export default memo(Form)
