import useReactFlowStore from '../store/reactFlow.store'
import { useCallback } from 'react'
import { AppNode } from '../nodes'

const useUpdateOrAddNode = () => {
  const addNode = useReactFlowStore((state) => state.addNode)
  const setNodeToAdd = useReactFlowStore((state) => state.setNodeToAdd)
  const setSelectedNodeId = useReactFlowStore((state) => state.setSelectedNodeId)
  const editNodeData = useReactFlowStore((state) => state.editNodeData)

  const handleCloseSideBar = useCallback(() => {
    setSelectedNodeId(null)
    setNodeToAdd(null)
  }, [])

  const updateOrAddNode = useCallback(
    (node: AppNode, change: 'add' | 'edit', closeSideBar: boolean = false) => {
      if (change === 'add') {
        addNode(node)
      } else {
        editNodeData(node.id, node.data)
      }
      closeSideBar && handleCloseSideBar()
    },
    [handleCloseSideBar]
  )

  return {
    updateOrAddNode,
  }
}

export default useUpdateOrAddNode
