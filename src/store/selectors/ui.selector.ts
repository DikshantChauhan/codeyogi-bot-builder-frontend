import { uiSelector } from './app.selector'
import { createSelector } from '@reduxjs/toolkit'
import { selectedFlowSelector } from './flow.selector'

export const nodeToAddSelector = createSelector(uiSelector, (ui) => ui.nodeToAdd)

export const selectedNodeIdSelector = createSelector(uiSelector, (ui) => ui.selectedNodeId)

export const contextMenuPositionSelector = createSelector(uiSelector, (ui) => ui.contextMenuPosition)

export const isContextMenuOpenSelector = createSelector(uiSelector, (ui) => ui.isContextMenuOpen)

export const selectedNodeSelector = createSelector([selectedNodeIdSelector, selectedFlowSelector], (selectedNodeId, selectedFlow) => {
  return selectedFlow?.data.nodes.find((node) => node.id === selectedNodeId)
})
