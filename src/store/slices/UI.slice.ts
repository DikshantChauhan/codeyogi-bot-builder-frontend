import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppNodeKeys } from '../../models/Node.model'

type UiState = {
  nodeToAdd: AppNodeKeys | null
  selectedNodeId: string | null
}

const initialState: UiState = {
  nodeToAdd: null,
  selectedNodeId: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setNodeToAdd: (state, action: PayloadAction<AppNodeKeys | null>) => {
      state.nodeToAdd = action.payload
    },
    setSelectedNodeId: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
