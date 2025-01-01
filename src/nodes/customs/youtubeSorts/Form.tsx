import { FC, memo, useCallback, useState } from 'react'
import NodeFormContiner, { NodeFormOnSubmit } from '../../../components/NodeFormContiner'
import Input from '../../../components/Input'
import { MdDeleteForever } from 'react-icons/md'
import PlusButton from '../../../components/PlusButton'
import { getRandomId } from '../../../utils'

const Form: FC = () => {
  const [linksCount, setLinksCount] = useState(1)

  const handleSubmit: NodeFormOnSubmit = useCallback((data) => {
    const res = { links: Object.values(data).filter((val) => typeof val === 'string') }

    return {
      data: res,
      id: getRandomId(),
      position: { x: 0, y: 0 },
      type: 'youtube-sorts',
      links: Object.values(data).filter((val) => typeof val === 'string'),
    }
  }, [])

  const handleAddLink = () => {
    setLinksCount((prev) => prev + 1)
  }

  const handleRemoveLink = () => {
    setLinksCount((prev) => prev - 1)
  }

  return (
    <NodeFormContiner onSubmit={handleSubmit}>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="links">
          Youtube Sort Links
        </label>

        {Array.from({ length: linksCount }).map((_, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input type="text" name={index.toString()} placeholder={`Enter link ${index + 1}`} />
            <MdDeleteForever className="text-red-500 cursor-pointer" onClick={() => handleRemoveLink()} />
          </div>
        ))}

        <PlusButton type="button" onClick={handleAddLink}></PlusButton>
      </div>
    </NodeFormContiner>
  )
}

export default memo(Form)
