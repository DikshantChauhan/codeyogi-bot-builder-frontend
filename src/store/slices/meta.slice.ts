import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Meta } from '../../models/Meta.model'
import { createMetaAPI, deleteMetaAPI, updateMetaAPI } from '../../api/api'

interface MetaState {
  metaList: Meta[]
  metaLoading: boolean
  metaError: string | null

  metaSaveLoading: boolean
  metaSaveError: string | null

  metaDeleteLoading: { [id: string]: boolean }
}

const initialState: MetaState = {
  metaList: [],
  metaLoading: false,
  metaError: null,

  metaSaveLoading: false,
  metaSaveError: null,

  metaDeleteLoading: {},
}

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setMetaList: (state, action: PayloadAction<Meta[]>) => {
      state.metaList = action.payload
    },
    addMeta: (state, action: PayloadAction<Meta>) => {
      state.metaList.push(action.payload)
    },
    updateMeta: (state, action: PayloadAction<Meta>) => {
      const index = state.metaList.findIndex((meta) => meta.id === action.payload.id)
      if (index !== -1) {
        state.metaList[index] = action.payload
      }
    },
    removeMeta: (state, action: PayloadAction<string>) => {
      state.metaList = state.metaList.filter((meta) => meta.id !== action.payload)
    },

    setMetaLoading: (state, action: PayloadAction<boolean>) => {
      state.metaLoading = action.payload
    },
    setMetaError: (state, action: PayloadAction<string | null>) => {
      state.metaError = action.payload
    },

    setMetaSaveLoading: (state, action: PayloadAction<boolean>) => {
      state.metaSaveLoading = action.payload
    },
    setMetaSaveError: (state, action: PayloadAction<string | null>) => {
      state.metaSaveError = action.payload
    },

    setMetaDeleteLoading: (state, action: PayloadAction<{ id: string; loading: boolean }>) => {
      const { id, loading } = action.payload
      state.metaDeleteLoading[id] = loading
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchMetaTry: (_) => undefined,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createMetaTry: (_, __: PayloadAction<Parameters<typeof createMetaAPI>[0]>) => undefined,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateMetaTry: (_, __: PayloadAction<{ id: string } & Parameters<typeof updateMetaAPI>[1]>) => undefined,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteMetaTry: (_, __: PayloadAction<Parameters<typeof deleteMetaAPI>[0]>) => undefined,
  },
})

export const metaActions = metaSlice.actions
export default metaSlice
