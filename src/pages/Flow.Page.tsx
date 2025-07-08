import { ReactFlow, Background, Controls, MiniMap, Panel } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import ToolSidePanel from '../components/ToolSidePanel'
import ContextMenu from '../components/ContextMenu'
import MenuBar from '../components/MenuBar'
import { DIRECTIONAL_EDGE_KEY } from '../edges/custom/directional/type'
import { memo } from 'react'
import Loading from '../components/Loading'
import useFlowPageData from '../hooks/useFlowPageData'
import Error from '../components/Error'
import { edgeTypes } from '../models/Edge.model'
import { useFlowPageContextMenu } from '../hooks/useFlowPageContextMenu'

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
    onNodeClick,
    updateLoading,
    onNodeDelete,
  } = useFlowPageData()

  const { onPaneContextMenu, onPaneClick } = useFlowPageContextMenu()

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
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onPaneContextMenu={onPaneContextMenu}
          selectNodesOnDrag={false}
          deleteKeyCode={['Backspace', 'Delete']}
          isValidConnection={isConnnectionValid}
          onReconnectStart={onReconnectStart}
          onReconnectEnd={onReconnectEnd}
          onReconnect={onReconnect}
          defaultEdgeOptions={{ type: DIRECTIONAL_EDGE_KEY }}
          onNodesDelete={onNodeDelete}
        >
          <MenuBar />
          <ToolSidePanel />
          <Background color="white" />
          <MiniMap className="border border-gray-400" />
          <Controls position="bottom-right" />
          {selectedFlowLoading && (
            <Panel position="top-left">
              <Loading message="Fetching flow" />
            </Panel>
          )}
          {updateLoading && (
            <Panel position="top-left">
              <Loading message="updating flow" />
            </Panel>
          )}
        </ReactFlow>
        <ContextMenu />
      </div>
    </div>
  )
}

export default memo(FlowPage)
