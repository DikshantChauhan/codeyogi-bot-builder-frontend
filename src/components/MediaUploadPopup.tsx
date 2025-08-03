import React, { memo, useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { isMediaUploadPopupOpenSelector } from '../store/selectors/ui.selector'
import { selectedNormalizedCampaignSelector, normalizedCampaignsListSelector } from '../store/selectors/campaign.selector'
import { uiActions } from '../store/slices/UI.slice'
import Popup from './Popup'
import MediaUpload, { MediaUploadResponse } from './MediaUpload'
import { toast } from 'react-toastify'
import { NormalizedCampaign } from '../models/Campaign.model'

interface MediaUploadPopupProps {
  isMediaUploadPopupOpen: boolean
  setIsMediaUploadPopupOpen: typeof uiActions.setIsMediaUploadPopupOpen
  selectedCampaign: NormalizedCampaign | null
  allCampaigns: NormalizedCampaign[]
}

const MediaUploadPopup: React.FC<MediaUploadPopupProps> = ({ isMediaUploadPopupOpen, setIsMediaUploadPopupOpen, selectedCampaign, allCampaigns }) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(selectedCampaign?.id || '')

  const handleClose = useCallback(() => {
    setIsMediaUploadPopupOpen(false)
    setSelectedCampaignId(selectedCampaign?.id || '')
  }, [setIsMediaUploadPopupOpen, selectedCampaign?.id])

  const handleUploadSuccess = useCallback((response: MediaUploadResponse) => {
    toast.success(`Successfully uploaded ${response.filename}`)
    console.log('Media upload successful:', response)
  }, [])

  const handleUploadError = useCallback((error: string) => {
    toast.error(`Upload failed: ${error}`)
    console.error('Media upload error:', error)
  }, [])

  // Update selected campaign ID when selectedCampaign changes
  React.useEffect(() => {
    setSelectedCampaignId(selectedCampaign?.id || '')
  }, [selectedCampaign?.id])

  return (
    <Popup isOpen={isMediaUploadPopupOpen} onClose={handleClose} size="lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Upload Media</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
            ×
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Upload images, videos, or documents to use in your WhatsApp campaigns.</p>

          {/* Campaign Selection */}
          {selectedCampaign ? (
            <div className="mb-3">
              <p className="text-xs text-gray-500">Campaign: {selectedCampaign.name}</p>
              <p className="text-xs text-gray-500">Campaign ID: {selectedCampaignId}</p>
            </div>
          ) : (
            <div className="mb-3">
              <label htmlFor="campaign-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select Campaign
              </label>
              <select
                id="campaign-select"
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a campaign...</option>
                {allCampaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </select>
              {selectedCampaignId && <p className="text-xs text-gray-500 mt-1">Campaign ID: {selectedCampaignId}</p>}
            </div>
          )}
        </div>

        <MediaUpload
          campaignId={selectedCampaignId}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          acceptedTypes={['image', 'video', 'document']}
          maxFileSize={16 * 1024 * 1024} // 16MB
        />
      </div>
    </Popup>
  )
}

const mapStateToProps = (state: AppState) => ({
  isMediaUploadPopupOpen: isMediaUploadPopupOpenSelector(state),
  selectedCampaign: selectedNormalizedCampaignSelector(state),
  allCampaigns: normalizedCampaignsListSelector(state),
})

const mapDispatchToProps = {
  setIsMediaUploadPopupOpen: uiActions.setIsMediaUploadPopupOpen,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(MediaUploadPopup))
