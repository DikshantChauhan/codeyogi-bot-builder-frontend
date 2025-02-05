import { memo, useState } from 'react'
import { WhatsappButtonNodeData, WhatsappButtonNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'

interface Props {
  node?: WhatsappButtonNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    text: data?.text || '',
    buttons: data?.buttons || [''],
    footer: data?.footer || '',
    header: data?.header || { type: 'text' as const },
  })

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappButtonNodeData> = (value) => {
    if (!value.text || value.buttons.length === 0) {
      throw new Error('Text and at least one button are required')
    }
    if (value.buttons.some((button) => !button)) {
      throw new Error('All buttons must have text')
    }
    return value
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleHeaderChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        [name]: value,
      },
    }))
  }

  const handleButtonChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      buttons: prev.buttons.map((btn, i) => (i === index ? value : btn)),
    }))
  }

  const addButton = () => {
    if (formData.buttons.length < 3) {
      setFormData((prev) => ({
        ...prev,
        buttons: [...prev.buttons, ''],
      }))
    }
  }

  const removeButton = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index),
    }))
  }

  return (
    <NodeFormContainer initialValues={formData} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Header Type</label>
          <select name="type" value={formData.header.type} onChange={handleHeaderChange} className="w-full rounded-md border px-3 py-2">
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="document">Document</option>
          </select>

          {formData.header.type === 'text' && (
            <input
              name="text"
              value={formData.header.text || ''}
              onChange={handleHeaderChange}
              placeholder="Enter header text"
              className="w-full rounded-md border px-3 py-2"
            />
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Enter button message text"
            className="w-full rounded-md border px-3 py-2 min-h-[80px]"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Buttons (max 3)</label>
            {formData.buttons.length < 3 && (
              <button type="button" onClick={addButton} className="text-sm text-blue-500 hover:text-blue-600">
                + Add Button
              </button>
            )}
          </div>
          {formData.buttons.map((button, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={button}
                onChange={(e) => handleButtonChange(index, e.target.value)}
                placeholder="Enter button text"
                className="flex-1 rounded-md border px-3 py-2"
              />
              <button type="button" onClick={() => removeButton(index)} className="text-red-500 hover:text-red-600">
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Footer (optional)</label>
          <input
            name="footer"
            value={formData.footer}
            onChange={handleInputChange}
            placeholder="Enter footer text"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
