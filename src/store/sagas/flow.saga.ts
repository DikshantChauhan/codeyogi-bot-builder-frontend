import { Flow } from '../../models/Flow.model'
import { campaignActions } from '../slices/campaign.slice'
import { flowActions } from '../slices/flow.slice'
import { put, call, all, takeLatest } from 'redux-saga/effects'
import { PathMatch } from 'react-router-dom'
import { ROUTE_CAMPAIGN_DETAILS, ROUTE_LEVEL_FLOW, ROUTE_NUDGE_FLOW } from '../../constants'
import { fetchCampaignAPI, fetchFlowAPI, fetchNudgeFlowsListAPI, createFlowAPI, updateFlowAPI, deleteFlowAPI } from '../../api/api'
import { toast } from 'react-toastify'
import { shouldUpdateFlow } from '../../utils'
import { NormalizedCampaign } from '../../models/Campaign.model'

export function* fetchLevelFlowSaga(
  match: Pick<PathMatch<typeof ROUTE_LEVEL_FLOW.dynamicKey | typeof ROUTE_CAMPAIGN_DETAILS.dynamicKey>, 'params'>
): Generator {
  const flowId = match.params.flow_id!
  const campaignId = match.params.campaign_id!
  try {
    yield put(campaignActions.setSelectedCampaignId(campaignId))
    yield put(flowActions.setSelectedFlowId(flowId))
    yield put(flowActions.setFlowLoading({ flowId, loading: true }))

    const [campaign, flow] = (yield all([call(fetchCampaignAPI, campaignId), call(fetchFlowAPI, flowId)])) as [NormalizedCampaign, Flow]

    yield put(campaignActions.setCampaign({ campaign, error: null, loading: false }))
    if (shouldUpdateFlow(flow)) {
      yield put(flowActions.setFlow({ flow, error: null, loading: false }))
    }
  } catch (error) {
    yield put(flowActions.setFlowError({ flowId, error: String(error) }))
  } finally {
    yield put(flowActions.setFlowLoading({ flowId, loading: false }))
  }
}

export function* fetchNudgeFlowsListSaga(): Generator {
  try {
    yield put(flowActions.setNudgeFlowsLoading(true))
    yield put(flowActions.setNudgeFlowsError(null))
    const response = (yield call(fetchNudgeFlowsListAPI)) as Flow[]
    for (const flow of response) {
      if (shouldUpdateFlow(flow)) {
        yield put(flowActions.setFlow({ flow, error: null, loading: false }))
      }
    }
    yield put(flowActions.setNudgeFlowsIds(response.map((flow) => flow.id)))
  } catch (error) {
    yield put(flowActions.setNudgeFlowsError(String(error)))
  } finally {
    yield put(flowActions.setNudgeFlowsLoading(false))
  }
}

export function* levelFlowPageSaga(match: PathMatch<typeof ROUTE_LEVEL_FLOW.dynamicKey | typeof ROUTE_CAMPAIGN_DETAILS.dynamicKey>): Generator {
  yield call(fetchLevelFlowSaga, match)
  yield call(fetchNudgeFlowsListSaga)
}

function* flowAddSaga({ payload }: ReturnType<typeof flowActions.flowAddTry>): Generator {
  try {
    yield put(flowActions.setFlowAddLoading(true))
    yield put(flowActions.setFlowAddError(null))

    const { flow, campaign } = (yield call(createFlowAPI, payload)) as { flow: Flow; campaign: NormalizedCampaign }
    if (shouldUpdateFlow(flow)) {
      yield put(flowActions.setFlow({ flow, error: null, loading: false }))
    }
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

    const flow = (yield call(updateFlowAPI, payload)) as Flow
    if (shouldUpdateFlow(flow)) {
      yield put(flowActions.setFlow({ flow, error: null, loading: false }))
    }
  } catch (error) {
    console.error(error)
    yield put(flowActions.setFlowUpdateError(String(error)))
  } finally {
    yield put(flowActions.setFlowUpdateLoading(false))
  }
}

export function* fetchNudgeFlowSaga(match: PathMatch<typeof ROUTE_NUDGE_FLOW.dynamicKey>): Generator {
  const nudgeId = match.params.nudge_id!
  try {
    yield put(flowActions.setSelectedFlowId(nudgeId))
    yield put(flowActions.setFlowLoading({ flowId: nudgeId, loading: true }))

    const flow = (yield call(fetchFlowAPI, nudgeId)) as Flow
    if (shouldUpdateFlow(flow)) {
      yield put(flowActions.setFlow({ flow, error: null, loading: false }))
    }
  } catch (error) {
    yield put(flowActions.setFlowError({ flowId: nudgeId, error: String(error) }))
  } finally {
    yield put(flowActions.setFlowLoading({ flowId: nudgeId, loading: false }))
  }
}

function* deleteFlowSaga({ payload }: ReturnType<typeof flowActions.flowDeleteTry>): Generator {
  try {
    yield put(flowActions.setFlowDeleteLoading({ flowId: payload.flowId, loading: true }))

    const normalizedCampaign = (yield call(deleteFlowAPI, payload.campaignId, payload.flowId)) as NormalizedCampaign

    yield put(campaignActions.setCampaign({ campaign: normalizedCampaign, error: null, loading: false }))
    yield put(flowActions.removeFlow(payload.flowId))

    toast.success('Flow deleted successfully')
  } catch (error) {
    console.error(error)
    toast.error('Flow deletion failed')
  } finally {
    yield put(flowActions.setFlowDeleteLoading({ flowId: payload.flowId, loading: false }))
  }
}

export function* watchFlowAddSaga(): Generator {
  yield takeLatest(flowActions.flowAddTry.type, flowAddSaga)
  yield takeLatest(flowActions.flowUpdateTry.type, flowUpdateSaga)
  yield takeLatest(flowActions.flowDeleteTry.type, deleteFlowSaga)
}
