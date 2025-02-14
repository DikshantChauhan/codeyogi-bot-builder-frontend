import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NormalizedCampaign } from '../../models/Campaign.model'
import { CampaignAddOrUpdateFormData } from '../../components/CampaignAddOrUpdatePopup'

interface CampaignState {
  campaignsById: { [id: string]: NormalizedCampaign }
  campaignsLoading: { [campaignId: string]: boolean }
  campaignsError: { [campaignId: string]: string | null }
  selectedCampaignId: string | null
  campaignsListFetching: boolean
  campaignsListFetchError: string | null
  campaignAddLoading: boolean
  campaignAddError: string | null
  campaignUpdateLoading: boolean
  campaignUpdateError: string | null
}

const initialState: CampaignState = {
  campaignsById: {},
  campaignsLoading: {},
  campaignsError: {},
  selectedCampaignId: null,
  campaignsListFetching: true,
  campaignsListFetchError: null,
  campaignAddLoading: false,
  campaignAddError: null,
  campaignUpdateLoading: false,
  campaignUpdateError: null,
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

    // Add Campaign
    campaignAddTry: (_, __: PayloadAction<CampaignAddOrUpdateFormData>) => undefined,
    campaignAddLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.campaignAddLoading = payload
    },
    campaignAddError: (state, { payload }: PayloadAction<string | null>) => {
      state.campaignAddError = payload
    },

    // Update Campaign
    campaignUpdateTry: (_, __: PayloadAction<{ id: string; campaign: CampaignAddOrUpdateFormData }>) => undefined,
    campaignUpdateLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.campaignUpdateLoading = payload
    },
    campaignUpdateError: (state, { payload }: PayloadAction<string | null>) => {
      state.campaignUpdateError = payload
    },
  },
})
export const campaignActions = campaignSlice.actions
export default campaignSlice
