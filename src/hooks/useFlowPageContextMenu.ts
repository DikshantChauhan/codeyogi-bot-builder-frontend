import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useReactFlow } from '@xyflow/react'
import { uiActions } from '../store/slices/UI.slice'
import React from 'react'

export const useFlowPageContextMenu = () => {
  const dispatch = useDispatch()
  const { screenToFlowPosition } = useReactFlow()

  const onPaneContextMenu = useCallback(
    (event: MouseEvent | React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault()
      event.stopPropagation()

      // Convert screen position to flow position for node placement
      const flowPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      // Store both screen position (for context menu) and flow position (for node placement)
      dispatch(
        uiActions.setContextMenuPosition({
          x: event.clientX,
          y: event.clientY,
          flowX: flowPosition.x,
          flowY: flowPosition.y,
        })
      )
      dispatch(uiActions.setIsContextMenuOpen(true))
    },
    [dispatch, screenToFlowPosition]
  )

  const onPaneClick = useCallback(() => {
    dispatch(uiActions.setIsContextMenuOpen(false))
    dispatch(uiActions.setContextMenuPosition(null))
  }, [dispatch])

  // Prevent default context menu on the entire document
  React.useEffect(() => {
    const preventDefaultContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    document.addEventListener('contextmenu', preventDefaultContextMenu)

    return () => {
      document.removeEventListener('contextmenu', preventDefaultContextMenu)
    }
  }, [])

  return {
    onPaneContextMenu,
    onPaneClick,
  }
}
