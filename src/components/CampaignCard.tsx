import { FC, memo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'
import { ROUTE_CAMPAIGN_DETAILS } from '../constants'
import { NormalizedCampaign } from '../models/Campaign.model'
import { campaignActions } from '../store/slices/campaign.slice'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { campaignUpdateLoadingSelector, campaignUpdateErrorSelector } from '../store/selectors/campaign.selector'
import CampaignAddOrUpdatePopup, { CampaignAddOrUpdateFormData } from './CampaignAddOrUpdatePopup'

interface CampaignCardProps {
  campaign: NormalizedCampaign
  campaignUpdateTry: typeof campaignActions.campaignUpdateTry
  campaignUpdateLoading: boolean
  campaignUpdateError: string | null
}

const CampaignCard: FC<CampaignCardProps> = ({ campaign, campaignUpdateTry, campaignUpdateLoading, campaignUpdateError }) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)

  const handleCloseEditPopup = useCallback(() => {
    setIsEditPopupOpen(false)
  }, [])

  const handleUpdateCampaign = useCallback(
    (data: CampaignAddOrUpdateFormData) => {
      campaignUpdateTry({ id: campaign.id, campaign: data })
    },
    [campaignUpdateTry, campaign]
  )

  return (
    <article className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex gap-2">
        <Link
          to={ROUTE_CAMPAIGN_DETAILS(campaign.id)}
          className="flex-1 block p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200"
        >
          <h3 className="font-medium text-gray-900 mb-2 break-words">{campaign.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiCalendar className="h-4 w-4 flex-shrink-0" />
            <time dateTime={campaign.created}>{new Date(campaign.created).toLocaleDateString()}</time>
          </div>
        </Link>
        <button
          onClick={() => setIsEditPopupOpen(true)}
          className="px-3 py-2 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200"
        >
          Edit
        </button>
      </div>

      {isEditPopupOpen && (
        <CampaignAddOrUpdatePopup
          isOpen={isEditPopupOpen}
          onClose={handleCloseEditPopup}
          onSubmit={handleUpdateCampaign}
          loading={campaignUpdateLoading}
          error={campaignUpdateError}
          initialData={campaign}
        />
      )}
    </article>
  )
}

const mapDispatchToProps = {
  campaignUpdateTry: campaignActions.campaignUpdateTry,
}

const mapStateToProps = (state: AppState) => ({
  campaignUpdateLoading: campaignUpdateLoadingSelector(state),
  campaignUpdateError: campaignUpdateErrorSelector(state),
})

export default memo(connect(mapStateToProps, mapDispatchToProps)(CampaignCard))
