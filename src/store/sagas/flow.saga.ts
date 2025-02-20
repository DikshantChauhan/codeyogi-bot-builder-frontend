import { Flow } from '../../models/Flow.model'
import { campaignActions } from '../slices/campaign.slice'
import { flowActions } from '../slices/flow.slice'
import { put, call, all, takeLatest } from 'redux-saga/effects'
import { PathMatch } from 'react-router-dom'
import { ROUTE_CAMPAIGN_DETAILS, ROUTE_FLOW } from '../../constants'
import { fetchCampaignAPI, fetchFlowAPI, fetchNudgeFlowsListAPI, createFlowAPI, updateFlowAPI } from '../../api/api'
import { toast } from 'react-toastify'

function* fetchFlowSaga(match: PathMatch<typeof ROUTE_FLOW.dynamicKey | typeof ROUTE_CAMPAIGN_DETAILS.dynamicKey>): Generator {
  const flowId = match.params.flow_id!
  const campaignId = match.params.campaign_id!
  try {
    yield put(campaignActions.setSelectedCampaignId(campaignId))
    yield put(flowActions.setSelectedFlowId(flowId))
    yield put(flowActions.setFlowLoading({ flowId, loading: true }))

    const [campaign, flow]: [Awaited<ReturnType<typeof fetchCampaignAPI>>, Awaited<ReturnType<typeof fetchFlowAPI>>] = yield all([
      call(fetchCampaignAPI, campaignId),
      call(fetchFlowAPI, flowId),
    ])

    yield put(campaignActions.setCampaign({ campaign, error: null, loading: false }))
    yield put(flowActions.setFlow({ flow, error: null, loading: false }))
  } catch (error) {
    yield put(flowActions.setFlowError({ flowId, error: String(error) }))
  } finally {
    yield put(flowActions.setFlowLoading({ flowId, loading: false }))
  }
}

function* fetchNudgeFlowsListSaga(): Generator {
  const response: Flow[] = yield call(fetchNudgeFlowsListAPI)
  for (const flow of response) {
    yield put(flowActions.setFlow({ flow, error: null, loading: false }))
  }
  yield put(flowActions.setNudgeFlowsIds(response.map((flow) => flow.id)))
}

export function* flowPageSaga(match: PathMatch<typeof ROUTE_FLOW.dynamicKey | typeof ROUTE_CAMPAIGN_DETAILS.dynamicKey>): Generator {
  yield call(fetchFlowSaga, match)
  yield call(fetchNudgeFlowsListSaga)
}

function* flowAddSaga({ payload }: ReturnType<typeof flowActions.flowAddTry>): Generator {
  try {
    yield put(flowActions.setFlowAddLoading(true))
    yield put(flowActions.setFlowAddError(null))

    const { flow, campaign }: Awaited<ReturnType<typeof createFlowAPI>> = yield call(createFlowAPI, payload)
    yield put(flowActions.setFlow({ flow, error: null, loading: false }))
    if (campaign) {
      yield put(campaignActions.setCampaign({ campaign, error: null, loading: false }))
    }

    toast.success('Flow created successfully')
  } catch (error) {
    yield put(flowActions.setFlowAddError(String(error)))
  } finally {
    yield put(flowActions.setFlowAddLoading(false))
  }
}

function* flowUpdateSaga({ payload }: ReturnType<typeof flowActions.flowUpdateTry>): Generator {
  try {
    yield put(flowActions.setFlowUpdateLoading(true))
    yield put(flowActions.setFlowUpdateError(null))

    const flow: Awaited<ReturnType<typeof updateFlowAPI>> = yield call(updateFlowAPI, payload)
    yield put(flowActions.setFlow({ flow, error: null, loading: false }))
  } catch (error) {
    console.error(error)
    yield put(flowActions.setFlowUpdateError(String(error)))
  } finally {
    yield put(flowActions.setFlowUpdateLoading(false))
  }
}

export function* watchFlowAddSaga(): Generator {
  yield takeLatest(flowActions.flowAddTry.type, flowAddSaga)
  yield takeLatest(flowActions.flowUpdateTry.type, flowUpdateSaga)
}
