import { memo, useState } from 'react'
import { WhatsappVideoNodeData, WhatsappVideoNodeType } from './type'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'

interface Props {
  node?: WhatsappVideoNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    id: data?.id || '',
    url: data?.url || '',
    caption: data?.caption || '',
  })

  const handleTransformNode: TransFormToNode<WhatsappVideoNodeData> = (value) => {
    if (!value.id && !value.url) {
      return 'Either Video ID or URL is required'
    }
    return {
      data: value,
      id: node?.id || getRandomId(),
      type: 'whatsapp-video',
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <NodeFormContiner data={formData} transformToNode={handleTransformNode} title="WhatsApp Video" updating={!!node}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Video ID (recommended)</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp video ID"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="text-center text-sm text-gray-500">OR</div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Video URL</label>
          <input
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp video URL"
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
    </NodeFormContiner>
  )
}

export default memo(Form)
