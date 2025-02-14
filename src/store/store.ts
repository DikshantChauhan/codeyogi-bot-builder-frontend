import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { useDispatch, useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'
import campaignSlice from './slices/campaign.slice'
import flowSlice from './slices/flow.slice'
import { all } from 'redux-saga/effects'
import locationSlice from './slices/location.slice'
import { watchLocationSaga } from './sagas/location.saga'
import uiSlice from './slices/UI.slice'
import { watchCampaignSaga } from './sagas/campaign.saga'
import { watchFlowAddSaga } from './sagas/flow.saga'

function* rootSaga() {
  yield all([watchLocationSaga(), watchCampaignSaga(), watchFlowAddSaga()])
}

const rootReducer = combineReducers({
  [locationSlice.name]: locationSlice.reducer,
  [campaignSlice.name]: campaignSlice.reducer,
  [flowSlice.name]: flowSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
