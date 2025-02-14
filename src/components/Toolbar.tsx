import { GiArrowCursor } from 'react-icons/gi'
import { Panel } from '@xyflow/react'
import Button from './Button'
import { memo, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { AppNodeKeys, nodesRegistry } from '../models/Node.model'
import { nodeToAddSelector } from '../store/selectors/ui.selector'
import { uiActions } from '../store/slices/UI.slice'
import { selectedFlowAllowedNodesSelector } from '../store/selectors/flow.selector'

interface ToolbarProps {
  nodeToAdd: AppNodeKeys | null
  setNodeToAdd: (nodeToAdd: AppNodeKeys | null) => void
  allowed_nodes: AppNodeKeys[]
  setSelectedNodeId: (selectedNodeId: string | null) => void
}

const Toolbar: React.FC<ToolbarProps> = ({ nodeToAdd, setNodeToAdd, allowed_nodes, setSelectedNodeId }) => {
  const nodesList = useMemo(
    () => [
      [null, { Icon: GiArrowCursor, color: 'bg-slate-500', title: 'cursor' }] as const,
      ...allowed_nodes
        .sort()
        .map((key: AppNodeKeys) => [key, { Icon: nodesRegistry[key].Icon, color: nodesRegistry[key].color, title: key }] as const),
    ],
    [allowed_nodes]
  )

  const onToolClick = useCallback(
    (node: AppNodeKeys | null) => {
      setNodeToAdd(node)
      setSelectedNodeId(null)
    },
    [setNodeToAdd, setSelectedNodeId]
  )

  return (
    <Panel position="top-center" className="p-4 bg-white z-10 shadow-md drop-shadow rounded-md flex gap-2">
      {nodesList.map(([key, { Icon, color, title }]) => {
        return (
          <Button active={nodeToAdd === key} onClick={() => onToolClick(key)} title={title} className={`${color}`}>
            <Icon />
          </Button>
        )
      })}
    </Panel>
  )
}

const mapStateToProps = (state: AppState) => ({
  nodeToAdd: nodeToAddSelector(state),
  allowed_nodes: selectedFlowAllowedNodesSelector(state),
})

const mapDispatchToProps = {
  setNodeToAdd: uiActions.setNodeToAdd,
  setSelectedNodeId: uiActions.setSelectedNodeId,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Toolbar))
