import { createSelector } from 'reselect'
import { historyStateSelector } from './app.selector'

export const historyCurrentSnapshotIndexSelector = createSelector([historyStateSelector], (history) => history.currentSnapshotIndex)

export const historySnapshotsSelector = createSelector([historyStateSelector], (history) => history.snapshots)

export const canUndoSelector = createSelector(
  [historyCurrentSnapshotIndexSelector],
  (currentSnapshotIndex) => currentSnapshotIndex !== 0 && currentSnapshotIndex !== null
)

export const canRedoSelector = createSelector(
  [historyCurrentSnapshotIndexSelector, historySnapshotsSelector],
  (currentSnapshotIndex, snapshots) => currentSnapshotIndex !== snapshots.length - 1 && currentSnapshotIndex !== null
)
