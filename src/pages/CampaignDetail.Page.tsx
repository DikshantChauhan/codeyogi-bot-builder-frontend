import { memo, useState } from 'react'
import { connect } from 'react-redux'
import { FiPlus } from 'react-icons/fi'
import { AppState } from '../store/store'
import {
  selectedNormalizedCampaignSelector,
  selectedCampaignFetchingSelector,
  selectedCampaignFetchErrorSelector,
} from '../store/selectors/campaign.selector'
import { NormalizedCampaign } from '../models/Campaign.model'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
import { ROUTE_FLOW } from '../constants'
import FlowAddPopup from '../components/FlowAddPopup'

interface CampaignDetailPageProps {
  selectedNormalizedCampaign: NormalizedCampaign | null
  selectedCampaignFetching: boolean
  selectedCampaignFetchError: string | null
}

const CampaignDetailPage = ({ selectedNormalizedCampaign, selectedCampaignFetching, selectedCampaignFetchError }: CampaignDetailPageProps) => {
  const [isFlowAddPopupOpen, setIsFlowAddPopupOpen] = useState(false)

  if (selectedCampaignFetching) {
    return <Loading />
  }

  if (selectedCampaignFetchError) {
    return <Error message={selectedCampaignFetchError} />
  }

  if (!selectedNormalizedCampaign) {
    return <Error message="Campaign not found" />
  }

  const handleAddLevel = () => {
    setIsFlowAddPopupOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{selectedNormalizedCampaign.name}</h1>
        <button
          onClick={handleAddLevel}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="text-lg" />
          Add Level
        </button>
      </div>

      <div className="grid gap-4">
        {selectedNormalizedCampaign.levels.map((levelId, index) => (
          <Link
            to={ROUTE_FLOW(selectedNormalizedCampaign.id, levelId)}
            key={levelId}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">Level {index + 1}</h3>
              <span className="text-gray-500 text-sm">ID: {levelId}</span>
            </div>
          </Link>
        ))}

        {selectedNormalizedCampaign.levels.length === 0 && (
          <div className="text-center py-8 text-gray-500">No levels found. Click the "Add Level" button to create one.</div>
        )}

        <FlowAddPopup
          isOpen={isFlowAddPopupOpen}
          onClose={() => setIsFlowAddPopupOpen(false)}
          type="level"
          campaignRef={{ id: selectedNormalizedCampaign.id }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  selectedNormalizedCampaign: selectedNormalizedCampaignSelector(state),
  selectedCampaignFetching: selectedCampaignFetchingSelector(state),
  selectedCampaignFetchError: selectedCampaignFetchErrorSelector(state),
})

export default memo(connect(mapStateToProps)(CampaignDetailPage))
