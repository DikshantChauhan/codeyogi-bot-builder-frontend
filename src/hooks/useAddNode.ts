import { useReactFlow } from '@xyflow/react'
import useAppStore from '../store/store'
import { useCallback } from 'react'
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

  const changeNode = useCallback(
    (node: AppNode, change: 'add' | 'edit', closeSideBar: boolean = false) => {
      if (change === 'add') {
        const viewport = getViewport()
        const position = {
          x: (viewport.x * -1 + window.innerWidth / 2 - 150) / viewport.zoom,
          y: (viewport.y * -1 + window.innerHeight / 2 - 50) / viewport.zoom,
        }

        setNode({
          ...node,
          dragHandle: '.drag-handle__custom',
          position,
        })
      } else {
        editNodeData(node.id, node.data)
      }
      closeSideBar && handleCloseSideBar()
    },
    [getViewport]
  )

  return {
    changeNode,
  }
}

export default useNodeChange
