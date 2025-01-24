import { AppNode } from '../nodes'

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../store/store'
import { Connection } from '@xyflow/react'
import { useCallback } from 'react'
import { getSourceHandleConnection } from '../utils'
import { AppEdge } from '../edges'

const useAppData = () => {
  const storeData = useAppStore(
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

  const { setSelectedNodeId, edges, reconnectingEdge } = storeData

  const onNodeClick = useCallback(
    (_: React.MouseEvent<Element, MouseEvent>, node: AppNode) => {
      setSelectedNodeId(node.id)
    },
    [setSelectedNodeId]
  )

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
    ...storeData,
  }
}

export default useAppData
