import { FC, memo } from 'react'
import { IconType } from 'react-icons'
import Handle from './Handle'
import { Position } from '@xyflow/react'
import { FiMove } from 'react-icons/fi'

interface Props {
  title: string
  Icon: IconType
  iconBg: string
  options?: [string, string][]
  children?: React.ReactNode
}

const NodeCard: FC<Props> = ({ Icon, title, iconBg, options, children }) => {
  return (
    <div className="bg-gray-200 rounded text-xs py-2 min-w-40 cursor-auto">
      <div className="flex items-center mb-1 px-2 relative justify-between">
        <Handle type="target" position={Position.Left} />
        <div className="flex items-center">
          <Icon className={`p-1 w-5 h-5 text-white rounded ${iconBg}`} />
          <p className="text-center ml-2">{title}</p>
        </div>
        <FiMove className="drag-handle__custom text-blue-700 " />
      </div>

      <div className="px-2 mt-2 text-[0.5rem]">{children}</div>

      {options ? (
        <div className="flex flex-col space-y-1.5">
          {options.map(([label, value], i) => (
            <div key={i + value} className="flex items-center relative text-[0.5rem]">
              <div className="bg-gray-50 flex-1 rounded-sm flex ml-2 mr-1 px-1 space-x-1">
                {label && <p className="text-gray-600">{label}:</p>}
                <p>{value}</p>
              </div>

              <Handle id={value} type="source" position={Position.Right} />
            </div>
          ))}
        </div>
      ) : (
        <Handle type="source" position={Position.Right} />
      )}
    </div>
  )
}

export default memo(NodeCard)
