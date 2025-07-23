import { AppState } from '../store'

export const campaignsSelector = (state: AppState) => state.campaign

export const flowsSelector = (state: AppState) => state.flow

export const uiSelector = (state: AppState) => state.ui

export const historyStateSelector = (state: AppState) => state.history
