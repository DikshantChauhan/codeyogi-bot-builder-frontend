import {
  flowUpdateLoadingSeletor,
  selectedFlowErrorSelector,
  selectedFlowLoadingSelector,
  selectedFlowSelector,
} from '../store/selectors/flow.selector'
import { useDispatch, useSelector } from 'react-redux'
import { flowActions } from '../store/slices/flow.slice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Flow } from '../models/Flow.model'
import useHistory from './useHistory'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  HandleType,
  OnConnect,
  OnEdgesChange,
  OnReconnect,
  reconnectEdge,
} from '@xyflow/react'
import { OnNodesChange } from '@xyflow/react'
import { AppNode, nodesRegistry } from '../models/Node.model'
import { AppEdge } from '../models/Edge.model'
import { getRandomId, getSourceHandleConnection } from '../utils'
import { uiActions } from '../store/slices/UI.slice'
import { selectedNodeRefSelector } from '../store/selectors/ui.selector'

const useFlowPageData = () => {
  const selectedFlow = useSelector(selectedFlowSelector)
  const selectedFlowLoading = useSelector(selectedFlowLoadingSelector)
  const selectedFlowError = useSelector(selectedFlowErrorSelector)
  const updateLoading = useSelector(flowUpdateLoadingSeletor)
  const selectedNodeRef = useSelector(selectedNodeRefSelector)

  const [reconnectingEdge, setReconnectingEdge] = useState<AppEdge | null>(null)

  const dispatch = useDispatch()
  const { nodes: selectedNodes, edges: selectedEdges } = selectedFlow?.data || { nodes: [], edges: [] }

  // Initialize history hook
  const { pushToHistory, undo, redo } = useHistory()

  const setFlow = useCallback(
    (flow: Flow) => {
      dispatch(flowActions.setFlow({ flow }))
    },
    [dispatch]
  )

  const setNodes = useCallback(
    (nodes: AppNode[]) => {
      setFlow({ ...selectedFlow!, data: { ...selectedFlow!.data, nodes } })
    },
    [setFlow, selectedFlow]
  )

  const setEdges = useCallback(
    (edges: AppEdge[]) => {
      setFlow({ ...selectedFlow!, data: { ...selectedFlow!.data, edges } })
    },
    [setFlow, selectedFlow]
  )

  const onNodesChange: OnNodesChange<AppNode> = useCallback(
    (changes) => {
      const nodes = applyNodeChanges(changes, selectedNodes)
      setNodes(nodes)

      // Only track history for non-position changes
      const hasNonPositionChanges = changes.some((change) => change.type !== 'position' && change.type !== 'select')

      if (hasNonPositionChanges && selectedFlow) {
        const updatedFlow = { ...selectedFlow, data: { ...selectedFlow.data, nodes } }
        pushToHistory(updatedFlow)
      }
    },
    [setNodes, selectedNodes, selectedFlow, pushToHistory]
  )

  const onEdgesChange: OnEdgesChange<AppEdge> = useCallback(
    (changes) => {
      const edges = applyEdgeChanges(changes, selectedEdges)
      setEdges(edges)

      // Track history for all edge changes
      if (selectedFlow) {
        const updatedFlow = { ...selectedFlow, data: { ...selectedFlow.data, edges } }
        pushToHistory(updatedFlow)
      }
    },
    [setEdges, selectedEdges, selectedFlow, pushToHistory]
  )

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const edges = addEdge(connection, selectedEdges)
      setEdges(edges)

      // Track history for edge connections
      if (selectedFlow) {
        const updatedFlow = { ...selectedFlow, data: { ...selectedFlow.data, edges } }
        pushToHistory(updatedFlow)
      }
    },
    [setEdges, selectedEdges, selectedFlow, pushToHistory]
  )

  const onReconnect: OnReconnect<AppEdge> = useCallback(
    (edge, connection) => {
      const newEdges = reconnectEdge(edge, connection, selectedEdges)
      setEdges(newEdges)

      // Track history for edge reconnections
      if (selectedFlow) {
        const updatedFlow = { ...selectedFlow, data: { ...selectedFlow.data, edges: newEdges } }
        pushToHistory(updatedFlow)
      }
    },
    [setEdges, selectedEdges, selectedFlow, pushToHistory]
  )

  const onReconnectStart = useCallback(
    (_: React.MouseEvent, edge: AppEdge, handleType: HandleType) => {
      setReconnectingEdge({ ...edge, sourceHandle: handleType })
    },
    [setReconnectingEdge]
  )

  const onReconnectEnd = useCallback(() => {
    setReconnectingEdge(null)
  }, [setReconnectingEdge])

  //TODO: fix this, check with three nodes and try to reconnect them
  const isConnnectionValid = useCallback(
    (connection: AppEdge | Connection) => {
      const { source: sourceId, sourceHandle: sourceHandleName } = connection

      //no self connections
      if (connection.source === connection.target) return false

      //no multiple connections to the source handle
      const handleConnections = getSourceHandleConnection(sourceId, sourceHandleName!, selectedEdges)
      console.log(reconnectingEdge)
      if (handleConnections.length !== 0) return false

      return true
    },
    [selectedEdges, reconnectingEdge]
  )

  const nodeTypes = useMemo(() => {
    return Object.entries(nodesRegistry).reduce((pre, [key, { node }]) => {
      return { ...pre, [key]: node }
    }, {} as Record<string, React.NamedExoticComponent<any>>)
  }, [])

  const onNodeClick = useCallback(
    (e: React.MouseEvent, node: AppNode) => {
      //capture shift + click to select multiple nodes
      if (e.shiftKey) {
        dispatch(uiActions.setSelectedNode({ id: node.id }))
      } else {
        dispatch(uiActions.setSelectedNode({ id: node.id }))
      }
    },
    [dispatch]
  )

  const onNodeDelete = useCallback(
    (nodes: AppNode[]) => {
      nodes.forEach((node) => {
        const updatedFlow = {
          ...selectedFlow!,
          data: {
            ...selectedFlow!.data,
            nodes: selectedNodes.filter((n) => n.id !== node.id),
            edges: selectedEdges.filter((edge) => edge.source !== node.id && edge.target !== node.id),
          },
        }

        dispatch(flowActions.setFlow({ flow: updatedFlow }))

        // Track history for node deletion
        pushToHistory(updatedFlow)
      })
    },
    [selectedEdges, selectedFlow, selectedNodes, pushToHistory]
  )

  const onPaneClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      dispatch(uiActions.setPannelClickedPosition({ x: e.clientX, y: e.clientY }))
    },
    [dispatch]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //ctrl + d
      if ((e.ctrlKey && e.key === 'd') || (e.ctrlKey && e.key === 'D')) {
        e.preventDefault()
        const selectedNode = selectedNodeRef && 'id' in selectedNodeRef && selectedNodes.find((node) => node.id === selectedNodeRef.id)
        if (selectedNode) {
          const newNode = { ...selectedNode, id: getRandomId(), position: { x: selectedNode.position.x + 20, y: selectedNode.position.y + 20 } }
          const updatedFlow = {
            ...selectedFlow!,
            data: { ...selectedFlow!.data, nodes: [...selectedFlow!.data.nodes, newNode] },
          }
          dispatch(flowActions.setFlow({ flow: updatedFlow }))

          // Track history for node duplication
          pushToHistory(updatedFlow)

          dispatch(uiActions.setSelectedNode({ id: newNode.id }))
        }
      }

      //escape
      if (e.key === 'Escape') {
        dispatch(uiActions.setSelectedNode(null))
      }

      //undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }

      //redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedNodeRef, selectedNodes, selectedFlow, pushToHistory, undo, redo])

  return {
    nodes: selectedFlow?.data.nodes || [],
    edges: selectedFlow?.data.edges || [],
    selectedFlowLoading,
    selectedFlowError,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onReconnect,
    isConnnectionValid,
    onReconnectStart,
    onReconnectEnd,
    nodeTypes,
    onNodeClick,
    updateLoading,
    onNodeDelete,
    onPaneClick,
  }
}

export default useFlowPageData
