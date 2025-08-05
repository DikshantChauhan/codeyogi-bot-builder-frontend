import { Panel } from '@xyflow/react'
import { memo, useMemo } from 'react'
import React from 'react'
import { connect } from 'react-redux'
import { isToolbarSidePannelExpandedSelector, nodeToAddSelector, selectedNodeSelector } from '../store/selectors/ui.selector'
import { AppState } from '../store/store'
import { AppNode, AppNodeKeys, nodesRegistry } from '../models/Node.model'
import { selectedFlowAllowedNodesSelector } from '../store/selectors/flow.selector'
import ToolPicker from './ToolPicker'
import { MdArrowForwardIos } from 'react-icons/md'
import { uiActions } from '../store/slices/UI.slice'

interface ToolSidePanelProps {
  selectedNode?: AppNode
  allowedNodesKey: AppNodeKeys[]
  nodeToAdd: AppNodeKeys | null
  isToolbarSidePannelExpanded: boolean
  setIsToolbarSidePannelExpanded: typeof uiActions.setIsToolbarSidePannelExpanded
}

const ToolSidePanel: React.FC<ToolSidePanelProps> = ({
  selectedNode,
  allowedNodesKey,
  nodeToAdd,
  isToolbarSidePannelExpanded,
  setIsToolbarSidePannelExpanded,
}) => {
  const ToolForm = useMemo(() => {
    const pickedTool = selectedNode?.type || nodeToAdd || null
    if (!pickedTool || !(pickedTool in nodesRegistry) || !allowedNodesKey.includes(pickedTool as AppNodeKeys)) return null

    return nodesRegistry[pickedTool].Form
  }, [nodeToAdd, selectedNode?.type, allowedNodesKey])

  return (
    <Panel
      position="top-left"
      className={`bottom-0 bg-white z-10 shadow-md drop-shadow rounded-md space-x-2 border flex flex-col ${
        isToolbarSidePannelExpanded ? 'w-80' : 'w-10'
      }`}
    >
      {isToolbarSidePannelExpanded ? (
        ToolForm ? (
          <ToolForm node={selectedNode as any} />
        ) : (
          <ToolPicker />
        )
      ) : (
        <button onClick={() => setIsToolbarSidePannelExpanded(!isToolbarSidePannelExpanded)}>
          <MdArrowForwardIos className="w-4 h-4 text-blue-600 mx-auto mt-2" />
        </button>
      )}
    </Panel>
  )
}

const mapStateToProps = (state: AppState) => ({
  nodeToAdd: nodeToAddSelector(state),
  selectedNode: selectedNodeSelector(state),
  allowedNodesKey: selectedFlowAllowedNodesSelector(state),
  isToolbarSidePannelExpanded: isToolbarSidePannelExpandedSelector(state),
})

const mapDispatchToProps = {
  setIsToolbarSidePannelExpanded: uiActions.setIsToolbarSidePannelExpanded,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ToolSidePanel))
