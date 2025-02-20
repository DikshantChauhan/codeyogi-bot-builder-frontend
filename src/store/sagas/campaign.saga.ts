import { call, put, takeLatest } from 'redux-saga/effects'
import { campaignActions } from '../slices/campaign.slice'
import { PathMatch } from 'react-router-dom'
import { createCampaignAPI, fetchCampaignAPI, fetchCampaignslistAPI, updateCampaignAPI } from '../../api/api'
import { ROUTE_CAMPAIGN_DETAILS } from '../../constants'
import { NormalizedCampaign } from '../../models/Campaign.model'
import { toast } from 'react-toastify'

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

function* createCampaignSaga(action: ReturnType<typeof campaignActions.campaignAddTry>): Generator {
  try {
    yield put(campaignActions.campaignAddError(null))
    yield put(campaignActions.campaignAddLoading(true))

    const response: NormalizedCampaign = yield call(createCampaignAPI, action.payload)
    yield put(campaignActions.setCampaign({ campaign: response }))

    toast.success('Campaign created successfully')
  } catch (error) {
    console.error(error)
    yield put(campaignActions.campaignAddError(String(error)))
  } finally {
    yield put(campaignActions.campaignAddLoading(false))
  }
}

export function* fetchCampaignSaga(match: PathMatch<typeof ROUTE_CAMPAIGN_DETAILS.dynamicKey>): Generator {
  const campaignId = match.params.campaign_id!
  try {
    yield put(campaignActions.setSelectedCampaignId(campaignId))
    yield put(campaignActions.setCampaignLoading({ campaignId, loading: true }))
    const response: Awaited<ReturnType<typeof fetchCampaignAPI>> = yield call(fetchCampaignAPI, campaignId)

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

    const response: NormalizedCampaign = yield call(updateCampaignAPI, payload.id, payload.campaign)
    yield put(campaignActions.setCampaign({ campaign: response }))

    toast.success('Campaign updated successfully')
  } catch (error) {
    console.error(error)
    yield put(campaignActions.campaignUpdateError(String(error)))
  } finally {
    yield put(campaignActions.campaignUpdateLoading(false))
  }
}

export function* watchCampaignSaga(): Generator {
  yield takeLatest(campaignActions.campaignAddTry.type, createCampaignSaga)
  yield takeLatest(campaignActions.campaignUpdateTry.type, updateCampaignSaga)
}
