import { memo, useMemo } from 'react'
import { Field } from 'formik'
import { connect } from 'react-redux'
import { nudgeFlowsSelector } from '../store/selectors/flow.selector'
import { AppState } from '../store/store'
import { Flow } from '../models/Flow.model'

interface NodeSubFlowFormProps {
  nudgeSelectorName: string
  nudgeFlows: Flow[]
}

const NodeSubFlowForm = ({ nudgeSelectorName, nudgeFlows }: NodeSubFlowFormProps) => {
  const subFlows = useMemo(
    () => [{ id: 'inherit', name: 'Inherit' }, { id: 'none', name: 'None' }, ...nudgeFlows.map((flow) => ({ id: flow.id, name: flow.name }))],
    [nudgeFlows]
  )
  return (
    <div className="space-y-2">
      <label htmlFor={nudgeSelectorName} className="text-sm font-medium capitalize">
        {nudgeSelectorName}
      </label>
      <Field as="select" id={nudgeSelectorName} name={nudgeSelectorName} className="w-full rounded-md border px-3 py-2">
        {subFlows.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Field>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  nudgeFlows: nudgeFlowsSelector(state),
})

export default memo(connect(mapStateToProps)(NodeSubFlowForm))
