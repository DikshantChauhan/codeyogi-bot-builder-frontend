import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { historyActions } from '../store/slices/history.slice'
import { canUndoSelector, canRedoSelector, historyStatsSelector, historyPresentSelector } from '../store/selectors/history.selector'
import { selectedFlowSelector } from '../store/selectors/flow.selector'
import { flowActions } from '../store/slices/flow.slice'
import { Flow } from '../models/Flow.model'

interface UseHistoryReturn {
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  pushToHistory: (flow: Flow) => void
  clearHistory: () => void
  getStats: () => ReturnType<typeof historyStatsSelector>
}

const useHistory = (): UseHistoryReturn => {
  const dispatch = useDispatch()

  // Selectors
  const canUndo = useSelector(canUndoSelector)
  const canRedo = useSelector(canRedoSelector)
  const stats = useSelector(historyStatsSelector)
  const presentFlow = useSelector(historyPresentSelector)
  const selectedFlow = useSelector(selectedFlowSelector)

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch(historyActions.undo())

      // Get the previous flow from the history and update the flow state
      const previousFlow = presentFlow
      if (previousFlow) {
        dispatch(flowActions.setFlow({ flow: previousFlow }))
      }
    }
  }, [dispatch, canUndo, presentFlow])

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch(historyActions.redo())

      // Get the next flow from the history and update the flow state
      const nextFlow = presentFlow
      if (nextFlow) {
        dispatch(flowActions.setFlow({ flow: nextFlow }))
      }
    }
  }, [dispatch, canRedo, presentFlow])

  const pushToHistory = useCallback(
    (flow: Flow) => {
      dispatch(historyActions.pushToHistory(flow))
    },
    [dispatch]
  )

  const clearHistory = useCallback(() => {
    dispatch(historyActions.clearHistory())
  }, [dispatch])

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
    clearHistory,
    getStats,
  }
}

export default useHistory
