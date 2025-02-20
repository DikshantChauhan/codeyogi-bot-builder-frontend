import { memo, FC, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { FiEye, FiPlus } from 'react-icons/fi'
import { AppState } from '../store/store'
import {
  campaignAddErrorSelector,
  campaignAddLoadingSelector,
  campaignsListFetchErrorSelector,
  campaignsListFetchingSelector,
  normalizedCampaignsListSelector,
} from '../store/selectors/campaign.selector'
import { NormalizedCampaign } from '../models/Campaign.model'
import Loading from '../components/Loading'
import Error from '../components/Error'
import CampaignAddOrUpdatePopup, { CampaignAddOrUpdateFormData } from '../components/CampaignAddOrUpdatePopup'
import { campaignActions } from '../store/slices/campaign.slice'
import CampaignCard from '../components/CampaignCard'
import FlowAddPopup from '../components/FlowAddPopup'
import { useNavigate } from 'react-router-dom'
import { ROUTE_NUDGES_LIST } from '../constants'
import Button from '../components/Button'
import { AppNodeKeys } from '../models/Node.model'

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
  const navigate = useNavigate()

  const handleCreateCampaign = useCallback(
    (values: CampaignAddOrUpdateFormData) => {
      campaignAddTry({ ...values, levels: [] as string[], allowed_nodes: values.allowed_nodes as AppNodeKeys[] })
    },
    [campaignAddTry]
  )

  const handleCloseCampaignAddPopup = useCallback(() => {
    setIsCampaignAddPopupOpen(false)
  }, [])

  return (
    <main className="p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col space-y-6 mb-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-500">Campaigns</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button variant="secondary" Icon={FiEye} onClick={() => navigate(ROUTE_NUDGES_LIST)}>
              View Nudges
            </Button>
            <Button variant="primary" Icon={FiPlus} onClick={() => setIsNudgeAddPopupOpen(true)}>
              New Nudge
            </Button>
            <Button variant="primary" Icon={FiPlus} onClick={() => setIsCampaignAddPopupOpen(true)}>
              New Campaign
            </Button>
          </div>
        </div>

        {/* Status Messages */}
        {campaignsListFetching && (
          <div className="w-full">
            <Loading message="Loading campaigns..." />
          </div>
        )}
        {campaignsListFetchError && (
          <div className="w-full">
            <Error message={campaignsListFetchError} />
          </div>
        )}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {normalizedCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {/* Popups */}
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
