import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NormalizedCampaign } from '../../models/Campaign.model'

interface CampaignState {
  campaignsById: { [id: string]: NormalizedCampaign }
  campaignsLoading: { [campaignId: string]: boolean }
  campaignsError: { [campaignId: string]: string | null }
  selectedCampaignId: string | null
  campaignsListFetching: boolean
  campaignsListFetchError: string | null
}

const initialState: CampaignState = {
  campaignsById: {},
  campaignsLoading: {},
  campaignsError: {},
  selectedCampaignId: null,
  campaignsListFetching: false,
  campaignsListFetchError: null,
}

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setSelectedCampaignId: (state, action: PayloadAction<string>) => {
      state.selectedCampaignId = action.payload
    },
    setCampaign: (state, action: PayloadAction<{ campaign: NormalizedCampaign; loading?: boolean; error?: string | null }>) => {
      const { campaign, loading, error } = action.payload
      const campaignId = campaign.id
      state.campaignsById[campaignId] = campaign
      state.campaignsLoading[campaignId] = loading ?? state.campaignsLoading[campaignId]
      state.campaignsError[campaignId] = error ?? state.campaignsError[campaignId]
    },
    setCampaignLoading: (state, action: PayloadAction<{ campaignId: string; loading: boolean }>) => {
      const { campaignId, loading } = action.payload
      state.campaignsLoading[campaignId] = loading
    },
    setCampaignError: (state, action: PayloadAction<{ campaignId: string; error: string | null }>) => {
      const { campaignId, error } = action.payload
      state.campaignsError[campaignId] = error
    },
    setCampaignsListFetching: (state, action: PayloadAction<boolean>) => {
      state.campaignsListFetching = action.payload
    },
    setCampaignsListFetchError: (state, action: PayloadAction<string | null>) => {
      state.campaignsListFetchError = action.payload
    },
  },
})
export const campaignActions = campaignSlice.actions
export default campaignSlice
