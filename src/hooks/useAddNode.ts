import { useReactFlow } from '@xyflow/react'
import useAppStore from '../store/store'
import { useCallback, useMemo } from 'react'
import { AppNode } from '../nodes'

const useNodeChange = () => {
  const setNode = useAppStore((state) => state.setNodes)
  const setNodeToAdd = useAppStore((state) => state.setNodeToAdd)
  const setSelectedNodeId = useAppStore((state) => state.setSelectedNodeId)
  const editNodeData = useAppStore((state) => state.editNodeData)
  const { getViewport } = useReactFlow()

  const handleCloseSideBar = useCallback(() => {
    setSelectedNodeId(null)
    setNodeToAdd(null)
  }, [])

  const centerPosition = useMemo(() => {
    const viewport = getViewport()
    return {
      x: (viewport.x * -1 + window.innerWidth / 2 - 150) / viewport.zoom,
      y: (viewport.y * -1 + window.innerHeight / 2 - 50) / viewport.zoom,
    }
  }, [getViewport])

  const changeNode = useCallback(
    (node: Omit<AppNode, 'position' | 'dragHandle'>, change: 'add' | 'edit', closeSideBar: boolean = false) => {
      if (change === 'add') {
        setNode({
          ...node,
          dragHandle: '.drag-handle__custom',
          position: centerPosition,
        } as AppNode)
      } else {
        editNodeData(node.id, node.data)
      }
      closeSideBar && handleCloseSideBar()
    },
    [centerPosition, handleCloseSideBar]
  )

  return {
    changeNode,
  }
}

export default useNodeChange
