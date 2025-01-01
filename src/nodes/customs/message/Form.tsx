import { FC, memo, useCallback } from 'react'
import NodeFormContiner, { NodeFormOnSubmit } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'

const MessageForm: FC = () => {
  const handleSubmit: NodeFormOnSubmit = useCallback((data) => {
    const res = {
      text: data['text'] as string,
    }

    return {
      type: 'message',
      data: res,
      id: getRandomId(),
      position: { x: 0, y: 0 },
    }
  }, [])

  return (
    <NodeFormContiner onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='text'>Message</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          name="text"
          placeholder="Enter message..."
        />{' '}
      </div>
    </NodeFormContiner>
  )
}

export default memo(MessageForm)
