import { FC, memo, useCallback, useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { CiExport, CiSaveDown2 } from 'react-icons/ci'
import { Panel } from '@xyflow/react'
import { Link } from 'react-router-dom'
import { BiHome } from 'react-icons/bi'
import useFlowStore from '../store/flow.store'

const MenuBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { saveFlow, getSelectedFlow } = useFlowStore((state) => ({
    saveFlow: state.saveFlow,
    getSelectedFlow: state.getSelectedFlow,
  }))

  const handleSave = useCallback(async () => {
    await saveFlow()
    setIsOpen(false)
  }, [])

  const handleExport = useCallback(() => {
    const data = getSelectedFlow()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'flow.json'
    a.click()
    URL.revokeObjectURL(url)
    setIsOpen(false)
  }, [])

  return (
    <Panel className="bg-white rounded-md shadow-lg">
      <div className="relative">
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <IoMenu className="w-5 h-5 text-gray-600" />
        </button>

        {isOpen && (
          <div className="absolute bottom-0-0 left-0 mt-2 bg-white rounded-md shadow-lg z-10 border">
            <Link to="/" className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 min-w-max">
              <BiHome className="w-5 h-5 mr-3" />
              <span className="flex-grow">Home</span>
            </Link>
            <button onClick={handleSave} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <CiSaveDown2 className="w-5 h-5 mr-3" />
              <span className="flex-grow">Save</span>
            </button>
            <button onClick={handleExport} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <CiExport className="w-5 h-5 mr-3" />
              <span className="flex-grow">Export</span>
            </button>
          </div>
        )}
      </div>
    </Panel>
  )
}

export default memo(MenuBar)
