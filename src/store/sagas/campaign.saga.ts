import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { campaignActions } from '../slices/campaign.slice'
import { PathMatch } from 'react-router-dom'
import { createCampaignAPI, deleteCampaignAPI, fetchCampaignAPI, fetchCampaignslistAPI, fetchFlowAPI, updateCampaignAPI } from '../../api/api'
import { ROUTE_CAMPAIGN_DETAILS } from '../../constants'
import { NormalizedCampaign } from '../../models/Campaign.model'
import { toast } from 'react-toastify'
import { selectedNormalizedCampaignSelector } from '../selectors/campaign.selector'
import { fetchLevelFlowSaga } from './flow.saga'

export function* fetchCampaignsListSaga(_: PathMatch<string>): Generator {
  try {
    yield put(campaignActions.setCampaignsListFetching(true))
    const response = (yield call(fetchCampaignslistAPI)) as NormalizedCampaign[]

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

function* createCampaignSaga(action: ReturnType<typeof campaignActions.campaignAddTry>): Generator {
  try {
    yield put(campaignActions.campaignAddError(null))
    yield put(campaignActions.campaignAddLoading(true))

    const response = (yield call(createCampaignAPI, action.payload)) as NormalizedCampaign
    yield put(campaignActions.setCampaign({ campaign: response }))

    toast.success('Campaign created successfully')
  } catch (error) {
    console.error(error)
    yield put(campaignActions.campaignAddError(String(error)))
  } finally {
    yield put(campaignActions.campaignAddLoading(false))
  }
}

function* fetchCampaignSaga(match: PathMatch<typeof ROUTE_CAMPAIGN_DETAILS.dynamicKey>): Generator {
  const campaignId = match.params.campaign_id!
  try {
    yield put(campaignActions.setSelectedCampaignId(campaignId))
    yield put(campaignActions.setCampaignLoading({ campaignId, loading: true }))
    const response = (yield call(fetchCampaignAPI, campaignId)) as NormalizedCampaign

    yield put(
      campaignActions.setCampaign({
        campaign: response,
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

function* updateCampaignSaga({ payload }: ReturnType<typeof campaignActions.campaignUpdateTry>): Generator {
  try {
    yield put(campaignActions.campaignUpdateLoading(true))
    yield put(campaignActions.campaignUpdateError(null))

    const response = (yield call(updateCampaignAPI, payload.id, payload.campaign)) as NormalizedCampaign
    yield put(campaignActions.setCampaign({ campaign: response }))

    toast.success('Campaign updated successfully')
  } catch (error) {
    console.error(error)
    yield put(campaignActions.campaignUpdateError(String(error)))
  } finally {
    yield put(campaignActions.campaignUpdateLoading(false))
  }
}

export function* fetchCampaignDetailsSaga(match: PathMatch<typeof ROUTE_CAMPAIGN_DETAILS.dynamicKey>): Generator {
  try {
    yield call(fetchCampaignSaga, match)

    const campaign = (yield select(selectedNormalizedCampaignSelector)) as NormalizedCampaign

    yield all(campaign.levels.map((level) => call(fetchLevelFlowSaga, { params: { campaign_id: campaign.id, flow_id: level } })))
  } catch (error) {
    console.error('Error fetching campaign details:', error)
  }
}

function* deleteCampaignSaga({ payload }: ReturnType<typeof campaignActions.campaignDeleteTry>): Generator {
  try {
    yield put(campaignActions.campaignDeleteLoading(true))

    yield call(deleteCampaignAPI, payload)

    yield put(campaignActions.removeCampaign(payload))
    toast.success('Campaign deleted successfully')
  } catch (error) {
    console.error(error)
    toast.error('Campaign deletion failed')
  } finally {
    yield put(campaignActions.campaignDeleteLoading(false))
  }
}

export function* watchCampaignSaga(): Generator {
  yield takeLatest(campaignActions.campaignAddTry.type, createCampaignSaga)
  yield takeLatest(campaignActions.campaignUpdateTry.type, updateCampaignSaga)
  yield takeLatest(campaignActions.campaignDeleteTry.type, deleteCampaignSaga)
}
