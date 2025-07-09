import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppNodeKeys } from '../../models/Node.model'

type UiState = {
  selectedNodeRef:
    | { type: AppNodeKeys }
    | { id: string }
    | {
        selection: {
          nodesIds: string[]
          edgesIds: string[]
        }
      }
    | null
  pannelClickedPosition: { x: number; y: number } | null
}

const initialState: UiState = {
  selectedNodeRef: null,
  pannelClickedPosition: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedNode: (state, action: PayloadAction<UiState['selectedNodeRef']>) => {
      state.selectedNodeRef = action.payload
    },
    setPannelClickedPosition: (state, action: PayloadAction<{ x: number; y: number } | null>) => {
      state.pannelClickedPosition = action.payload
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
