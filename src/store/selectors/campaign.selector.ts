import { createSelector } from '@reduxjs/toolkit'
import { campaignsSelector } from './app.selector'

const normalizedCampaignsByIdsSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignsById)

export const campaignsListFetchingSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignsListFetching)

export const campaignsListFetchErrorSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignsListFetchError)

const selectedCampaignIdSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.selectedCampaignId)

const campaignsLoadingByIdSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignsLoading)

const campaignsErrorByIdSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignsError)

export const selectedNormalizedCampaignSelector = createSelector(
  [normalizedCampaignsByIdsSelector, selectedCampaignIdSelector],
  (campaignsByIds, selectedCampaignId) => (selectedCampaignId ? campaignsByIds[selectedCampaignId] : null)
)

export const normalizedCampaignsListSelector = createSelector([normalizedCampaignsByIdsSelector], (campaignsByIds) => Object.values(campaignsByIds))

export const selectedCampaignFetchingSelector = createSelector(
  [selectedCampaignIdSelector, campaignsLoadingByIdSelector],
  (selectedCampaignId, campaignsLoading) => (selectedCampaignId ? campaignsLoading[selectedCampaignId] : true)
)

export const selectedCampaignFetchErrorSelector = createSelector(
  [selectedCampaignIdSelector, campaignsErrorByIdSelector],
  (selectedCampaignId, campaignsError) => (selectedCampaignId ? campaignsError[selectedCampaignId] : null)
)

export const campaignAddLoadingSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignAddLoading)

export const campaignAddErrorSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignAddError)

export const campaignUpdateLoadingSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignUpdateLoading)

export const campaignUpdateErrorSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignUpdateError)

export const campaignDeleteLoadingSelector = createSelector([campaignsSelector], (campaignsState) => campaignsState.campaignDeleteLoading)
