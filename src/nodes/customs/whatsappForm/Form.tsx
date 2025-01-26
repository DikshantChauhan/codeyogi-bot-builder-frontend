import { memo, useState } from 'react'
import { FormField, WhatsappFormNodeData, WhatsappFormNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'

interface Props {
  node?: WhatsappFormNodeType
}

const FIELD_TYPES = ['text', 'number', 'email', 'phone', 'date'] as const

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    title: data?.title || '',
    description: data?.description || '',
    fields: data?.fields || [{ label: '', type: 'text', required: false }],
  })

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappFormNodeData> = (value) => {
    if (!value.title || !value.description || value.fields.length === 0) {
      throw new Error('Title, description and at least one field are required')
    }
    if (value.fields.some((field) => !field.label)) {
      throw new Error('All fields must have a label')
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

  const handleFieldChange = (index: number, field: Partial<FormField>) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((f, i) => (i === index ? { ...f, ...field } : f)),
    }))
  }

  const addField = () => {
    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, { label: '', type: 'text', required: false }],
    }))
  }

  const removeField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }))
  }

  return (
    <NodeFormContainer initialValues={formData} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Form Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter form title"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter form description"
            className="w-full rounded-md border px-3 py-2 min-h-[80px]"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Form Fields</label>
            <button type="button" onClick={addField} className="text-sm text-blue-500 hover:text-blue-600">
              + Add Field
            </button>
          </div>
          {formData.fields.map((field, index) => (
            <div key={index} className="space-y-2 p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <input
                  value={field.label}
                  onChange={(e) => handleFieldChange(index, { label: e.target.value })}
                  placeholder="Field label"
                  className="w-full rounded-md border px-3 py-2"
                />
                <button type="button" onClick={() => removeField(index)} className="ml-2 text-red-500 hover:text-red-600">
                  ×
                </button>
              </div>
              <div className="flex gap-4">
                <select
                  value={field.type}
                  onChange={(e) => handleFieldChange(index, { type: e.target.value as FormField['type'] })}
                  className="rounded-md border px-3 py-2"
                >
                  {FIELD_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => handleFieldChange(index, { required: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Required</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
