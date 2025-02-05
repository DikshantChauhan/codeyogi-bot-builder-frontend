import { memo, useState } from 'react'
import { WhatsappVideoNodeData, WhatsappVideoNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'

interface Props {
  node?: WhatsappVideoNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    media: data?.media || '',
    mediaType: data?.mediaType || 'id',
    caption: data?.caption || '',
  })

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappVideoNodeData> = (value) => {
    if (!value.media) {
      throw new Error('Video media is required')
    }
    return value
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      mediaType: e.target.value as 'id' | 'link',
    }))
  }

  return (
    <NodeFormContainer initialValues={formData} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Media Type</label>
          <select name="mediaType" value={formData.mediaType} onChange={handleMediaTypeChange} className="w-full rounded-md border px-3 py-2">
            <option value="id">Video ID</option>
            <option value="link">Video URL</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{formData.mediaType === 'id' ? 'Video ID' : 'Video URL'}</label>
          <input
            name="media"
            value={formData.media}
            onChange={handleInputChange}
            placeholder={formData.mediaType === 'id' ? 'Enter WhatsApp video ID' : 'Enter WhatsApp video URL'}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Caption (optional)</label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            placeholder="Enter video caption"
            className="w-full rounded-md border px-3 py-2 min-h-[80px]"
          />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
