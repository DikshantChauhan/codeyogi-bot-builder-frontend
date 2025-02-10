import { FC } from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'
import { ROUTE_CAMPAIGN_DETAILS } from '../constants'
import { NormalizedCampaign } from '../models/Campaign.model'

interface CampaignCardProps {
  campaign: NormalizedCampaign
  onEdit: (id: string) => void
}

export const CampaignCard: FC<CampaignCardProps> = ({ campaign, onEdit }) => (
  <article className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
    <div className="flex gap-2">
      <Link
        to={ROUTE_CAMPAIGN_DETAILS(campaign.id)}
        className="flex-1 block p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200"
      >
        <h3 className="font-medium text-gray-900 mb-2 break-words">{campaign.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiCalendar className="h-4 w-4 flex-shrink-0" />
          <time dateTime={campaign.createdAt}>{new Date(campaign.createdAt).toLocaleDateString()}</time>
        </div>
      </Link>
      <button
        onClick={() => onEdit(campaign.id)}
        className="px-3 py-2 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200"
      >
        Edit
      </button>
    </div>
  </article>
) 