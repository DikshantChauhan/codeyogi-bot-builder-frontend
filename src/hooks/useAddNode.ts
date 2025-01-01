import { useReactFlow } from '@xyflow/react'
import useAppStore from '../store/store'
import { useCallback } from 'react'
import { AppNode } from '../nodes'

const useNodeChange = () => {
  const setNode = useAppStore((state) => state.setNodes)
  const setNodeToAdd = useAppStore((state) => state.setNodeToAdd)
  const setSelectedNodeId = useAppStore((state) => state.setSelectedNodeId)
  const editNodeData = useAppStore((state) => state.editNodeData)
  const {} = useReactFlow()

  const handleCloseSideBar = useCallback(() => {
    setSelectedNodeId(null)
    setNodeToAdd(null)
  }, [])

  const changeNode = useCallback((node: AppNode, change: 'add' | 'edit', closeSideBar: boolean = false) => {
    // const viewPort = getViewport()
    //calculate current screen center

    if (change === 'add') {
      setNode({ ...node, dragHandle: '.drag-handle__custom' })
    } else {
      editNodeData(node.id, node.data)
    }
    closeSideBar && handleCloseSideBar()
  }, [])

  return {
    changeNode,
  }
}

export default useNodeChange
