import { Panel } from '@xyflow/react'
import useReactFlowStore from '../store/reactFlow.store'
import { useMemo } from 'react'
import { nodesUIMeta } from '../nodes'
import { camelCase } from 'lodash'
import React from 'react'
import type { AppNode, NodeTypeKeys } from '../nodes'
import useFlowStore from '../store/flow.store'

interface FormProps {
  node: AppNode | undefined
}

const ToolSidePanel: React.FC = () => {
  const nodeToAdd = useReactFlowStore((state) => state.nodeToAdd)
  const selectedNodeId = useReactFlowStore((state) => state.selectedNodeId)
  const nodes = useReactFlowStore((state) => state.nodes)

  const { getSelectedFlowAllowedNodes } = useFlowStore()
  const allowedNodesKey = getSelectedFlowAllowedNodes()

  const selectedNode = useMemo(() => {
    const node = selectedNodeId && nodes.find((node) => node.id === selectedNodeId)
    return node || undefined
  }, [selectedNodeId, nodes])

  const pickedTool = nodeToAdd || selectedNode?.type

  const ToolForm = useMemo(() => {
    if (!pickedTool || !(pickedTool in nodesUIMeta) || !allowedNodesKey.includes(pickedTool as NodeTypeKeys)) return null

    // Convert kebab-case to camelCase for folder name
    const folderName = camelCase(pickedTool)

    // Dynamic import of the Form component
    const FormComponent = React.lazy(() =>
      import(`../nodes/customs/${folderName}/Form`).then((module) => ({
        default: module.default as React.ComponentType<FormProps>,
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

export default ToolSidePanel
