import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NormalizedCampaign } from '../../models/Campaign.model'
import { CampaignCreatePayload, CampaignUpdatePayload } from '../../api/api'

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
  campaignDeleteLoading: boolean
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
  campaignDeleteLoading: false,
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
    campaignAddTry: (_, __: PayloadAction<CampaignCreatePayload>) => undefined,
    campaignAddLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.campaignAddLoading = payload
    },
    campaignAddError: (state, { payload }: PayloadAction<string | null>) => {
      state.campaignAddError = payload
    },

    // Update Campaign
    campaignUpdateTry: (_, __: PayloadAction<{ id: string; campaign: CampaignUpdatePayload }>) => undefined,
    campaignUpdateLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.campaignUpdateLoading = payload
    },
    campaignUpdateError: (state, { payload }: PayloadAction<string | null>) => {
      state.campaignUpdateError = payload
    },

    // Delete Campaign
    campaignDeleteTry: (_, __: PayloadAction<string>) => undefined,
    campaignDeleteLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.campaignDeleteLoading = payload
    },
    removeCampaign: (state, { payload }: PayloadAction<string>) => {
      const campaignId = payload
      delete state.campaignsById[campaignId]
      delete state.campaignsLoading[campaignId]
      delete state.campaignsError[campaignId]
      if (state.selectedCampaignId === campaignId) {
        state.selectedCampaignId = null
      }
    },
  },
})
export const campaignActions = campaignSlice.actions
export default campaignSlice
