import { memo, useState } from 'react'
import { WhatsappDocumentNodeData, WhatsappDocumentNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'

interface Props {
  node?: WhatsappDocumentNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    id: data?.id || '',
    url: data?.url || '',
  })

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappDocumentNodeData> = (value) => {
    if (!value.id && !value.url) {
      throw new Error('Either Document ID or URL is required')
    }
    return value
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <NodeFormContainer initialValues={formData} transFormNodeDataOrFail={transFormNodeDataOrFail}>
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
    </NodeFormContainer>
  )
}

export default memo(Form)
