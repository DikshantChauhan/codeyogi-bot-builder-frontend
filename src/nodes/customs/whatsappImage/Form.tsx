import { memo, useState } from 'react'
import { WhatsappImageNodeData, WhatsappImageNodeType } from './type'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'

interface Props {
  node?: WhatsappImageNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    id: data?.id || '',
    link: data?.link || '',
    caption: data?.caption || '',
  })

  const handleTransformNode: TransFormToNode<WhatsappImageNodeData> = (value) => {
    if (!value.id && !value.link) {
      return 'Either Image ID or URL is required'
    }
    return {
      data: value,
      id: node?.id || getRandomId(),
      type: 'whatsapp-image',
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
    <NodeFormContiner data={formData} transformToNode={handleTransformNode} title="WhatsApp Image" updating={!!node}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Image ID (recommended)</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp image ID"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="text-center text-sm text-gray-500">OR</div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL</label>
          <input
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp image URL"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Caption (optional)</label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            placeholder="Enter image caption"
            className="w-full rounded-md border px-3 py-2 min-h-[80px]"
          />
        </div>
      </div>
    </NodeFormContiner>
  )
}

export default memo(Form)
