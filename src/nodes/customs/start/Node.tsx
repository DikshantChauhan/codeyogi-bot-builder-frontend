import { NodeProps, Position } from '@xyflow/react'
import { StartNodeType } from './type'
import { FC, memo } from 'react'
import Handle from '../../../components/Handle'
import { FiMove } from 'react-icons/fi'
import { MdOutlineStart } from 'react-icons/md'

const StartNode: FC<NodeProps<StartNodeType>> = () => {
  return (
    <div className="bg-gray-200 rounded text-xs py-2 min-w-40 cursor-auto">
      <div className="flex items-center mb-1 px-2 relative justify-between">
                <div className="flex items-center">
          <MdOutlineStart className={`p-1 w-5 h-5 text-white rounded bg-blue-700`} />
          <p className="text-center ml-2">Start</p>
        </div>
        <FiMove className="drag-handle__custom text-blue-700 " />
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default memo(StartNode)
