import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { nodeTypes } from './nodes'
import { edgeTypes } from './edges'
import Toolbar from './components/Toolbar'
import ToolSidePanel from './components/ToolSidePanel'
import MenuBar from './components/MenuBar'
import useAppData from './hooks/useAppData'

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick, isConnnectionValid, onReconnect, onReconnectEnd, onReconnectStart } =
    useAppData()

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
