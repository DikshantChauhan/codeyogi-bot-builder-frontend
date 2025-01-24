import { GiArrowCursor } from 'react-icons/gi'
import { Panel } from '@xyflow/react'
import { NodeTypeKeys, nodesUIMeta } from '../nodes'
import useAppStore from '../store/store'
import Button from './Button'

interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = ({}) => {
  const pickedTool = useAppStore((state) => state.nodeToAdd)
  const setNodeToAdd = useAppStore((state) => state.setNodeToAdd)

  return (
    <Panel position="top-center" className="p-4 bg-white z-10 shadow-md drop-shadow rounded-md space-x-2">
      <Button key="" active={pickedTool === null} onClick={() => setNodeToAdd(null)} title="cursor">
        <GiArrowCursor />
      </Button>
      {(Object.entries(nodesUIMeta) as [NodeTypeKeys, (typeof nodesUIMeta)[NodeTypeKeys]][])
        .filter(([key]) => key !== 'start')
        .map(([key, { Icon, color }]) => (
          <Button key={key} active={pickedTool === key} onClick={() => setNodeToAdd(key)} title={key} className={color}>
            <Icon />
          </Button>
        ))}
    </Panel>
  )
}

export default Toolbar
