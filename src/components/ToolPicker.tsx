import { memo, useCallback } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { AppNodeKeys, nodesRegistry } from '../models/Node.model'
import { selectedFlowAllowedNodesSelector } from '../store/selectors/flow.selector'
import { uiActions } from '../store/slices/UI.slice'
import { MdArrowBackIosNew } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'

interface ToolPickerProps {
  allowedNodes: AppNodeKeys[]
  setNodeToAdd: typeof uiActions.setNodeToAdd
  setIsToolbarSidePannelExpanded: typeof uiActions.setIsToolbarSidePannelExpanded
}

const ToolPicker: React.FC<ToolPickerProps> = ({ allowedNodes, setNodeToAdd, setIsToolbarSidePannelExpanded }) => {
  const handleNodeSelect = useCallback(
    (nodeType: AppNodeKeys) => {
      setNodeToAdd(nodeType)
    },
    [setNodeToAdd]
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <button onClick={() => setIsToolbarSidePannelExpanded(false)}>
            <MdArrowBackIosNew className="w-4 h-4 text-blue-600" />
          </button>
          Add Node
        </h3>
      </div>
      <div className="p-2 flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-1">
          {allowedNodes.sort().map((nodeType) => {
            const nodeInfo = nodesRegistry[nodeType]
            const Icon = nodeInfo.Icon

            return (
              <button
                key={nodeType}
                onClick={() => handleNodeSelect(nodeType)}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 hover:shadow-sm rounded-md flex items-center gap-3 transition-all duration-200 group border border-transparent hover:border-gray-200"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${nodeInfo.color} flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow duration-200`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {nodeType.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <IoAdd className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  allowedNodes: selectedFlowAllowedNodesSelector(state),
})

const mapDispatchToProps = {
  setNodeToAdd: uiActions.setNodeToAdd,
  setIsToolbarSidePannelExpanded: uiActions.setIsToolbarSidePannelExpanded,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ToolPicker))
