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
import { cloneSelectionNodeData, getOffsetFromCentroid, getSourceHandleConnection, parseNodeSelectionString } from '../utils'
import { uiActions } from '../store/slices/UI.slice'
import { pannelClickedPositionSelector, selectedNodeRefSelector } from '../store/selectors/ui.selector'
import { toast } from 'react-toastify'

const useFlowPageData = () => {
  const selectedFlow = useSelector(selectedFlowSelector)
  const selectedFlowLoading = useSelector(selectedFlowLoadingSelector)
  const selectedFlowError = useSelector(selectedFlowErrorSelector)
  const updateLoading = useSelector(flowUpdateLoadingSeletor)
  const selectedNodeRef = useSelector(selectedNodeRefSelector)
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
      const sourceHandleConnection = getSourceHandleConnection(sourceId, sourceHandleName!, selectedEdges)
      // console.log(reconnectingEdge)
      if (sourceHandleConnection.length !== 0) return false

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
      //capture click to select multiple nodes
      if (e.ctrlKey || e.metaKey) {
        let existingNodeIds: string[] = []
        if (selectedNodeRef && 'selection' in selectedNodeRef) {
          existingNodeIds = selectedNodeRef.selection.nodesIds
        } else if (selectedNodeRef && 'id' in selectedNodeRef) {
          existingNodeIds = [selectedNodeRef.id]
        }

        // Add new node ID if not already present
        const nodesIds = existingNodeIds.includes(node.id) ? existingNodeIds : [...existingNodeIds, node.id]

        // Filter edges that connect only the selected nodes
        const edgesIds = selectedEdges.filter((edge) => nodesIds.includes(edge.source) && nodesIds.includes(edge.target)).map((edge) => edge.id)

        dispatch(uiActions.setSelectedNode({ selection: { nodesIds, edgesIds } }))
      } else {
        dispatch(uiActions.setSelectedNode({ id: node.id }))
      }
    },
    [dispatch, selectedEdges, selectedNodeRef]
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
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return

      //escape
      if (e.key === 'Escape') {
        dispatch(uiActions.setSelectedNode(null))
        return
      }

      //undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
        return
      }

      //redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
        return
      }

      const selectionIds =
        selectedNodeRef && 'selection' in selectedNodeRef
          ? selectedNodeRef.selection
          : selectedNodeRef && 'id' in selectedNodeRef
          ? { nodesIds: [selectedNodeRef.id], edgesIds: [] }
          : null

      if (selectionIds) {
        const selection = {
          nodes: selectionIds.nodesIds.map((id) => selectedNodes.find((node) => node.id === id)).filter((node) => node !== undefined),
          edges: selectionIds.edgesIds.map((id) => selectedEdges.find((edge) => edge.id === id)).filter((edge) => edge !== undefined),
        }
        if ((e.ctrlKey && e.key === 'd') || (e.ctrlKey && e.key === 'D')) {
          //ctrl + d
          e.preventDefault()
          const { nodes: clonedNodes, edges: clonedEdges } = cloneSelectionNodeData(selection, { x: 20, y: 20 }, true)
          const updatedNodes = [...selectedFlow!.data.nodes.map((node) => ({ ...node, selected: false })), ...clonedNodes]
          const updatedEdges = [...selectedFlow!.data.edges, ...clonedEdges]
          const updatedFlow = {
            ...selectedFlow!,
            data: { ...selectedFlow!.data, nodes: updatedNodes, edges: updatedEdges },
          }

          setFlow(updatedFlow)
          dispatch(
            uiActions.setSelectedNode({ selection: { nodesIds: clonedNodes.map((node) => node.id), edgesIds: clonedEdges.map((edge) => edge.id) } })
          )
        }

        //ctrl + c
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
          e.preventDefault()
          navigator.clipboard.writeText(JSON.stringify(selection))
          toast.success('Node copied to clipboard')
        }

        //Delete && Backspace
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault()
          const updatedNodes = selectedNodes.filter((node) => !selection.nodes.some((n) => n.id === node.id))
          const updatedEdges = selectedEdges.filter((edge) => !selection.edges.some((e) => e.id === edge.id))
          const updatedFlow = {
            ...selectedFlow!,
            data: { ...selectedFlow!.data, nodes: updatedNodes, edges: updatedEdges },
          }
          setFlow(updatedFlow)
          dispatch(uiActions.setSelectedNode(null))
        }
      }

      //ctrl + v
      if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) {
        e.preventDefault()
        navigator.clipboard.readText().then((text) => {
          const nodeSelection = parseNodeSelectionString(text)
          if (!nodeSelection) {
            toast.error('Invalid node selection data')
            return
          }
          if (!pannelClickedPosition) {
            toast.error('No position to paste node, click on the canvas to set position')
            return
          }

          const { nodes: clonedNodes, edges: clonedEdges } = cloneSelectionNodeData(
            nodeSelection,
            getOffsetFromCentroid(nodeSelection.nodes, pannelClickedPosition),
            true
          )
          const updatedFlow = {
            ...selectedFlow!,
            data: {
              ...selectedFlow!.data,
              nodes: [...selectedFlow!.data.nodes.map((node) => ({ ...node, selected: false })), ...clonedNodes],
              edges: [...selectedFlow!.data.edges, ...clonedEdges],
            },
          }
          setFlow(updatedFlow)
          dispatch(
            uiActions.setSelectedNode({ selection: { nodesIds: clonedNodes.map((node) => node.id), edgesIds: clonedEdges.map((edge) => edge.id) } })
          )
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedNodes, selectedEdges, selectedFlow, setFlow, undo, redo, dispatch, pannelClickedPosition, selectedNodeRef])

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
    onPaneClick,
  }
}

export default useFlowPageData
