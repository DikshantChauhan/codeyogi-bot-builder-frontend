import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { historyActions } from '../store/slices/history.slice'
import {
  canUndoSelector,
  canRedoSelector,
  historyStatsSelector,
  historyPresentSelector,
  historyPastSelector,
  historyFutureSelector,
} from '../store/selectors/history.selector'
import { selectedFlowSelector } from '../store/selectors/flow.selector'
import { flowActions } from '../store/slices/flow.slice'
import { Flow } from '../models/Flow.model'
import { AppNode } from '../models/Node.model'

const useHistory = () => {
  const dispatch = useDispatch()

  // Selectors
  const canUndo = useSelector(canUndoSelector)
  const canRedo = useSelector(canRedoSelector)
  const stats = useSelector(historyStatsSelector)
  const presentFlow = useSelector(historyPresentSelector)
  const selectedFlow = useSelector(selectedFlowSelector)
  const historyPastFlows = useSelector(historyPastSelector)
  const historyFutureFlows = useSelector(historyFutureSelector)

  const undo = useCallback(() => {
    if (canUndo) {
      // Get the previous flow from the past before dispatching undo
      const previousFlow = historyPastFlows[historyPastFlows.length - 1]

      dispatch(historyActions.undo())

      // Update the flow state with the previous flow
      if (previousFlow) {
        dispatch(flowActions.setFlow({ flow: previousFlow }))
      }
    }
  }, [dispatch, canUndo, historyPastFlows])

  const redo = useCallback(() => {
    if (canRedo) {
      // Get the next flow from the future before dispatching redo
      const nextFlow = historyFutureFlows[0]

      dispatch(historyActions.redo())

      // Update the flow state with the next flow
      if (nextFlow) {
        dispatch(flowActions.setFlow({ flow: nextFlow }))
      }
    }
  }, [dispatch, canRedo, historyFutureFlows])

  const isPositionChangeHistory = (prevFlow: Flow, currFlow: Flow) => {
    const prevFlowNodes = prevFlow.data.nodes
    const currFlowNodes = currFlow.data.nodes
    const isSuspectToPositionChange =
      prevFlowNodes.length === currFlowNodes.length && prevFlowNodes.every((node, index) => node.id === currFlowNodes[index].id)
    if (!isSuspectToPositionChange) {
      return false
    }

    let nodeChangedOriginal: AppNode | undefined
    let nodeChangedNew: AppNode | undefined

    currFlowNodes.forEach((node) => {
      const prevNode = prevFlowNodes.find((n) => n.id === node.id)!
      const isChanged = JSON.stringify(node) !== JSON.stringify(prevNode)
      if (isChanged) {
        nodeChangedOriginal = prevNode
        nodeChangedNew = node
      }
    })

    if (!nodeChangedOriginal || !nodeChangedNew) {
      return false
    }

    // Fixed: Use OR instead of AND to detect position changes
    const isPositionChange =
      nodeChangedOriginal.position.x !== nodeChangedNew.position.x || nodeChangedOriginal.position.y !== nodeChangedNew.position.y

    return isPositionChange
  }

  const pushToHistory = useCallback(
    (currentFlow: Flow) => {
      const prevFlow = presentFlow

      if (!prevFlow) {
        dispatch(historyActions.pushToHistory(currentFlow))
        return
      }

      const isFlowsSame = JSON.stringify(prevFlow) === JSON.stringify(currentFlow)
      if (isFlowsSame) {
        return
      }

      const isPositionChange = isPositionChangeHistory(prevFlow, currentFlow)
      if (!isPositionChange) {
        dispatch(historyActions.pushToHistory(currentFlow))
        return
      }

      const preFlowPrev = historyPastFlows[historyPastFlows.length - 2]

      if (preFlowPrev && !isPositionChangeHistory(preFlowPrev, prevFlow)) {
        dispatch(historyActions.pushToHistory(currentFlow))
        return
      }

      // For position changes, replace the last history entry instead of pushing a new one
      dispatch(historyActions.replaceLastHistoryEntry(currentFlow))
    },
    [dispatch, presentFlow, historyPastFlows]
  )

  const getStats = useCallback(() => {
    return stats
  }, [stats])

  // Initialize history when a flow is selected
  useEffect(() => {
    if (selectedFlow && !presentFlow) {
      pushToHistory(selectedFlow)
    }
  }, [selectedFlow, presentFlow, pushToHistory])

  return {
    canUndo,
    canRedo,
    undo,
    redo,
    pushToHistory,
    getStats,
  }
}

export default useHistory
