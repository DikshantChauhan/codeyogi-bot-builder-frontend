import { memo, FC, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { FiPlus } from 'react-icons/fi'
import { AppState } from '../store/store'
import {
  campaignAddErrorSelector,
  campaignAddLoadingSelector,
  campaignsListFetchErrorSelector,
  campaignsListFetchingSelector,
  normalizedCampaignsListSelector,
} from '../store/selectors/campaign.selector'
import { NormalizedCampaign } from '../models/Campaign.model'
import { ActionButton } from '../components/ActionButton'
import Loading from '../components/Loading'
import Error from '../components/Error'
import CampaignAddOrUpdatePopup, { CampaignAddOrUpdateFormData } from '../components/CampaignAddOrUpdatePopup'
import { campaignActions } from '../store/slices/campaign.slice'
import CampaignCard from '../components/CampaignCard'
import FlowAddPopup from '../components/FlowAddPopup'

interface CampaignsListPageProps {
  normalizedCampaigns: NormalizedCampaign[]
  campaignsListFetching: boolean
  campaignsListFetchError: string | null
  campaignAddTry: typeof campaignActions.campaignAddTry
  campaignAddLoading: boolean
  campaignAddError: string | null
}

const CampaignsListPage: FC<CampaignsListPageProps> = ({
  campaignsListFetchError,
  campaignsListFetching,
  normalizedCampaigns,
  campaignAddTry,
  campaignAddLoading,
  campaignAddError,
}) => {
  const [isCampaignAddPopupOpen, setIsCampaignAddPopupOpen] = useState(false)
  const [isNudgeAddPopupOpen, setIsNudgeAddPopupOpen] = useState(false)

  const handleCreateCampaign = useCallback(
    (values: CampaignAddOrUpdateFormData) => {
      campaignAddTry(values)
    },
    [campaignAddTry]
  )

  const handleCloseCampaignAddPopup = useCallback(() => {
    setIsCampaignAddPopupOpen(false)
  }, [])

  return (
    <main className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Campaigns List</h1>
        {campaignsListFetching && <Loading message="Loading campaigns..." />}
        {campaignsListFetchError && <Error message={campaignsListFetchError} />}
        <div className="flex flex-col sm:flex-row gap-4">
          <ActionButton icon={FiPlus} onClick={() => setIsNudgeAddPopupOpen(true)}>
            Add New Nudge
          </ActionButton>
          <ActionButton icon={FiPlus} onClick={() => setIsCampaignAddPopupOpen(true)}>
            Add New Campaign
          </ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {normalizedCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {isCampaignAddPopupOpen && (
        <CampaignAddOrUpdatePopup
          isOpen={isCampaignAddPopupOpen}
          onClose={handleCloseCampaignAddPopup}
          onSubmit={handleCreateCampaign}
          loading={campaignAddLoading}
          error={campaignAddError}
        />
      )}

      {isNudgeAddPopupOpen && <FlowAddPopup isOpen={isNudgeAddPopupOpen} onClose={() => setIsNudgeAddPopupOpen(false)} type="nudge" />}
    </main>
  )
}

const mapStateToProps = (state: AppState) => ({
  normalizedCampaigns: normalizedCampaignsListSelector(state),
  campaignsListFetching: campaignsListFetchingSelector(state),
  campaignsListFetchError: campaignsListFetchErrorSelector(state),
  campaignAddLoading: campaignAddLoadingSelector(state),
  campaignAddError: campaignAddErrorSelector(state),
})

const mapDispatchToProps = {
  campaignAddTry: campaignActions.campaignAddTry,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(CampaignsListPage))
