import { AppNode } from '../nodes'

import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../store/store'
import { Connection, Edge } from '@xyflow/react'
import { useCallback } from 'react'

const useAppData = () => {
  const storeData = useAppStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      setSelectedNodeId: state.setSelectedNodeId,
    }))
  )

  const { setSelectedNodeId } = storeData

  const onNodeClick = useCallback(
    (_: React.MouseEvent<Element, MouseEvent>, node: AppNode) => {
      setSelectedNodeId(node.id)
    },
    [setSelectedNodeId]
  )

  const isConnnectionValid = useCallback((connection: Edge | Connection) => {
    // const targetId = connection.target
    // const sourceId = connection.source

    //no self connections
    if (connection.source === connection.target) return false

    return true
  }, [])

  return {
    onNodeClick,
    isConnnectionValid,
    ...storeData,
  }
}

export default useAppData
