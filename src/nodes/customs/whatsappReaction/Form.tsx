import { memo, useState } from 'react'
import { WhatsappReactionNodeData } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'

import { WHATSAPP_REACTION_NODE_KEY } from './type'
import { NodeRegistryFormProps } from '../../../models/Node.model'

const COMMON_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🙏', '👏', '🔥', '🎉', '💯']

const Form: React.FC<NodeRegistryFormProps<typeof WHATSAPP_REACTION_NODE_KEY>> = ({ node }) => {
  const data = node?.data
  const [formData, setFormData] = useState({
    emoji: data?.emoji || '👍',
    messageId: data?.messageId || '',
  })

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappReactionNodeData> = (value) => {
    if (!value.emoji) {
      throw new Error('Emoji is required')
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

  const handleEmojiSelect = (emoji: string) => {
    setFormData((prev) => ({
      ...prev,
      emoji,
    }))
  }

  return (
    <NodeFormContainer initialValues={formData} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Emoji</label>
          <div className="grid grid-cols-5 gap-2">
            {COMMON_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleEmojiSelect(emoji)}
                className={`text-2xl p-2 rounded-md hover:bg-gray-100 ${formData.emoji === emoji ? 'bg-gray-100 ring-2 ring-blue-500' : ''}`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <input
            name="emoji"
            value={formData.emoji}
            onChange={handleInputChange}
            placeholder="Or type custom emoji"
            className="w-full rounded-md border px-3 py-2 mt-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Message ID (optional)</label>
          <input
            name="messageId"
            value={formData.messageId}
            onChange={handleInputChange}
            placeholder="Enter message ID to react to"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
