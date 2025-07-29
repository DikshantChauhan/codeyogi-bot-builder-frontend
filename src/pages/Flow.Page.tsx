import { ReactFlow, Background, Controls, MiniMap, Panel, SelectionMode } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import ToolSidePanel from '../components/ToolSidePanel'
import MenuBar from '../components/MenuBar'
import { DIRECTIONAL_EDGE_KEY } from '../edges/custom/directional/type'
import { memo } from 'react'
import Loading from '../components/Loading'
import useFlowPageData from '../hooks/useFlowPageData'
import Error from '../components/Error'
import { edgeTypes } from '../models/Edge.model'
import ShortcutsPopup from '../components/ShortcutsPopup'

const FlowPage = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isConnnectionValid,
    onReconnect,
    onReconnectEnd,
    onReconnectStart,
    selectedFlowError,
    selectedFlowLoading,
    nodeTypes,
    updateLoading,
    onPaneClick,
    onNodeClick,
    onSelectionChange,
    onSelectionEnd,
  } = useFlowPageData()

  if (selectedFlowError) return <Error message={selectedFlowError} />

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          onPaneClick={onPaneClick}
          selectNodesOnDrag={false}
          isValidConnection={isConnnectionValid}
          onReconnectStart={onReconnectStart}
          onReconnectEnd={onReconnectEnd}
          onReconnect={onReconnect}
          defaultEdgeOptions={{ type: DIRECTIONAL_EDGE_KEY }}
          nodesDraggable
          selectionMode={SelectionMode.Full}
          elementsSelectable
          onNodeClick={onNodeClick}
          onSelectionChange={onSelectionChange}
          onSelectionEnd={onSelectionEnd}
        >
          <MenuBar position="top-right" />
          <ToolSidePanel />
          <Background color="white" />
          <MiniMap className="border border-gray-400" />
          <Controls position="bottom-right" />
          {selectedFlowLoading && (
            <Panel position="top-center">
              <Loading message="Fetching flow" />
            </Panel>
          )}
          {updateLoading && (
            <Panel position="top-center">
              <Loading message="updating flow" />
            </Panel>
          )}
          <Panel position="bottom-center">
            <p className="text-gray-200 text-sm bg-gray-600 px-2 py-1 rounded-md">shift + k to open shortcut menu</p>
          </Panel>

          <ShortcutsPopup />
        </ReactFlow>
      </div>
    </div>
  )
}

export default memo(FlowPage)
