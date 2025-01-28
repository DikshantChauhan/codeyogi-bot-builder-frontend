import { memo, useMemo } from 'react'
import useFlowStore, { SubFlowsMapValue } from '../store/flow.store'
import { Field } from 'formik'

interface NodeSubFlowFormProps {
  nudgeSelectorName: string
  validatorSelectorName: string
}

const NodeSubFlowForm = ({ nudgeSelectorName, validatorSelectorName }: NodeSubFlowFormProps) => {
  const allFlows = useFlowStore((state) => state.flows)

  const allNudges = useMemo(() => allFlows.filter((flow) => flow.type === 'nudge'), [allFlows])
  const allValidators = useMemo(() => allFlows.filter((flow) => flow.type === 'validator'), [allFlows])

  return (
    <div>
      {(['nudge', 'validator'] as const).map((type) => {
        const flows = type === 'nudge' ? allNudges : allValidators
        const options: SubFlowsMapValue[] = ['inherit', 'none', ...flows.map((flow) => flow.name)]

        return (
          <div key={type} className="space-y-2">
            <label htmlFor={type} className="text-sm font-medium capitalize">
              {type}
            </label>
            <Field
              as="select"
              id={type}
              name={type === 'nudge' ? nudgeSelectorName : validatorSelectorName}
              className="w-full rounded-md border px-3 py-2"
            >
              {options.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Field>
          </div>
        )
      })}
    </div>
  )
}

export default memo(NodeSubFlowForm)
