import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppNodeKeys } from '../../models/Node.model'

type UiState = {
  pannelClickedPosition: { x: number; y: number } | null
  nodeToAdd: AppNodeKeys | null
  isToolbarSidePannelExpanded: boolean
  isShortcutMenuOpen: boolean
  isMediaUploadPopupOpen: boolean
}

const initialState: UiState = {
  pannelClickedPosition: null,
  nodeToAdd: null,
  isToolbarSidePannelExpanded: true,
  isShortcutMenuOpen: false,
  isMediaUploadPopupOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPannelClickedPosition: (state, action: PayloadAction<{ x: number; y: number } | null>) => {
      state.pannelClickedPosition = action.payload
    },
    setNodeToAdd: (state, action: PayloadAction<AppNodeKeys | null>) => {
      state.nodeToAdd = action.payload
    },
    setIsToolbarSidePannelExpanded: (state, action: PayloadAction<boolean>) => {
      state.isToolbarSidePannelExpanded = action.payload
    },
    setIsShortcutMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isShortcutMenuOpen = action.payload
    },
    setIsMediaUploadPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isMediaUploadPopupOpen = action.payload
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
