import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import MediaUpload from './MediaUpload'
import { selectedNormalizedCampaignSelector } from '../store/selectors/campaign.selector'
import { AppState } from '../store/store'
import Button from './Button'
import { FiCopy, FiEdit3 } from 'react-icons/fi'
import { WhatsAppMediaUploadResponse, WhatsAppMediaUploadType } from '../api/api'
import { toast } from 'react-toastify'

interface MediaUploadFieldProps {
  mediaType: WhatsAppMediaUploadType
  mediaId: string
  mediaUrl: string
  onMediaChange: (mediaId: string, mediaUrl: string) => void
  className?: string
}

const MediaUploadField: React.FC<MediaUploadFieldProps> = ({ mediaType, mediaId, mediaUrl, onMediaChange, className = '' }) => {
  const [showMediaUpload, setShowMediaUpload] = useState(false)
  const selectedCampaign = useSelector((state: AppState) => selectedNormalizedCampaignSelector(state))

  const hasExistingMedia = mediaId && mediaUrl

  const handleUploadSuccess = useCallback(
    (response: WhatsAppMediaUploadResponse) => {
      onMediaChange(response.whatsapp_media_id, response.s3_url)
      setShowMediaUpload(false)
    },
    [onMediaChange]
  )

  const handleUploadError = useCallback((error: string) => {
    console.error('Media upload error:', error)
  }, [])

  const handleEditMedia = useCallback(() => {
    setShowMediaUpload(true)
  }, [])

  const handleCancelEdit = useCallback(() => {
    setShowMediaUpload(false)
  }, [])

  const getMediaTypeLabel = () => {
    switch (mediaType) {
      case 'image':
        return 'Image'
      case 'video':
        return 'Video'
      case 'document':
        return 'Document'
      default:
        return 'Media'
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Media Upload Section */}
      {!hasExistingMedia || showMediaUpload ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Upload {getMediaTypeLabel()} Media</label>
            {hasExistingMedia && (
              <Button type="button" variant="tertiary" onClick={handleCancelEdit} className="text-xs px-2 py-1">
                Cancel
              </Button>
            )}
          </div>

          {selectedCampaign ? (
            <MediaUpload
              campaignId={selectedCampaign.id}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              acceptedTypes={[mediaType]}
              maxFileSize={16 * 1024 * 1024} // 16MB
              className="border border-gray-200 rounded-lg p-3"
            />
          ) : (
            <div className="text-center py-4 text-gray-500 border border-gray-200 rounded-lg">
              <p>Please select a campaign to upload media.</p>
            </div>
          )}
        </div>
      ) : (
        /* Existing Media Display */
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Current {getMediaTypeLabel()} Media</label>
            <Button type="button" variant="tertiary" onClick={handleEditMedia} className="text-xs px-2 py-1 flex items-center gap-1">
              <FiEdit3 className="h-3 w-3" />
              Edit
            </Button>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg space-y-2">
            <div>
              <label className="text-xs font-medium text-gray-600">{getMediaTypeLabel()} ID</label>
              <p className="text-sm text-gray-900 mt-1 break-all">{mediaId || 'Not set'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">{getMediaTypeLabel()} URL</label>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-900 mt-1 break-all max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {mediaUrl || 'Not set'}
                </p>
                {/* Copy to clipboard */}
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={() => {
                    navigator.clipboard.writeText(mediaUrl)
                    toast.success('Media URL copied to clipboard')
                  }}
                  className="text-xs px-2 py-1 flex items-center gap-1"
                >
                  <FiCopy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaUploadField
