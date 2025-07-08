import { Panel } from '@xyflow/react'
import { memo, useMemo } from 'react'
import { camelCase } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { selectedNodeRefSelector, selectedNodeSelector } from '../store/selectors/ui.selector'
import { AppState } from '../store/store'
import { AppNode, AppNodeKeys, nodesRegistry } from '../models/Node.model'
import { selectedFlowAllowedNodesSelector } from '../store/selectors/flow.selector'
import ToolPicker from './ToolPicker'

interface ToolSidePanelProps {
  selectedNodeRef: ReturnType<typeof selectedNodeRefSelector>
  selectedNode?: AppNode
  allowedNodesKey: AppNodeKeys[]
}

const ToolSidePanel: React.FC<ToolSidePanelProps> = ({ selectedNodeRef, selectedNode, allowedNodesKey }) => {
  const pickedTool = (selectedNodeRef && 'type' in selectedNodeRef ? selectedNodeRef.type : selectedNode?.type) || null

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

  return (
    <Panel position="top-left" className="w-80 bottom-0 bg-white z-10 shadow-md drop-shadow rounded-md space-x-2 border flex flex-col">
      {ToolForm ? ToolForm : <ToolPicker />}
    </Panel>
  )
}

const mapStateToProps = (state: AppState) => ({
  selectedNodeRef: selectedNodeRefSelector(state),
  selectedNode: selectedNodeSelector(state),
  allowedNodesKey: selectedFlowAllowedNodesSelector(state),
})

export default memo(connect(mapStateToProps)(ToolSidePanel))
