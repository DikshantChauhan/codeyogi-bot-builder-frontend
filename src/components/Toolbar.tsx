import { GiArrowCursor } from 'react-icons/gi'
import { Panel } from '@xyflow/react'
import { NodeTypeKeys, nodesUIMeta } from '../nodes'
import useAppStore from '../store/reactFlow.store'
import Button from './Button'
import useFlowStore from '../store/flow.store'

interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = ({}) => {
  const pickedTool = useAppStore((state) => state.nodeToAdd)
  const setNodeToAdd = useAppStore((state) => state.setNodeToAdd)

  const { getSelectedFlowAllowedNodes } = useFlowStore((state) => ({
    getSelectedFlowAllowedNodes: state.getSelectedFlowAllowedNodes,
  }))
  const allowedNodesKey = getSelectedFlowAllowedNodes()
  const allowedNodes = [
    [null, { Icon: GiArrowCursor, color: 'bg-slate-500', title: 'cursor' }] as const,
    ...allowedNodesKey.sort().map((key: NodeTypeKeys) => [key, nodesUIMeta[key]] as const),
  ]

  return (
    <Panel position="top-center" className="p-4 bg-white z-10 shadow-md drop-shadow rounded-md flex gap-2">
      {allowedNodes.map(([key, { Icon, color, title }]) => {
        return (
          <Button active={pickedTool === key} onClick={() => setNodeToAdd(key)} title={title} className={`${color}`}>
            <Icon />
          </Button>
        )
      })}
    </Panel>
  )
}

export default Toolbar
