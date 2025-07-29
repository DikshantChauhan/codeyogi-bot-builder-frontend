import { memo } from 'react'
import Handle from './Handle'
import { Position } from '@xyflow/react'
import { FiMove } from 'react-icons/fi'
import { START_NODE_KEY } from '../nodes/customs/start/type'
import { END_NODE_KEY } from '../nodes/customs/end/type'
import { AppNodeKeys, nodesRegistry } from '../models/Node.model'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { selectedFlowSelector } from '../store/selectors/flow.selector'
import { Flow } from '../models/Flow.model'

interface Props {
  nodeId: string
  nodeType: AppNodeKeys
  isSelected: boolean
  options?: [string, string][]
  children?: React.ReactNode
  selectedFlow: Flow | null
}

const NodeCard = ({ nodeId, nodeType, options, children, selectedFlow, isSelected }: Props) => {
  const { color, Icon } = nodesRegistry[nodeType]

  //TODO: not the optimum way change typings for orientation and move it in base node
  const node = selectedFlow?.data.nodes.find(({ id }) => id === nodeId)
  const orientation = node?.orientation

  return (
    <div
      className={`bg-gray-200 rounded text-xs py-2 min-w-40 max-w-52 cursor-auto relative ${
        isSelected ? ' shadow-md shadow-red-400/50 border-2 border-red-500' : ''
      }`}
    >
      <div className="flex items-center mb-1 px-2 relative justify-between">
        {nodeType !== START_NODE_KEY && (
          <Handle
            type="target"
            className={orientation === 'vertical' ? '-top-2 w-3 h-1' : ''}
            position={orientation === 'vertical' ? Position.Top : Position.Left}
          />
        )}
        <div className="flex items-center mr-2">
          <Icon className={`p-1 w-5 h-5 text-white rounded ${color}`} />
          <p className="text-center ml-2">{nodeType}</p>
        </div>
        <FiMove className="drag-handle__custom text-blue-700" />
      </div>

      <div className="px-2 mt-2 text-[0.5rem] truncate">{children}</div>

      {nodeType !== END_NODE_KEY &&
        (options ? (
          <div className="flex flex-col space-y-1.5">
            {options.map(([label, value], i) => (
              <div key={i + value} className="flex items-center relative text-[0.5rem]">
                <div className="bg-gray-50 flex-1 rounded-sm flex ml-2 mr-1 px-1 space-x-1">
                  {label && <p className="text-gray-600">{label}:</p>}
                  <p className="truncate">{value}</p>
                </div>

                <Handle id={i.toString()} type="source" position={Position.Right} />
              </div>
            ))}
          </div>
        ) : (
          <Handle
            type="source"
            className={orientation === 'vertical' ? 'w-3 h-1' : ''}
            position={orientation === 'vertical' ? Position.Bottom : Position.Right}
          />
        ))}
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedFlow: selectedFlowSelector(state),
  }
}

export default memo(connect(mapStateToProps)(NodeCard))
