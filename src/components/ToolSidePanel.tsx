import { Panel } from '@xyflow/react'
import { memo, useMemo } from 'react'
import { camelCase } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { nodeToAddSelector, selectedNodeSelector } from '../store/selectors/ui.selector'
import { AppState } from '../store/store'
import { AppNode, AppNodeKeys, nodesRegistry } from '../models/Node.model'
import { selectedFlowAllowedNodesSelector } from '../store/selectors/flow.selector'
import ToolPicker from './ToolPicker'

interface ToolSidePanelProps {
  selectedNode?: AppNode
  allowedNodesKey: AppNodeKeys[]
  nodeToAdd: AppNodeKeys | null
}

const ToolSidePanel: React.FC<ToolSidePanelProps> = ({ selectedNode, allowedNodesKey, nodeToAdd }) => {
  const ToolForm = useMemo(() => {
    const pickedTool = selectedNode?.type || nodeToAdd || null
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
  }, [nodeToAdd, selectedNode, allowedNodesKey])

  return (
    <Panel position="top-left" className="w-80 bottom-0 bg-white z-10 shadow-md drop-shadow rounded-md space-x-2 border flex flex-col">
      {ToolForm ? ToolForm : <ToolPicker />}
    </Panel>
  )
}

const mapStateToProps = (state: AppState) => ({
  nodeToAdd: nodeToAddSelector(state),
  selectedNode: selectedNodeSelector(state),
  allowedNodesKey: selectedFlowAllowedNodesSelector(state),
})

export default memo(connect(mapStateToProps)(ToolSidePanel))
