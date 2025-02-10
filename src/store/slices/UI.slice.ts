import { createSlice } from '@reduxjs/toolkit'
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
    setNodeToAdd: (state, action) => {
      state.nodeToAdd = action.payload
    },
    setSelectedNodeId: (state, action) => {
      state.selectedNodeId = action.payload
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
