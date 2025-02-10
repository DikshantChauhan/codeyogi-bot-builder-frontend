import { call, put } from 'redux-saga/effects'
import { campaignActions } from '../slices/campaign.slice'
import { PathMatch } from 'react-router-dom'
import { fetchCampaignDetailsAPI, fetchCampaignslistAPI, fetchFlowAPI, fetchNudgeFlowsListAPI } from '../../api/campaign.api'
import { ROUTE_CAMPAIGN_DETAILS, ROUTE_FLOW } from '../../constants'
import { Campaign, NormalizedCampaign } from '../../models/Campaign.model'
import { flowActions } from '../slices/flow.slice'
import { Flow } from '../../models/Flow.model'

export function* fetchCampaignsListSaga(_: PathMatch<string>): Generator {
  try {
    yield put(campaignActions.setCampaignsListFetching(true))
    const response: NormalizedCampaign[] = yield call(fetchCampaignslistAPI)

    for (const campaign of response) {
      yield put(campaignActions.setCampaign({ campaign, error: null, loading: false }))
    }
  } catch (error) {
    console.error(error)
    yield put(campaignActions.setCampaignsListFetchError(String(error)))
  } finally {
    yield put(campaignActions.setCampaignsListFetching(false))
  }
}

export function* fetchCampaignDetailSaga(match: PathMatch<typeof ROUTE_CAMPAIGN_DETAILS.dynamicKey>): Generator {
  const campaignId = match.params.campaign_id!
  try {
    yield put(campaignActions.setSelectedCampaignId(campaignId))
    yield put(campaignActions.setCampaignLoading({ campaignId, loading: true }))
    const response: Campaign = yield call(fetchCampaignDetailsAPI, campaignId)
    const { levels, ...campaignData } = response

    for (const flow of levels) {
      yield put(flowActions.setFlow({ flow, error: null, loading: false }))
    }

    const normalizedCampaign: NormalizedCampaign = {
      ...campaignData,
      levels: levels.map((flow) => flow.id),
    }

    yield put(
      campaignActions.setCampaign({
        campaign: normalizedCampaign,
        error: null,
        loading: false,
      })
    )
  } catch (error) {
    yield put(campaignActions.setCampaignError({ campaignId, error: String(error) }))
  } finally {
    yield put(campaignActions.setCampaignLoading({ campaignId, loading: false }))
  }
}

function* fetchFlowSaga(match: PathMatch<typeof ROUTE_FLOW.dynamicKey | typeof ROUTE_CAMPAIGN_DETAILS.dynamicKey>): Generator {
  const flowId = match.params.flow_id!
  const campaignId = match.params.campaign_id!
  try {
    yield put(campaignActions.setSelectedCampaignId(campaignId))
    yield put(flowActions.setSelectedFlowId(flowId))
    yield put(flowActions.setFlowLoading({ flowId, loading: true }))

    const { flow, campaign }: Awaited<ReturnType<typeof fetchFlowAPI>> = yield call(fetchFlowAPI, flowId)

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
