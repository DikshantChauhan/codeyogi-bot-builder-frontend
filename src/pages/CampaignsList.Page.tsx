import { memo, FC } from 'react'
import { connect } from 'react-redux'
import { FiPlus } from 'react-icons/fi'
import { AppState } from '../store/store'
import { campaignsListFetchErrorSelector, campaignsListFetchingSelector, normalizedCampaignsListSelector } from '../store/selectors/campaign.selector'
import { NormalizedCampaign } from '../models/Campaign.model'
import { CampaignCard } from '../components/CampaignCard'
import { ActionButton } from '../components/ActionButton'

interface CampaignsListPageProps {
  normalizedCampaigns: NormalizedCampaign[]
  campaignsListFetching: boolean
  campaignsListFetchError: string | null
}

const LoadingState = () => (
  <div className="p-8 flex items-center justify-center">
    <div className="animate-pulse text-gray-600">Loading campaigns...</div>
  </div>
)

const ErrorState: FC<{ error: string }> = ({ error }) => (
  <div className="p-8 text-center">
    <div className="text-red-600 mb-2">Failed to load campaigns</div>
    <div className="text-gray-600">{error}</div>
  </div>
)

const CampaignsListPage: FC<CampaignsListPageProps> = ({ campaignsListFetchError, campaignsListFetching, normalizedCampaigns }) => {
  const handleCreateNudge = () => {
    console.log('create nudge')
  }

  const handleCreateCampaign = () => {
    console.log('create campaign')
  }

  const handleCampaignEdit = (campaignId: string) => {
    console.log('campaign selected', campaignId)
  }

  if (campaignsListFetching) {
    return <LoadingState />
  }

  if (campaignsListFetchError) {
    return <ErrorState error={campaignsListFetchError} />
  }

  return (
    <main className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Campaigns List</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <ActionButton icon={FiPlus} onClick={handleCreateNudge}>
            Add New Nudge
          </ActionButton>
          <ActionButton icon={FiPlus} onClick={handleCreateCampaign}>
            Add New Campaign
          </ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {normalizedCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} onEdit={handleCampaignEdit} />
        ))}
      </div>
    </main>
  )
}

const mapStateToProps = (state: AppState) => ({
  normalizedCampaigns: normalizedCampaignsListSelector(state),
  campaignsListFetching: campaignsListFetchingSelector(state),
  campaignsListFetchError: campaignsListFetchErrorSelector(state),
})

export default memo(connect(mapStateToProps)(CampaignsListPage))
