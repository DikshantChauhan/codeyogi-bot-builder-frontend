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
import { START_NODE_KEY } from '../nodes/customs/start/type'
import { END_NODE_KEY } from '../nodes/customs/end/type'
import { toast } from 'react-toastify'

type Props = {
  updateFlow: typeof flowActions.flowUpdateTry
  selectedFlow: Flow | null
  position: PanelPosition
}

const MenuBar: FC<Props> = ({ updateFlow, selectedFlow, position }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = useCallback(() => {
    if (!selectedFlow) return
    const nodes = selectedFlow.data.nodes
    const edges = selectedFlow.data.edges

    //validate start and end nodes
    const startNode = nodes.find((node) => node.type === START_NODE_KEY)
    const endNode = nodes.find((node) => node.type === END_NODE_KEY)

    if (!startNode || !endNode) {
      toast.error('Start and end nodes are required for a flow')
      return
    }

    const senetizedEdges = edges.filter((edge) => {
      const isTargetPresent = nodes.find((node) => node.id === edge.target)
      const isSourcePresent = nodes.find((node) => node.id === edge.source)

      return isTargetPresent && isSourcePresent
    })

    updateFlow({ id: selectedFlow.id, data: { ...selectedFlow, data: { ...selectedFlow.data, edges: senetizedEdges } } })
    setIsOpen(false)
  }, [selectedFlow, updateFlow])

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
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(MenuBar))
