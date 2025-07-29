import { FC, memo, useCallback, useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { CiSaveDown2 } from 'react-icons/ci'
import { Panel, PanelPosition } from '@xyflow/react'
import { Link } from 'react-router-dom'
import { BiHome } from 'react-icons/bi'
import { connect } from 'react-redux'
import { flowActions } from '../store/slices/flow.slice'
import { AppState } from '../store/store'
import { selectedFlowSelector } from '../store/selectors/flow.selector'
import { Flow } from '../models/Flow.model'
import { toast } from 'react-toastify'
import { validateFlow } from '../utils'

type Props = {
  updateFlow: typeof flowActions.flowUpdateTry
  selectedFlow: Flow | null
  position: PanelPosition
  setFlow: typeof flowActions.setFlow
}

const MenuBar: FC<Props> = ({ updateFlow, selectedFlow, position, setFlow }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = useCallback(() => {
    if (!selectedFlow) return

    const validationError = validateFlow(selectedFlow.data.nodes, selectedFlow.data.edges)
    if (validationError) {
      toast.error(validationError.error, { autoClose: false })
      setFlow({
        flow: {
          ...selectedFlow,
          data: {
            ...selectedFlow.data,
            nodes: selectedFlow.data.nodes.map((node) => ({ ...node, selected: validationError.cause?.nodeIds?.includes(node.id) || false })),
            edges: selectedFlow.data.edges.map((edge) => ({ ...edge, selected: validationError.cause?.edgeIds?.includes(edge.id) || false })),
          },
        },
      })
    } else {
      updateFlow({ id: selectedFlow.id, data: { data: selectedFlow.data, name: selectedFlow.name, type: selectedFlow.type } })
    }

    setIsOpen(false)
  }, [selectedFlow, updateFlow, setFlow])

  return (
    <Panel className="bg-white rounded-md shadow-lg" position={position}>
      <div className="relative">
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <IoMenu className="w-5 h-5 text-gray-600" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10 border">
            <Link to="/" className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 min-w-max">
              <BiHome className="w-5 h-5 mr-3" />
              <span className="flex-grow">Home</span>
            </Link>
            <button onClick={handleSave} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <CiSaveDown2 className="w-5 h-5 mr-3" />
              <span className="flex-grow">Save</span>
            </button>
          </div>
        )}
      </div>
    </Panel>
  )
}

const mapStateToProps = (state: AppState) => ({
  selectedFlow: selectedFlowSelector(state),
})

const mapDispatchToProps = {
  updateFlow: flowActions.flowUpdateTry,
  setFlow: flowActions.setFlow,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(MenuBar))
