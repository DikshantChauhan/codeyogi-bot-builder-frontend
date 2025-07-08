import { uiSelector } from './app.selector'
import { createSelector } from '@reduxjs/toolkit'
import { selectedFlowSelector } from './flow.selector'

export const selectedNodeRefSelector = createSelector(uiSelector, (ui) => ui.selectedNodeRef)

export const contextMenuPositionSelector = createSelector(uiSelector, (ui) => ui.contextMenuPosition)

export const isContextMenuOpenSelector = createSelector(uiSelector, (ui) => ui.isContextMenuOpen)

export const selectedNodeSelector = createSelector([selectedNodeRefSelector, selectedFlowSelector], (selectedNodeRef, selectedFlow) => {
  if (!selectedNodeRef || !selectedFlow) return undefined

  if ('id' in selectedNodeRef) {
    return selectedFlow.data.nodes.find((node) => node.id === selectedNodeRef.id)
  }

  return undefined
})
