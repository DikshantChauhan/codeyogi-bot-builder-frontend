import { memo, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { nudgeFlowsSelector } from '../store/selectors/flow.selector'
import { AppState } from '../store/store'
import { Flow } from '../models/Flow.model'
import { AppNode, SubFlowValue } from '../models/Node.model'
import { selectedNodeSelector } from '../store/selectors/ui.selector'

interface NodeSubFlowFormProps {
  selectedNudge: SubFlowValue
  setSelectedNudge: (nudge: SubFlowValue) => void
  nudgeFlows: Flow[]
  selectedNode?: AppNode
}

const NodeSubFlowForm = ({ selectedNudge, setSelectedNudge, nudgeFlows, selectedNode }: NodeSubFlowFormProps) => {
  const subFlows = useMemo(
    () => [{ id: 'inherit', name: 'Inherit' }, { id: 'none', name: 'None' }, ...nudgeFlows.map((flow) => ({ id: flow.id, name: flow.name }))],
    [nudgeFlows]
  )

  useEffect(() => {
    if (selectedNode) {
      setSelectedNudge(selectedNode.nudge)
    }
  }, [selectedNode, setSelectedNudge])

  return (
    <div className="space-y-2">
      <label htmlFor="nudge" className="text-sm font-medium capitalize">
        Nudge
      </label>
      <select
        id="nudge"
        value={selectedNudge}
        onChange={(e) => setSelectedNudge(e.target.value as SubFlowValue)}
        className="w-full rounded-md border px-3 py-2"
      >
        {subFlows.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  nudgeFlows: nudgeFlowsSelector(state),
  selectedNode: selectedNodeSelector(state),
})

export default memo(connect(mapStateToProps)(NodeSubFlowForm))
