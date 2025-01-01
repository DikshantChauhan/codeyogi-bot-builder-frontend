import { FC, memo, useCallback, useState } from 'react'
import NodeFormContiner, { NodeFormOnSubmit } from '../../../components/NodeFormContiner'
import Input from '../../../components/Input'
import { MdDeleteForever } from 'react-icons/md'
import PlusButton from '../../../components/PlusButton'
import { getRandomId } from '../../../utils'

const NativeSortsForm: FC = () => {
  const [links, setLinks] = useState<string[]>(['link'])

  const handleSubmit: NodeFormOnSubmit = useCallback((data) => {
    const res = {
      links: Object.values(data).filter((val) => typeof val === 'string'),
    }

    return {
      data: res,
      id: getRandomId(),
      position: { x: 0, y: 0 },
      type: 'native-sorts',
    }
  }, [])

  const handleAddLink = () => {
    const newLinkId = `link-${links.length}`
    setLinks((prev) => [...prev, newLinkId])
  }

  const handleRemoveLink = (id: string) => {
    setLinks((prev) => prev.filter((linkId) => linkId !== id))
  }

  return (
    <NodeFormContiner onSubmit={handleSubmit}>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="links">
          Native Sort Links
        </label>

        <PlusButton type="button" onClick={handleAddLink}></PlusButton>

        {links.map((linkId, index) => (
          <div key={linkId} className="flex items-center space-x-2 mb-2">
            <Input type="text" name={linkId} placeholder={`Enter link ${index + 1}`} />
            <MdDeleteForever className="text-red-500 cursor-pointer" onClick={() => handleRemoveLink(linkId)} />
          </div>
        ))}
      </div>
    </NodeFormContiner>
  )
}

export default memo(NativeSortsForm)
