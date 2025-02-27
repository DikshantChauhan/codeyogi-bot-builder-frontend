import SortableList, { SortableItem } from 'react-easy-sort'
import arrayMove from 'array-move'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_LEVEL_FLOW } from '../constants'

interface Props {
  campaignId: string
  levelsIds: string[]
  setLevelsIds: React.Dispatch<React.SetStateAction<string[]>>
}

const ReorderableCampaignLevelsList = ({ campaignId, levelsIds, setLevelsIds }: Props) => {
  const navigate = useNavigate()

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setLevelsIds((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
      {levelsIds.map((levelId, index) => (
        <SortableItem key={levelId}>
          <button
            className="p-6 my-2 bg-white rounded-xl shadow-sm hover:bg-gray-200 flex items-center justify-between w-full"
            onClick={() => navigate(ROUTE_LEVEL_FLOW(campaignId, levelId))}
          >
            <div className="flex-1 flex flex-col items-start">
              <h3 className="text-xl font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                Level {index + 1}
              </h3>
              <p className="text-gray-500 text-sm mt-1">ID: {levelId}</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
              <span className="text-2xl font-semibold text-indigo-600">{index + 1}</span>
            </div>
          </button>
        </SortableItem>
      ))}
    </SortableList>
  )
}

export default memo(ReorderableCampaignLevelsList)
