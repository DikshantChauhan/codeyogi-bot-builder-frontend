import { PayloadAction } from '@reduxjs/toolkit'
import { locationActions } from '../slices/location.slice'
import { takeLatest } from 'redux-saga/effects'
import { Location } from 'react-router-dom'
import { fetchCampaignDetailSaga, fetchCampaignsListSaga, flowPageSaga } from './campaign.saga'
import { ROUTE_CAMPAIGNS_LIST, ROUTE_CAMPAIGN_DETAILS, ROUTE_FLOW } from '../../constants'
import { matchPath } from 'react-router-dom'

const sagasByPath = {
  [ROUTE_CAMPAIGNS_LIST]: fetchCampaignsListSaga,
  [ROUTE_CAMPAIGN_DETAILS()]: fetchCampaignDetailSaga,
  [ROUTE_FLOW()]: flowPageSaga,
}

function* handleLocationChange(action: PayloadAction<Location>) {
  for (const path in sagasByPath) {
    const match = matchPath(path, action.payload.pathname)

    if (match) {
      yield sagasByPath[path](match)
    }
  }
}

export function* watchLocationSaga() {
  yield takeLatest(locationActions.changeLocation.type, handleLocationChange)
}
