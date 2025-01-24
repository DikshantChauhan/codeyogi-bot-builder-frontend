import { memo, useState } from 'react'
import { WhatsappStickerNodeData, WhatsappStickerNodeType } from './type'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'

interface Props {
  node?: WhatsappStickerNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    id: data?.id || '',
    url: data?.url || '',
  })

  const handleTransformNode: TransFormToNode<WhatsappStickerNodeData> = (value) => {
    if (!value.id && !value.url) {
      return 'Either Sticker ID or URL is required'
    }
    return {
      data: value,
      id: node?.id || getRandomId(),
      type: 'whatsapp-sticker',
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <NodeFormContiner data={formData} transformToNode={handleTransformNode} title="WhatsApp Sticker" updating={!!node}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Sticker ID (recommended)</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp sticker ID"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="text-center text-sm text-gray-500">OR</div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Sticker URL</label>
          <input
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp sticker URL"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
    </NodeFormContiner>
  )
}

export default memo(Form)
