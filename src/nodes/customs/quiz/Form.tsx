import { FC, memo, useCallback } from 'react'
import NodeFormContiner, { NodeFormOnSubmit } from '../../../components/NodeFormContiner'
import { QuizNodeData } from './type'
import { getRandomId } from '../../../utils'

const Form: FC = () => {
  const handleSubmit: NodeFormOnSubmit = useCallback((data) => {
    const res: QuizNodeData = {
      options: [data['option1'] as string, data['option2'] as string, data['option3'] as string, data['option4'] as string],
      question: data['question'] as string,
      rightAnswer: data['option1'] as string,
    }
    return {
      data: res,
      id: getRandomId(),
      position: { x: 0, y: 0 },
      type: 'quiz',
    }
  }, [])

  return (
    <NodeFormContiner onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="question">
          Question
        </label>
        <input
          type="text"
          name="question"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter question"
        />
        <input
          type="text"
          name="option1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="option 1"
        />
        <input
          type="text"
          name="option2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="option 2"
        />
        <input
          type="text"
          name="option3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="option 2"
        />
        <input
          type="text"
          name="option4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="option 2"
        />
      </div>
    </NodeFormContiner>
  )
}

export default memo(Form)
