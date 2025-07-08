import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Flow } from '../../models/Flow.model'

interface HistoryState {
  past: Flow[]
  present: Flow | null
  future: Flow[]
  maxHistorySize: number
}

const initialState: HistoryState = {
  past: [],
  present: null,
  future: [],
  maxHistorySize: 50,
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    pushToHistory: (state, action: PayloadAction<Flow>) => {
      // Add current state to past if it exists
      if (state.present) {
        state.past.push(state.present)

        // Limit history size
        if (state.past.length > state.maxHistorySize) {
          state.past = state.past.slice(-state.maxHistorySize)
        }
      }

      // Update present state
      state.present = action.payload as any

      // Clear future when new operation is pushed
      state.future = []
    },

    replaceLastHistoryEntry: (state, action: PayloadAction<Flow>) => {
      // Replace the last entry in past with the new flow
      if (state.past.length > 0) {
        // Remove the last entry and add the new one
        state.past.pop()
        state.past.push(action.payload as any)
      }

      // Update present state
      state.present = action.payload as any

      // Clear future when new operation is pushed
      state.future = []
    },

    undo: (state) => {
      if (state.past.length === 0) return

      const previous = state.past[state.past.length - 1]
      const newPast = state.past.slice(0, state.past.length - 1)

      state.past = newPast
      state.present = previous
      state.future = state.present ? [state.present, ...state.future] : state.future
    },

    redo: (state) => {
      if (state.future.length === 0) return

      const next = state.future[0]
      const newFuture = state.future.slice(1)

      state.past = state.present ? [...state.past, state.present] : state.past
      state.present = next
      state.future = newFuture
    },
  },
})

export const historyActions = historySlice.actions
export default historySlice
