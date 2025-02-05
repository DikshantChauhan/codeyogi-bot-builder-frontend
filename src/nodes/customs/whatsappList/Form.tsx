import { memo, useState } from 'react'
import { WhatsappListNodeData, WhatsappListNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'

interface Props {
  node?: WhatsappListNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    text: data?.text || '',
    buttons: data?.buttons || [''],
    footer: data?.footer || '',
    header: data?.header || '',
    buttonLabel: data?.buttonLabel || '',
  })

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappListNodeData> = (value) => {
    if (!value.text || !value.buttons.length || !value.buttonLabel) {
      throw new Error('Text, button label and at least one button are required')
    }
    if (value.buttons.some((button) => !button.trim())) {
      throw new Error('All buttons must have text')
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

  const handleButtonChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      buttons: prev.buttons.map((btn, idx) => (idx === index ? value : btn)),
    }))
  }

  const addButton = () => {
    setFormData((prev) => ({
      ...prev,
      buttons: [...prev.buttons, ''],
    }))
  }

  const removeButton = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((_, idx) => idx !== index),
    }))
  }

  return (
    <NodeFormContainer initialValues={formData} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Header (Optional)</label>
          <input
            name="header"
            value={formData.header}
            onChange={handleInputChange}
            placeholder="Enter list header"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Enter list text"
            className="w-full rounded-md border px-3 py-2 min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Button Label</label>
          <input
            name="buttonLabel"
            value={formData.buttonLabel}
            onChange={handleInputChange}
            placeholder="Enter button label"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Footer (Optional)</label>
          <input
            name="footer"
            value={formData.footer}
            onChange={handleInputChange}
            placeholder="Enter footer text"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Buttons</label>
            <button type="button" onClick={addButton} className="text-sm text-blue-500 hover:text-blue-600">
              + Add Button
            </button>
          </div>
          {formData.buttons.map((button, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                value={button}
                onChange={(e) => handleButtonChange(index, e.target.value)}
                placeholder="Button text"
                className="flex-1 rounded-md border px-3 py-2"
              />
              <button type="button" onClick={() => removeButton(index)} className="text-red-500 hover:text-red-600">
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
