import { useCallback } from 'react'
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react'
import { useShallow } from 'zustand/react/shallow'
import '@xyflow/react/dist/style.css'
import { AppNode, nodeTypes } from './nodes'
import { edgeTypes } from './edges'
import useAppStore, { appselector } from './store/store'
import Toolbar from './components/Toolbar'
import ToolSidePanel from './components/ToolSidePanel'
import MenuBar from './components/MenuBar'

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setSelectedNodeId } = useAppStore(useShallow(appselector))

  const onNodeClick = useCallback(
    (_: React.MouseEvent<Element, MouseEvent>, node: AppNode) => {
      setSelectedNodeId(node.id)
    },
    [setSelectedNodeId]
  )

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
