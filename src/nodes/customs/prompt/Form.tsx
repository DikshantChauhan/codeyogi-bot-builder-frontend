import { FC, memo, useMemo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { PROMPT_NODE_KEY, PromptNodeData } from './type'
import { Field } from 'formik'
import { NodeRegistryFormProps } from '../../../models/Node.model'

const info = `🔹 Prompt Node Behavior

- Used to take user input during the flow.
- You can configure input validation options. If validation fails, the user will receive an error and will be re-prompted to enter the input again.
- When the flow reaches a Prompt node, it pauses and waits for the user's input.
- The inputted (prompted) value can be used later in the flow via the variable dropdown.
- This prompted value is preserved and available until the flow reaches the next Prompt node.
`

const Form: FC<NodeRegistryFormProps<typeof PROMPT_NODE_KEY>> = ({ node }) => {
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
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={info}>
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
