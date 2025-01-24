import { memo, useState } from 'react'
import { WhatsappDocumentNodeData, WhatsappDocumentNodeType } from './type'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'

interface Props {
  node?: WhatsappDocumentNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    id: data?.id || '',
    url: data?.url || '',
  })

  const handleTransformNode: TransFormToNode<WhatsappDocumentNodeData> = (value) => {
    if (!value.id && !value.url) {
      return 'Either Document ID or URL is required'
    }
    return {
      data: value,
      id: node?.id || getRandomId(),
      type: 'whatsapp-document',
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
    <NodeFormContiner data={formData} transformToNode={handleTransformNode} title="WhatsApp Document" updating={!!node}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Document ID (recommended)</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp document ID"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="text-center text-sm text-gray-500">OR</div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Document URL</label>
          <input
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="Enter WhatsApp document URL"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
    </NodeFormContiner>
  )
}

export default memo(Form)
