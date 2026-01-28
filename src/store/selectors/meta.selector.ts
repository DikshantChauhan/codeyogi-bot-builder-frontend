import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '../store'

const selectSelf = (state: AppState) => state.meta

export const selectMetaList = createSelector(selectSelf, (state) => state.metaList)
export const selectMetaLoading = createSelector(selectSelf, (state) => state.metaLoading)
export const selectMetaError = createSelector(selectSelf, (state) => state.metaError)

export const selectMetaSaveLoading = createSelector(selectSelf, (state) => state.metaSaveLoading)
export const selectMetaSaveError = createSelector(selectSelf, (state) => state.metaSaveError)

export const selectMetaDeleteLoading = createSelector(selectSelf, (state) => state.metaDeleteLoading)
