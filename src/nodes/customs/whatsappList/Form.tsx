import { memo, useState } from 'react'
import { ListItem, WhatsappListNodeData, WhatsappListNodeType } from './type'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'

interface Props {
  node?: WhatsappListNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    header: data?.header || '',
    body: data?.body || '',
    buttonText: data?.buttonText || '',
    items: data?.items || [{ title: '', description: '' }],
  })

  const handleTransformNode: TransFormToNode<WhatsappListNodeData> = (value) => {
    if (!value.header || !value.body || !value.buttonText || value.items.length === 0) {
      return 'Header, body, button text and at least one item are required'
    }
    if (value.items.some((item) => !item.title)) {
      return 'All items must have a title'
    }
    return {
      data: value,
      id: node?.id || getRandomId(),
      type: 'whatsapp-list',
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleItemChange = (index: number, item: Partial<ListItem>) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((i, idx) => (idx === index ? { ...i, ...item } : i)),
    }))
  }

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { title: '', description: '' }],
    }))
  }

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== index),
    }))
  }

  return (
    <NodeFormContiner data={formData} transformToNode={handleTransformNode} title="WhatsApp List" updating={!!node}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Header</label>
          <input
            name="header"
            value={formData.header}
            onChange={handleInputChange}
            placeholder="Enter list header"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            placeholder="Enter list body text"
            className="w-full rounded-md border px-3 py-2 min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Button Text</label>
          <input
            name="buttonText"
            value={formData.buttonText}
            onChange={handleInputChange}
            placeholder="Enter button text"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">List Items</label>
            <button type="button" onClick={addItem} className="text-sm text-blue-500 hover:text-blue-600">
              + Add Item
            </button>
          </div>
          {formData.items.map((item, index) => (
            <div key={index} className="space-y-2 p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-2">
                  <input
                    value={item.title}
                    onChange={(e) => handleItemChange(index, { title: e.target.value })}
                    placeholder="Item title"
                    className="w-full rounded-md border px-3 py-2"
                  />
                  <input
                    value={item.description || ''}
                    onChange={(e) => handleItemChange(index, { description: e.target.value })}
                    placeholder="Item description (optional)"
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
                <button type="button" onClick={() => removeItem(index)} className="ml-2 text-red-500 hover:text-red-600">
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NodeFormContiner>
  )
}

export default memo(Form)
