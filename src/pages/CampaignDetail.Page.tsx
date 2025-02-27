import { memo, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { FiPlus } from 'react-icons/fi'
import { AppState } from '../store/store'
import {
  selectedNormalizedCampaignSelector,
  selectedCampaignFetchingSelector,
  selectedCampaignFetchErrorSelector,
  campaignUpdateLoadingSelector,
  campaignUpdateErrorSelector,
} from '../store/selectors/campaign.selector'
import { NormalizedCampaign } from '../models/Campaign.model'
import Loading from '../components/Loading'
import Error from '../components/Error'
import FlowAddPopup from '../components/FlowAddPopup'
import Button from '../components/Button'
import ReorderableCampaignLevelsList from '../components/ReorderableCampaignLevelsList'
import { campaignActions } from '../store/slices/campaign.slice'

interface CampaignDetailPageProps {
  selectedNormalizedCampaign: NormalizedCampaign | null
  selectedCampaignFetching: boolean
  selectedCampaignFetchError: string | null
  campaignUpdateTry: typeof campaignActions.campaignUpdateTry
  campaignUpdateLoading: boolean
}

const CampaignDetailPage = ({
  selectedNormalizedCampaign,
  selectedCampaignFetching,
  selectedCampaignFetchError,
  campaignUpdateTry,
  campaignUpdateLoading,
}: CampaignDetailPageProps) => {
  const [isFlowAddPopupOpen, setIsFlowAddPopupOpen] = useState(false)
  const [levelsIds, setLevelsIds] = useState(selectedNormalizedCampaign?.levels || [])

  useEffect(() => {
    if (selectedNormalizedCampaign) {
      setLevelsIds(selectedNormalizedCampaign.levels)
    }
  }, [selectedNormalizedCampaign])

  const isLevelsOrderChanged = useMemo(() => {
    if (!selectedNormalizedCampaign) return false
    return JSON.stringify(levelsIds) !== JSON.stringify(selectedNormalizedCampaign.levels)
  }, [levelsIds, selectedNormalizedCampaign?.levels])

  const handleAddLevel = () => {
    setIsFlowAddPopupOpen(true)
  }

  const handleSaveLevelsOrder = () => {
    selectedNormalizedCampaign &&
      campaignUpdateTry({
        id: selectedNormalizedCampaign.id,
        campaign: {
          levels: levelsIds,
        },
      })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-500">{selectedNormalizedCampaign?.name}</h1>
          {selectedCampaignFetching && <Loading />}
        </div>
        <div className="flex items-center gap-4">
          {isLevelsOrderChanged && (
            <Button onClick={handleSaveLevelsOrder} Icon={FiPlus} loading={campaignUpdateLoading}>
              Save Levels Order
            </Button>
          )}
          <Button onClick={handleAddLevel} Icon={FiPlus}>
            Add Level
          </Button>
        </div>
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
          <ReorderableCampaignLevelsList campaignId={selectedNormalizedCampaign.id} levelsIds={levelsIds} setLevelsIds={setLevelsIds} />
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
  campaignUpdateLoading: campaignUpdateLoadingSelector(state),
})

const mapDispatchToProps = {
  campaignUpdateTry: campaignActions.campaignUpdateTry,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(CampaignDetailPage))
