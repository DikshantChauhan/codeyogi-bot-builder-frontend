import { createSelector } from 'reselect'
import { AppState } from '../store'

// Base selector for history state
const historyStateSelector = (state: AppState) => state.history

// Selectors for history state
export const historyPastSelector = createSelector([historyStateSelector], (history) => history.past)

export const historyPresentSelector = createSelector([historyStateSelector], (history) => history.present)

export const historyFutureSelector = createSelector([historyStateSelector], (history) => history.future)

export const historyMaxSizeSelector = createSelector([historyStateSelector], (history) => history.maxHistorySize)

// Computed selectors
export const canUndoSelector = createSelector([historyPastSelector], (past) => past.length > 0)

export const canRedoSelector = createSelector([historyFutureSelector], (future) => future.length > 0)

export const historyStatsSelector = createSelector(
  [historyPastSelector, historyFutureSelector, historyPresentSelector, historyMaxSizeSelector],
  (past, future, present, maxSize) => ({
    pastCount: past.length,
    futureCount: future.length,
    hasPresent: !!present,
    maxSize,
  })
)
