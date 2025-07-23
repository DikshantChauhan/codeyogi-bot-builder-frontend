import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { historyActions } from '../store/slices/history.slice'
import { canUndoSelector, canRedoSelector, historyCurrentSnapshotIndexSelector, historySnapshotsSelector } from '../store/selectors/history.selector'
import { selectedFlowSelector } from '../store/selectors/flow.selector'
import { flowActions } from '../store/slices/flow.slice'
import { Flow } from '../models/Flow.model'
import { toast } from 'react-toastify'

const useHistory = () => {
  const dispatch = useDispatch()

  // Selectors
  const canUndo = useSelector(canUndoSelector)
  const canRedo = useSelector(canRedoSelector)
  const selectedFlow = useSelector(selectedFlowSelector)
  const currentSnapshotIndex = useSelector(historyCurrentSnapshotIndexSelector)
  const snapshots = useSelector(historySnapshotsSelector)

  const undo = useCallback(() => {
    if (!canUndo) {
      toast.warn('No more history to undo', { toastId: 'undo warning' })
      return
    }
    // Get the previous flow from the past before dispatching undo
    const previousFlow = snapshots[currentSnapshotIndex! - 1]

    dispatch(historyActions.undo())

    // Update the flow state with the previous flow
    if (previousFlow) {
      dispatch(flowActions.setFlow({ flow: previousFlow }))
    }
  }, [dispatch, canUndo, currentSnapshotIndex, snapshots])

  const redo = useCallback(() => {
    if (!canRedo) {
      toast.warn('No more history to redo', { toastId: 'redo warning' })
      return
    }
    // Get the next flow from the future before dispatching redo
    const nextFlow = snapshots[currentSnapshotIndex! + 1]

    dispatch(historyActions.redo())

    // Update the flow state with the next flow
    if (nextFlow) {
      dispatch(flowActions.setFlow({ flow: nextFlow }))
    }
  }, [dispatch, canRedo, currentSnapshotIndex, snapshots])

  const isPositionChangeHistory = (prevFlow: Flow, currFlow: Flow): boolean => {
    const prevNodes = prevFlow.data.nodes
    const currNodes = currFlow.data.nodes
    const prevEdges = prevFlow.data.edges
    const currEdges = currFlow.data.edges

    // 1. Ensure edges are exactly same (length, ids, props)
    if (JSON.stringify(prevEdges) !== JSON.stringify(currEdges)) return false

    // 2. Ensure nodes are same (same ids, same order)
    const isSameStructure = prevNodes.length === currNodes.length && prevNodes.every((node, i) => node.id === currNodes[i].id)

    if (!isSameStructure) return false

    // 3. Ensure all node changes are only position changes
    for (let i = 0; i < currNodes.length; i++) {
      const prev = prevNodes[i]
      const curr = currNodes[i]

      const positionChanged = prev.position.x !== curr.position.x || prev.position.y !== curr.position.y

      if (positionChanged) {
        return true
      }
    }

    return false // All edges same, and all node changes are position-only
  }

  const pushToHistory = useCallback(
    (incommingFlow: Flow) => {
      const currentFlow = currentSnapshotIndex && snapshots[currentSnapshotIndex]

      if (!currentFlow) {
        dispatch(historyActions.push(incommingFlow))
        return
      }

      const isFlowsSame = JSON.stringify(incommingFlow) === JSON.stringify(currentFlow)
      if (isFlowsSame) return

      const isCurrentChangeOnlyPosition = isPositionChangeHistory(currentFlow, incommingFlow)
      const preFlow = currentSnapshotIndex ? snapshots[currentSnapshotIndex - 1] : null
      const wasPreviousAlsoJustPositionChange = preFlow && isPositionChangeHistory(preFlow, currentFlow)

      if (isCurrentChangeOnlyPosition && wasPreviousAlsoJustPositionChange) {
        // Replace if dragging still continuing
        dispatch(historyActions.replaceLast(incommingFlow))
      } else {
        // Push full new change (non-position or first position change)
        dispatch(historyActions.push(incommingFlow))
      }
    },
    [dispatch, snapshots, currentSnapshotIndex]
  )

  // Initialize history when a flow is selected
  useEffect(() => {
    if (selectedFlow && snapshots.length === 0) {
      pushToHistory(selectedFlow)
    }
  }, [selectedFlow, pushToHistory, snapshots])

  return {
    canUndo,
    canRedo,
    undo,
    redo,
    pushToHistory,
  }
}

export default useHistory
