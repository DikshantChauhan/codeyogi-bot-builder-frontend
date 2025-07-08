import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppNodeKeys } from '../../models/Node.model'

type UiState = {
  selectedNodeRef: { type: AppNodeKeys } | { id: string } | null
  contextMenuPosition: { x: number; y: number; flowX?: number; flowY?: number } | null
  isContextMenuOpen: boolean
}

const initialState: UiState = {
  selectedNodeRef: null,
  contextMenuPosition: null,
  isContextMenuOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedNode: (state, action: PayloadAction<UiState['selectedNodeRef']>) => {
      state.selectedNodeRef = action.payload
    },
    setContextMenuPosition: (state, action: PayloadAction<{ x: number; y: number; flowX?: number; flowY?: number } | null>) => {
      state.contextMenuPosition = action.payload
    },
    setIsContextMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isContextMenuOpen = action.payload
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
