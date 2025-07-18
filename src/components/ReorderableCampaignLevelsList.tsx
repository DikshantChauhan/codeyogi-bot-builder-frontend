import SortableList, { SortableItem } from 'react-easy-sort'
import arrayMove from 'array-move'
import { memo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_LEVEL_FLOW } from '../constants'
import { AppState } from '../store/store'
import { flowDeleteLoadingSelector, flowsByIdsSelector } from '../store/selectors/flow.selector'
import { connect } from 'react-redux'
import { Flow } from '../models/Flow.model'
import { flowActions } from '../store/slices/flow.slice'
import { FiTrash2 } from 'react-icons/fi'
import ConfirmationPopup from './ConfirmationPopup'
import Loading from './Loading'

interface Props {
  campaignId: string
  levelsIds: string[]
  setLevelsIds: React.Dispatch<React.SetStateAction<string[]>>
  flowsByIds: Record<string, Flow>
  flowDeleteTry: typeof flowActions.flowDeleteTry
  flowDeleteLoading: ReturnType<typeof flowDeleteLoadingSelector>
}

const ReorderableCampaignLevelsList = ({ campaignId, levelsIds, setLevelsIds, flowsByIds, flowDeleteTry, flowDeleteLoading }: Props) => {
  const [deleteLevelId, setDeleteLevelId] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setLevelsIds((array) => arrayMove(array, oldIndex, newIndex))
  }

  const handleCloseDeletePopup = useCallback(() => {
    setDeleteLevelId(null)
  }, [])

  const handleDeleteClick = useCallback((levelId: string) => {
    setDeleteLevelId(levelId)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    if (deleteLevelId) {
      flowDeleteTry({ campaignId, flowId: deleteLevelId })
      setDeleteLevelId(null)
    }
  }, [flowDeleteTry, deleteLevelId, campaignId])

  return (
    <>
      <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
        {levelsIds.map((levelId, index) => (
          <SortableItem key={levelId}>
            <button
              className="p-6 my-2 bg-white rounded-xl shadow-sm hover:bg-gray-200 flex items-center justify-between w-full"
              onClick={() => navigate(ROUTE_LEVEL_FLOW(campaignId, levelId))}
            >
              <div className="flex-1 flex flex-col items-start">
                <h3 className="text-xl font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">Level {index + 1}</h3>
                <p className="text-gray-500 text-sm mt-1">{flowsByIds[levelId]?.name}</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <span className="text-2xl font-semibold text-indigo-600">{index + 1}</span>
              </div>
              {flowDeleteLoading[levelId] ? (
                <Loading size="sm" />
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteClick(levelId)
                  }}
                  className="ml-2 p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50/50 transition-all duration-200"
                >
                  <span className="sr-only">Delete level</span>
                  <FiTrash2 className="h-4 w-4" />
                </button>
              )}
            </button>
          </SortableItem>
        ))}
      </SortableList>
      <ConfirmationPopup
        isOpen={!!deleteLevelId}
        onClose={handleCloseDeletePopup}
        onConfirm={handleDeleteConfirm}
        title="Delete Level"
        message={`Are you sure you want to delete "Level ${levelsIds.findIndex((id) => id === deleteLevelId) + 1}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonVariant="danger"
        loading={deleteLevelId ? flowDeleteLoading[deleteLevelId] : false}
      />
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  flowsByIds: flowsByIdsSelector(state),
  flowDeleteLoading: flowDeleteLoadingSelector(state),
})

const mapDispatchToProps = {
  flowDeleteTry: flowActions.flowDeleteTry,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(ReorderableCampaignLevelsList))
