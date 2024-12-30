import { FC, memo, useCallback, useState } from 'react'
import NodeFormContiner from '../../../components/NodeFormContiner'
import Input from '../../../components/Input'
import { MdDeleteForever } from 'react-icons/md'
import PlusButton from '../../../components/PlusButton'

const Form: FC = () => {
  const [links, setLinks] = useState<string[]>(['link-1'])

  const handleTransform = useCallback((data: { [k: string]: FormDataEntryValue }) => {
    return {
      links: Object.values(data).filter((val) => typeof val === 'string'),
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
    <NodeFormContiner type="youtube-sorts" transformData={handleTransform}>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="links">
          Youtube Sort Links
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

export default memo(Form)
