import { AppNode } from '../nodes'
import { useShallow } from 'zustand/react/shallow'
import useReactFlowStore from '../store/reactFlow.store'
import { Connection } from '@xyflow/react'
import { useCallback, useEffect } from 'react'
import { getSourceHandleConnection } from '../utils'
import { AppEdge } from '../edges'
import useFlowStore from '../store/flow.store'
import { useParams } from 'react-router-dom'
import { ROUTE_FLOW_EDITOR } from '../constants'
import { toast } from 'react-toastify'

const useFlowEditorData = () => {
  const reactFlowStoreData = useReactFlowStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      setSelectedNodeId: state.setSelectedNodeId,
      onReconnect: state.onReconnect,
      onReconnectStart: state.onReconnectStart,
      onReconnectEnd: state.onReconnectEnd,
      reconnectingEdge: state.reconnectingEdge,
    }))
  )
  const { setSelectedFlowName, selectedFlowName } = useFlowStore(
    useShallow((state) => ({ setSelectedFlowName: state.setSelectedFlowName, selectedFlowName: state.selectedFlowName }))
  )
  const { [ROUTE_FLOW_EDITOR.dynamicKey]: flowName } = useParams<{ [ROUTE_FLOW_EDITOR.dynamicKey]: string }>()

  useEffect(() => {
    if (!flowName) {
      toast.error('Flow name not found in the URL')
    }
    flowName && setSelectedFlowName(flowName)
  }, [flowName, setSelectedFlowName])

  const { setSelectedNodeId, edges, reconnectingEdge } = reactFlowStoreData

  const onNodeClick = useCallback(
    (_: React.MouseEvent<Element, MouseEvent>, node: AppNode) => {
      setSelectedNodeId(node.id)
    },
    [setSelectedNodeId]
  )

  //TODO: fix this, check with three nodes and try to reconnect them
  const isConnnectionValid = useCallback(
    (connection: AppEdge | Connection) => {
      const { source: sourceId, sourceHandle: sourceHandleName } = connection
      console.log(reconnectingEdge)

      //no self connections
      if (connection.source === connection.target) return false

      //no multiple connections to the source handle
      const handleConnections = getSourceHandleConnection(sourceId, sourceHandleName!, edges)
      if (handleConnections.length !== 0) return false

      return true
    },
    [edges, reconnectingEdge]
  )

  return {
    onNodeClick,
    isConnnectionValid,
    selectedFlowName,
    ...reactFlowStoreData,
  }
}

export default useFlowEditorData
