import { PayloadAction } from '@reduxjs/toolkit'
import { locationActions } from '../slices/location.slice'
import { takeLatest } from 'redux-saga/effects'
import { Location } from 'react-router-dom'
import { fetchCampaignsListSaga, fetchCampaignSaga } from './campaign.saga'
import { ROUTE_CAMPAIGNS_LIST, ROUTE_CAMPAIGN_DETAILS, ROUTE_LEVEL_FLOW, ROUTE_NUDGES_LIST, ROUTE_NUDGE_FLOW } from '../../constants'
import { matchPath } from 'react-router-dom'
import { fetchNudgeFlowSaga, fetchNudgeFlowsListSaga, levelFlowPageSaga } from './flow.saga'

const sagasByPath = {
  [ROUTE_CAMPAIGNS_LIST]: fetchCampaignsListSaga,
  [ROUTE_CAMPAIGN_DETAILS()]: fetchCampaignSaga,
  [ROUTE_LEVEL_FLOW()]: levelFlowPageSaga,
  [ROUTE_NUDGES_LIST]: fetchNudgeFlowsListSaga,
  [ROUTE_NUDGE_FLOW()]: fetchNudgeFlowSaga,
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
