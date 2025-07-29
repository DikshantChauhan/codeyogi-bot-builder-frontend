import { uiSelector } from './app.selector'
import { createSelector } from '@reduxjs/toolkit'
import { selectedFlowSelector } from './flow.selector'

export const pannelClickedPositionSelector = createSelector(uiSelector, (ui) => ui.pannelClickedPosition)

export const nodeToAddSelector = createSelector(uiSelector, (ui) => ui.nodeToAdd)

export const flowSelectionSelector = createSelector([selectedFlowSelector], (flow) => {
  if (!flow) return
  const { nodes, edges } = flow.data

  const selectedNodes = nodes.filter((node) => node.selected === true)
  const selectedEdges = edges.filter((edge) => edge.selected === true)

  return { nodes: selectedNodes, edges: selectedEdges }
})

export const selectedNodeSelector = createSelector([flowSelectionSelector], (flowSelection) => {
  if (!flowSelection) return

  const { nodes } = flowSelection

  if (nodes.length === 1) {
    return nodes[0]
  }

  return
})

export const isToolbarSidePannelExpandedSelector = createSelector(uiSelector, (ui) => ui.isToolbarSidePannelExpanded)

export const isShortcutMenuOpenSelector = createSelector(uiSelector, (ui) => ui.isShortcutMenuOpen)