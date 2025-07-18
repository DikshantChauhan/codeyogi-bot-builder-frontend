import { FC, memo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { ROUTE_CAMPAIGN_DETAILS } from '../constants'
import { NormalizedCampaign } from '../models/Campaign.model'
import { campaignActions } from '../store/slices/campaign.slice'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { campaignUpdateLoadingSelector, campaignUpdateErrorSelector, campaignDeleteLoadingSelector } from '../store/selectors/campaign.selector'
import CampaignAddOrUpdatePopup, { CampaignAddOrUpdateFormData } from './CampaignAddOrUpdatePopup'
import ConfirmationPopup from './ConfirmationPopup'
import { FaBook } from 'react-icons/fa'
import Loading from './Loading'

interface CampaignCardProps {
  campaign: NormalizedCampaign
  campaignUpdateTry: typeof campaignActions.campaignUpdateTry
  campaignUpdateLoading: boolean
  campaignUpdateError: string | null
  campaignDeleteLoading: boolean
  campaignDeleteTry: typeof campaignActions.campaignDeleteTry
}

const CampaignCard: FC<CampaignCardProps> = ({
  campaign,
  campaignUpdateTry,
  campaignUpdateLoading,
  campaignUpdateError,
  campaignDeleteLoading,
  campaignDeleteTry,
}) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)

  const handleCloseEditPopup = useCallback(() => {
    setIsEditPopupOpen(false)
  }, [])

  const handleCloseDeletePopup = useCallback(() => {
    setIsDeletePopupOpen(false)
  }, [])

  const handleUpdateCampaign = useCallback(
    (data: CampaignAddOrUpdateFormData) => {
      campaignUpdateTry({ id: campaign.id, campaign: data })
    },
    [campaignUpdateTry, campaign]
  )

  const handleDeleteClick = useCallback(() => {
    setIsDeletePopupOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    campaignDeleteTry(campaign.id)
    setIsDeletePopupOpen(false)
  }, [campaignDeleteTry, campaign.id])

  return (
    <>
      <article className="group bg-gradient-to-br from-white to-gray-50/90 backdrop-blur-sm rounded-lg border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between p-3">
          <Link
            to={ROUTE_CAMPAIGN_DETAILS(campaign.id)}
            className="flex-1 text-gray-700 group-hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
          >
            <FaBook className="h-4 w-4" />
            <h3 className="font-medium truncate">{campaign.name}</h3>
          </Link>
          <button
            onClick={() => setIsEditPopupOpen(true)}
            className="ml-3 p-2 text-gray-400 hover:text-blue-500 rounded-md hover:bg-blue-50/50 transition-all duration-200"
          >
            <span className="sr-only">Edit campaign</span>
            <FiEdit2 className="h-4 w-4" />
          </button>
          {campaignDeleteLoading ? (
            <Loading size="sm" />
          ) : (
            <button
              onClick={handleDeleteClick}
              className="ml-2 p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50/50 transition-all duration-200"
            >
              <span className="sr-only">Delete campaign</span>
              <FiTrash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </article>
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
      <ConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={handleCloseDeletePopup}
        onConfirm={handleDeleteConfirm}
        title="Delete Campaign"
        message={`Are you sure you want to delete "${campaign.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonVariant="danger"
        loading={campaignDeleteLoading}
      />
    </>
  )
}

const mapDispatchToProps = {
  campaignUpdateTry: campaignActions.campaignUpdateTry,
  campaignDeleteTry: campaignActions.campaignDeleteTry,
}

const mapStateToProps = (state: AppState) => ({
  campaignUpdateLoading: campaignUpdateLoadingSelector(state),
  campaignUpdateError: campaignUpdateErrorSelector(state),
  campaignDeleteLoading: campaignDeleteLoadingSelector(state),
})

export default memo(connect(mapStateToProps, mapDispatchToProps)(CampaignCard))
