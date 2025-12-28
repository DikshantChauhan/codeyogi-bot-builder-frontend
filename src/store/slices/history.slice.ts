import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Flow } from '../../models/Flow.model'

interface HistoryState {
  snapshots: Flow[]
  currentSnapshotIndex: number | null
}

const initialState: HistoryState = {
  snapshots: [],
  currentSnapshotIndex: null,
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    push: (state, { payload }: PayloadAction<Flow>) => {
      const isClearRedo = state.currentSnapshotIndex !== null && state.currentSnapshotIndex !== state.snapshots.length - 1
      if (isClearRedo) {
        state.snapshots = state.snapshots.slice(0, state.currentSnapshotIndex! + 1)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.snapshots.push(payload as any)
      state.currentSnapshotIndex = state.snapshots.length - 1
    },

    replaceLast: (state, { payload }: PayloadAction<Flow>) => {
      const isClearRedo = state.currentSnapshotIndex !== null && state.currentSnapshotIndex !== state.snapshots.length - 1
      if (isClearRedo) {
        state.snapshots = state.snapshots.slice(0, state.currentSnapshotIndex! + 1)
      }

      state.snapshots.pop()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.snapshots.push(payload as any)
      state.currentSnapshotIndex = state.snapshots.length - 1
    },

    undo: (state) => {
      if (state.currentSnapshotIndex === 0 || state.currentSnapshotIndex === null) return

      state.currentSnapshotIndex--
    },

    redo: (state) => {
      if (state.currentSnapshotIndex === state.snapshots.length - 1 || state.currentSnapshotIndex === null) return

      state.currentSnapshotIndex++
    },
  },
})

export const historyActions = historySlice.actions
export default historySlice
