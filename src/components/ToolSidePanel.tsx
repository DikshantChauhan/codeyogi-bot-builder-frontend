import { Panel } from '@xyflow/react'
import { memo, useMemo } from 'react'
import { camelCase } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { uiActions } from '../store/slices/UI.slice'
import { nodeToAddSelector, selectedNodeSelector } from '../store/selectors/ui.selector'
import { AppState } from '../store/store'
import { AppNode, AppNodeKeys, nodesRegistry } from '../models/Node.model'
import { selectedFlowAllowedNodesSelector } from '../store/selectors/flow.selector'

interface ToolSidePanelProps {
  nodeToAdd: AppNodeKeys | null
  setNodeToAdd: (nodeToAdd: AppNodeKeys | null) => void
  selectedNode?: AppNode
  allowedNodesKey: AppNodeKeys[]
}

const ToolSidePanel: React.FC<ToolSidePanelProps> = ({ nodeToAdd, selectedNode, allowedNodesKey }) => {
  const pickedTool = nodeToAdd || selectedNode?.type

  const ToolForm = useMemo(() => {
    if (!pickedTool || !(pickedTool in nodesRegistry) || !allowedNodesKey.includes(pickedTool as AppNodeKeys)) return null

    // Convert kebab-case to camelCase for folder name
    const folderName = camelCase(pickedTool)

    // Dynamic import of the Form component
    const FormComponent = React.lazy(() =>
      import(`../nodes/customs/${folderName}/Form`).then((module) => ({
        default: module.default as React.ComponentType<{ node?: AppNode }>,
      }))
    )

    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <FormComponent node={selectedNode} />
      </React.Suspense>
    )
  }, [pickedTool, selectedNode, allowedNodesKey])

  return pickedTool && ToolForm ? (
    <Panel position="top-right" className="w-[300px] h-screen p-4 bg-white z-10 shadow-md drop-shadow rounded-md space-x-2 border">
      {ToolForm}
    </Panel>
  ) : (
    <></>
  )
}

const mapStateToProps = (state: AppState) => ({
  nodeToAdd: nodeToAddSelector(state),
  selectedNode: selectedNodeSelector(state),
  allowedNodesKey: selectedFlowAllowedNodesSelector(state),
})

const mapDispatchToProps = {
  setNodeToAdd: uiActions.setNodeToAdd,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ToolSidePanel))
