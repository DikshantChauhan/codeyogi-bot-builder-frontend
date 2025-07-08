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
  useReactFlow,
} from '@xyflow/react'
import { OnNodesChange } from '@xyflow/react'
import { AppNode, nodesRegistry } from '../models/Node.model'
import { AppEdge } from '../models/Edge.model'
import { getRandomId, getSourceHandleConnection, parseNodeString } from '../utils'
import { uiActions } from '../store/slices/UI.slice'
import { pannelClickedPositionSelector, selectedNodeSelector } from '../store/selectors/ui.selector'
import { toast } from 'react-toastify'

const useFlowPageData = () => {
  const selectedFlow = useSelector(selectedFlowSelector)
  const selectedFlowLoading = useSelector(selectedFlowLoadingSelector)
  const selectedFlowError = useSelector(selectedFlowErrorSelector)
  const updateLoading = useSelector(flowUpdateLoadingSeletor)
  const selectedNode = useSelector(selectedNodeSelector)
  const pannelClickedPosition = useSelector(pannelClickedPositionSelector)

  const [reconnectingEdge, setReconnectingEdge] = useState<AppEdge | null>(null)

  const dispatch = useDispatch()
  const { nodes: selectedNodes, edges: selectedEdges } = selectedFlow?.data || { nodes: [], edges: [] }

  // Initialize history hook
  const { pushToHistory, undo, redo } = useHistory()
  const { screenToFlowPosition } = useReactFlow()

  // Wrapper function that combines setFlow and pushToHistory
  const setFlow = useCallback(
    (updated: Flow) => {
      dispatch(flowActions.setFlow({ flow: updated }))
      pushToHistory(updated)
    },
    [dispatch, pushToHistory]
  )

  const onNodesChange: OnNodesChange<AppNode> = useCallback(
    (changes) => {
      const nodes = applyNodeChanges(changes, selectedNodes)
      const updatedFlow = { ...selectedFlow!, data: { ...selectedFlow!.data, nodes } }
      setFlow(updatedFlow)
    },
    [selectedNodes, selectedFlow, setFlow]
  )

  const onEdgesChange: OnEdgesChange<AppEdge> = useCallback(
    (changes) => {
      const edges = applyEdgeChanges(changes, selectedEdges)
      const updatedFlow = { ...selectedFlow!, data: { ...selectedFlow!.data, edges } }
      setFlow(updatedFlow)
    },
    [selectedEdges, selectedFlow, setFlow]
  )

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const edges = addEdge(connection, selectedEdges)
      const updatedFlow = { ...selectedFlow!, data: { ...selectedFlow!.data, edges } }
      setFlow(updatedFlow)
    },
    [selectedEdges, selectedFlow, setFlow]
  )

  const onReconnect: OnReconnect<AppEdge> = useCallback(
    (edge, connection) => {
      const newEdges = reconnectEdge(edge, connection, selectedEdges)
      const updatedFlow = { ...selectedFlow!, data: { ...selectedFlow!.data, edges: newEdges } }
      setFlow(updatedFlow)
    },
    [selectedEdges, selectedFlow, setFlow]
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
      // console.log(reconnectingEdge)
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

        setFlow(updatedFlow)
      })
    },
    [selectedEdges, selectedFlow, selectedNodes, setFlow]
  )

  const onPaneClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      const bounds = e.currentTarget.getBoundingClientRect()
      const clientX = e.clientX - bounds.left
      const clientY = e.clientY - bounds.top

      // Convert screen coords to flow coords
      const flowPoint = screenToFlowPosition({ x: clientX, y: clientY })
      dispatch(uiActions.setPannelClickedPosition({ x: flowPoint.x, y: flowPoint.y }))
    },
    [dispatch, screenToFlowPosition]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //ctrl + d
      if ((e.ctrlKey && e.key === 'd') || (e.ctrlKey && e.key === 'D')) {
        e.preventDefault()
        if (selectedNode) {
          const newNode = { ...selectedNode, id: getRandomId(), position: { x: selectedNode.position.x + 20, y: selectedNode.position.y + 20 } }
          const updatedFlow = {
            ...selectedFlow!,
            data: { ...selectedFlow!.data, nodes: [...selectedFlow!.data.nodes, newNode] },
          }
          setFlow(updatedFlow)

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

      //ctrl + c
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault()
        if (selectedNode) {
          navigator.clipboard.writeText(JSON.stringify(selectedNode))
          toast.success('Node copied to clipboard')
        }
      }

      //ctrl + v
      if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) {
        e.preventDefault()
        navigator.clipboard.readText().then((text) => {
          const node = parseNodeString(text)
          if (!node) {
            toast.error('Invalid node data')
            return
          }
          if (!pannelClickedPosition) {
            toast.error('No position to paste node, click on the canvas to set position')
            return
          }

          const newNode = { ...node, id: getRandomId(), position: { x: pannelClickedPosition.x, y: pannelClickedPosition.y } }
          const updatedFlow = {
            ...selectedFlow!,
            data: { ...selectedFlow!.data, nodes: [...selectedFlow!.data.nodes, newNode] },
          }
          setFlow(updatedFlow)
          dispatch(uiActions.setSelectedNode({ id: newNode.id }))
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedNode, selectedNodes, selectedFlow, setFlow, undo, redo])

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
