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
import { ROUTE_LEVEL_FLOW } from '../constants'
import FlowAddPopup from '../components/FlowAddPopup'
import Button from '../components/Button'

interface CampaignDetailPageProps {
  selectedNormalizedCampaign: NormalizedCampaign | null
  selectedCampaignFetching: boolean
  selectedCampaignFetchError: string | null
}

const CampaignDetailPage = ({ selectedNormalizedCampaign, selectedCampaignFetching, selectedCampaignFetchError }: CampaignDetailPageProps) => {
  const [isFlowAddPopupOpen, setIsFlowAddPopupOpen] = useState(false)

  const handleAddLevel = () => {
    setIsFlowAddPopupOpen(true)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-500">{selectedNormalizedCampaign?.name}</h1>
          {selectedCampaignFetching && <Loading />}
        </div>
        <Button onClick={handleAddLevel} Icon={FiPlus}>
          Add Level
        </Button>
      </div>

      <div className="grid gap-6">
        {selectedCampaignFetchError ? (
          <Error message={selectedCampaignFetchError} />
        ) : !selectedNormalizedCampaign ? (
          selectedCampaignFetching ? (
            <div className="text-center py-12 text-gray-500">
              <div className="animate-pulse">Fetching campaign...</div>
            </div>
          ) : (
            <Error message="Campaign not found" />
          )
        ) : selectedNormalizedCampaign.levels.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 mb-4">No levels found in this campaign</p>
            <button onClick={handleAddLevel} className="text-indigo-600 hover:text-indigo-700 font-medium">
              + Create your first level
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedNormalizedCampaign.levels.map((levelId, index) => (
              <Link
                to={ROUTE_LEVEL_FLOW(selectedNormalizedCampaign.id, levelId)}
                key={levelId}
                className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-indigo-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">Level {index + 1}</h3>
                    <p className="text-gray-500 text-sm mt-1">ID: {levelId}</p>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                    <span className="text-2xl font-semibold text-indigo-600">{index + 1}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {selectedNormalizedCampaign && (
          <FlowAddPopup
            isOpen={isFlowAddPopupOpen}
            onClose={() => setIsFlowAddPopupOpen(false)}
            type="level"
            campaignRef={{ id: selectedNormalizedCampaign.id }}
          />
        )}
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
