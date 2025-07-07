import { memo, useCallback, useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { AppNodeKeys, nodesRegistry } from '../models/Node.model'
import { contextMenuPositionSelector, isContextMenuOpenSelector } from '../store/selectors/ui.selector'
import { selectedFlowAllowedNodesSelector } from '../store/selectors/flow.selector'
import { uiActions } from '../store/slices/UI.slice'

interface ContextMenuProps {
  position: { x: number; y: number } | null
  isOpen: boolean
  allowedNodes: AppNodeKeys[]
  setNodeToAdd: (nodeToAdd: AppNodeKeys | null) => void
  setIsContextMenuOpen: (isOpen: boolean) => void
  setSelectedNodeId: (selectedNodeId: string | null) => void
  setContextMenuPosition: (position: { x: number; y: number } | null) => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  isOpen,
  allowedNodes,
  setNodeToAdd,
  setIsContextMenuOpen,
  setSelectedNodeId,
  setContextMenuPosition,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuDimensions, setMenuDimensions] = useState({ width: 200, height: 200 })

  // Measure actual menu dimensions after render
  useEffect(() => {
    if (menuRef.current && isOpen) {
      const rect = menuRef.current.getBoundingClientRect()
      setMenuDimensions({ width: rect.width, height: rect.height })
    }
  }, [isOpen, allowedNodes.length])

  const handleNodeSelect = useCallback(
    (nodeType: AppNodeKeys) => {
      setNodeToAdd(nodeType)
      setSelectedNodeId(null)
      setIsContextMenuOpen(false)
      // Don't clear context menu position here - let the node form container use it first
    },
    [setNodeToAdd, setSelectedNodeId, setIsContextMenuOpen]
  )

  const handleClose = useCallback(() => {
    setIsContextMenuOpen(false)
    setContextMenuPosition(null)
  }, [setIsContextMenuOpen, setContextMenuPosition])

  if (!isOpen || !position) return null

  // Calculate adjusted position to prevent overflow
  const padding = 10
  const { width: menuWidth, height: menuHeight } = menuDimensions

  const adjustedPosition = {
    x: position.x,
    y: position.y,
  }

  // HORIZONTAL POSITIONING
  // Check if menu would overflow right edge
  if (position.x + menuWidth + padding > window.innerWidth) {
    adjustedPosition.x = position.x - menuWidth
  }

  // Ensure menu doesn't go off the left edge
  if (adjustedPosition.x < padding) {
    adjustedPosition.x = padding
  }

  // VERTICAL POSITIONING
  // Check available space above and below the cursor
  const spaceBelow = window.innerHeight - position.y - padding
  const spaceAbove = position.y - padding

  // Determine best vertical position
  if (spaceBelow >= menuHeight) {
    // Enough space below - position below cursor
    adjustedPosition.y = position.y
  } else if (spaceAbove >= menuHeight) {
    // Enough space above - position above cursor
    adjustedPosition.y = position.y - menuHeight
  } else {
    // Not enough space in either direction - try to fit as much as possible
    if (spaceBelow > spaceAbove) {
      // More space below - position at bottom with what fits
      adjustedPosition.y = window.innerHeight - menuHeight - padding
    } else {
      // More space above - position at top with what fits
      adjustedPosition.y = padding
    }
  }

  // Ensure menu doesn't go off the top edge
  if (adjustedPosition.y < padding) {
    adjustedPosition.y = padding
  }

  // Only add scrolling if menu would still overflow the bottom
  const needsScrolling = adjustedPosition.y + menuHeight + padding > window.innerHeight

  return (
    <>
      {/* Context Menu */}
      <div
        ref={menuRef}
        className={`fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[200px] ${
          needsScrolling ? 'max-h-[300px] overflow-y-auto' : ''
        }`}
        style={{
          left: adjustedPosition.x,
          top: adjustedPosition.y,
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="text-sm font-medium text-gray-700 mb-2 px-2 py-1 border-b border-gray-100">Add Node</div>
        <div className="space-y-1">
          {allowedNodes.sort().map((nodeType) => {
            const nodeInfo = nodesRegistry[nodeType]
            return (
              <button
                key={nodeType}
                onClick={() => handleNodeSelect(nodeType)}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 transition-colors"
              >
                <div className={`w-4 h-4 rounded ${nodeInfo.color}`} />
                <span className="capitalize">{nodeType.replace(/([A-Z])/g, ' $1').trim()}</span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  position: contextMenuPositionSelector(state),
  isOpen: isContextMenuOpenSelector(state),
  allowedNodes: selectedFlowAllowedNodesSelector(state),
})

const mapDispatchToProps = {
  setNodeToAdd: uiActions.setNodeToAdd,
  setIsContextMenuOpen: uiActions.setIsContextMenuOpen,
  setSelectedNodeId: uiActions.setSelectedNodeId,
  setContextMenuPosition: uiActions.setContextMenuPosition,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ContextMenu))
