import { memo, useState } from 'react'
import { WhatsappLinkButtonNodeData, WhatsappLinkButtonNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'

interface Props {
  node?: WhatsappLinkButtonNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    text: data?.text || '',
    label: data?.label || '',
    url: data?.url || '',
  })

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappLinkButtonNodeData> = (value) => {
    if (!value.text || !value.label || !value.url) {
      throw new Error('All fields are required')
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

  return (
    <NodeFormContainer initialValues={formData} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Enter button description text"
            className="w-full rounded-md border px-3 py-2 min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Button Label</label>
          <input
            name="label"
            value={formData.label}
            onChange={handleInputChange}
            placeholder="Enter button label"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">URL</label>
          <input
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="Enter button URL"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
