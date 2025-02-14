import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import Toolbar from '../components/Toolbar'
import ToolSidePanel from '../components/ToolSidePanel'
import MenuBar from '../components/MenuBar'
import { DIRECTIONAL_EDGE_KEY } from '../edges/custom/directional/type'
import { memo } from 'react'
import Loading from '../components/Loading'
import useFlowPageData from '../hooks/useFlowPageData'
import Error from '../components/Error'
import { edgeTypes } from '../models/Edge.model'

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
  } = useFlowPageData()

  if (selectedFlowLoading) return <Loading message="Setting up flow" />
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
          selectNodesOnDrag={false}
          deleteKeyCode={['Delete', 'Backspace']}
          isValidConnection={isConnnectionValid}
          onReconnectStart={onReconnectStart}
          onReconnectEnd={onReconnectEnd}
          onReconnect={onReconnect}
          defaultEdgeOptions={{ type: DIRECTIONAL_EDGE_KEY }}
        >
          <MenuBar />
          <Toolbar />
          <ToolSidePanel />
          <Background color="white" />
          <MiniMap className="border border-gray-400" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}

export default memo(FlowPage)
