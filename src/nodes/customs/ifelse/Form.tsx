import { FC, memo, useCallback, useState } from 'react'
import NodeFormContiner from '../../../components/NodeFormContiner'
import Input from '../../../components/Input'
import { FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { IfElseNodeData } from './type'

const IfElseForm: FC = () => {
  const [inputs, setInputs] = useState<string[]>([])

  const handleTransform = useCallback(
    (data: { [k: string]: FormDataEntryValue }) => {
      const res: IfElseNodeData = {
        if: '',
        elseIf: [],
        else: '',
      }

      res.elseIf = inputs.map((inputId) => data[inputId] as string)

      res.if = data['if'] as string
      res.else = data['else'] as string

      return res
    },
    [inputs]
  )

  const handleAddInput = () => {
    const newInputId = `if-else-${inputs.length}`
    setInputs((prev) => [...prev, newInputId])
  }

  const handleRemoveInput = (id: string) => {
    setInputs((prev) => prev.filter((inputId) => inputId !== id))
  }

  return (
    <NodeFormContiner type="if-else" transformData={handleTransform}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="if">
          If Condition
        </label>
        <Input type="text" name="if" placeholder="Enter if condition" />
      </div>

      <button
        type="button"
        onClick={handleAddInput}
        className="bg-blue-500 flex items-center justify-center text-white p-2 w-full rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        <FaPlus />
      </button>

      {inputs.map((inputId, index) => (
        <div key={inputId} className="flex items-center space-x-2 mb-2">
          <Input type="text" name={inputId} placeholder={`Enter else if ${index + 1}`} />
          <MdDeleteForever className="text-red-500 cursor-pointer" onClick={() => handleRemoveInput(inputId)} />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="else">
          Else Statement
        </label>
        <Input type="text" name="else" placeholder="Enter else condition" />
      </div>
    </NodeFormContiner>
  )
}

export default memo(IfElseForm)
