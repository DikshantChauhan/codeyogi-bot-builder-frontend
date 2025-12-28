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
  OnSelectionChangeFunc,
  reconnectEdge,
  useReactFlow,
  OnNodesChange,
  NodeTypes,
} from '@xyflow/react'
import { AppNode, nodesRegistry } from '../models/Node.model'
import { AppEdge } from '../models/Edge.model'
import {
  cloneSelectionNodeData,
  getOffsetFromCentroid,
  getSourceHandleConnection,
  parseLangJson,
  parseNodeSelectionString,
  sanitizeEdges,
} from '../utils'
import { uiActions } from '../store/slices/UI.slice'
import { flowSelectionSelector, pannelClickedPositionSelector } from '../store/selectors/ui.selector'
import { toast } from 'react-toastify'

const useFlowPageData = () => {
  const selectedFlow = useSelector(selectedFlowSelector)
  const selectedFlowLoading = useSelector(selectedFlowLoadingSelector)
  const selectedFlowError = useSelector(selectedFlowErrorSelector)
  const updateLoading = useSelector(flowUpdateLoadingSeletor)
  const pannelClickedPosition = useSelector(pannelClickedPositionSelector)
  const flowSelection = useSelector(flowSelectionSelector)
  const [reconnectingEdge, setReconnectingEdge] = useState<AppEdge | null>(null)
  const [selectionBoxSelectedNode, setSelectionBoxSelectedNode] = useState<string[]>([])

  const dispatch = useDispatch()
  const { nodes: selectedNodes, edges: selectedEdges } = selectedFlow?.data || { nodes: [], edges: [] }

  // Initialize history hook
  const { pushToHistory, undo, redo } = useHistory()
  const { screenToFlowPosition } = useReactFlow()

  // Wrapper function that combines setFlow and pushToHistory
  const setFlow = useCallback(
    (updated: Flow) => {
      const sanitizedFlow = { ...updated, data: { ...updated.data, edges: sanitizeEdges(updated.data.edges, updated.data.nodes) } }
      dispatch(flowActions.setFlow({ flow: sanitizedFlow }))
      pushToHistory(sanitizedFlow)
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

  const getLangParsedNode = useCallback(
    (node: AppNode) => {
      const langVariablesMap = selectedFlow?.language_json
      if (!node?.data || !langVariablesMap) return node

      const data = JSON.stringify(node.data)
      const langMap = parseLangJson(langVariablesMap)

      const parsedData = data.replace(/\$\[(.*?)\]/g, (_, variable: string) => {
        if (variable in langMap) {
          const value = langMap[variable]
          // value is now { lang_map: ..., collapsed: ... }
          const langValues = value.lang_map
          const firstLangValue = langValues[Object.keys(langValues)[0]]
          return JSON.stringify(firstLangValue).slice(1, -1)
        }
        return JSON.stringify(variable).slice(1, -1)
      })

      return { ...node, data: JSON.parse(parsedData) }
    },
    [selectedFlow]
  )

  const nodeTypes: NodeTypes = useMemo(() => {
    return Object.entries(nodesRegistry).reduce((pre, [key, { node }]) => {
      return { ...pre, [key]: node }
    }, {})
  }, [])

  const onNodeClick = useCallback(
    (e: React.MouseEvent, clickedNode: AppNode) => {
      //capture click to select multiple nodes
      if (e.ctrlKey || e.metaKey) {
        const selectedNodesIds: string[] = []

        const updatedNodes = selectedNodes.map((node) => {
          const isSelected = clickedNode.id === node.id || node.selected
          if (isSelected) {
            selectedNodesIds.push(node.id)
          }
          return { ...node, selected: isSelected }
        })

        const updatedEdges = selectedEdges.map((edge) => ({
          ...edge,
          selected: selectedNodesIds.includes(edge.source) && selectedNodesIds.includes(edge.target),
        }))

        setFlow({
          ...selectedFlow!,
          data: { ...selectedFlow!.data, nodes: updatedNodes, edges: updatedEdges },
        })
      } else {
        setFlow({
          ...selectedFlow!,
          data: {
            ...selectedFlow!.data,
            nodes: selectedNodes.map((node) => ({ ...node, selected: node.id === clickedNode.id })),
            edges: selectedEdges.map((edge) => ({ ...edge, selected: false })),
          },
        })
        dispatch(uiActions.setIsToolbarSidePannelExpanded(true))
      }
    },
    [setFlow, selectedEdges, selectedNodes, selectedFlow]
  )

  const setSelectedNode = useCallback(
    (nodeIds: string[], edgeIds: string[]) => {
      const updatedNodes = selectedNodes.map((node) => ({ ...node, selected: nodeIds.includes(node.id) }))
      const updatedEdges = selectedEdges.map((edge) => ({ ...edge, selected: edgeIds.includes(edge.id) }))
      const updatedFlow = {
        ...selectedFlow!,
        data: { ...selectedFlow!.data, nodes: updatedNodes, edges: updatedEdges },
      }
      setFlow(updatedFlow)
    },
    [selectedNodes, selectedEdges, selectedFlow, setFlow]
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

  const onSelectionChange: OnSelectionChangeFunc = useCallback(
    ({ nodes }) => {
      setSelectionBoxSelectedNode(nodes.map((node) => node.id))
    },
    [setSelectionBoxSelectedNode]
  )

  const onSelectionEnd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()

      const updatedNodes = selectedNodes.map((node) => ({ ...node, selected: selectionBoxSelectedNode.includes(node.id) }))
      const updatedEdges = selectedEdges.map((edge) => ({
        ...edge,
        selected: selectionBoxSelectedNode.includes(edge.source) && selectionBoxSelectedNode.includes(edge.target),
      }))

      setFlow({
        ...selectedFlow!,
        data: { ...selectedFlow!.data, nodes: updatedNodes, edges: updatedEdges },
      })
      setSelectionBoxSelectedNode([])
    },
    [setSelectionBoxSelectedNode, selectionBoxSelectedNode, selectedNodes, selectedEdges, selectedFlow, setFlow]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return

      //escape
      if (e.key === 'Escape') {
        setSelectedNode([], [])
        dispatch(uiActions.setNodeToAdd(null))
        return
      }

      //undo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault()
        undo()
        return
      }

      //redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault()
        redo()
        return
      }

      //ctrl + d
      if (flowSelection && e.ctrlKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault()
        const { nodes: clonedNodes, edges: clonedEdges } = cloneSelectionNodeData(flowSelection, { x: 20, y: 20 }, true)
        const updatedNodes = [...selectedFlow!.data.nodes.map((node) => ({ ...node, selected: false })), ...clonedNodes]
        const updatedEdges = [...selectedFlow!.data.edges.map((edge) => ({ ...edge, selected: false })), ...clonedEdges]
        const updatedFlow = {
          ...selectedFlow!,
          data: { ...selectedFlow!.data, nodes: updatedNodes, edges: updatedEdges },
        }

        setFlow(updatedFlow)
      }

      //ctrl + c
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault()
        navigator.clipboard.writeText(JSON.stringify(flowSelection))
        toast.success('Node copied to clipboard')
      }

      //Delete && Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        const updatedNodes = selectedNodes.filter((node) => !node.selected)
        const updatedEdges = selectedEdges.filter((edge) => !edge.selected)
        const updatedFlow = {
          ...selectedFlow!,
          data: { ...selectedFlow!.data, nodes: updatedNodes, edges: updatedEdges },
        }
        setFlow(updatedFlow)
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
              edges: [...selectedFlow!.data.edges.map((edge) => ({ ...edge, selected: false })), ...clonedEdges],
            },
          }
          setFlow(updatedFlow)
        })
      }

      //ctrl + A
      if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault()
        setSelectedNode(
          selectedNodes.map((node) => node.id),
          selectedEdges.map((edge) => edge.id)
        )
      }

      //shift + k
      if (e.shiftKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        dispatch(uiActions.setIsShortcutMenuOpen(true))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedNodes, selectedEdges, selectedFlow, setFlow, undo, redo, dispatch, pannelClickedPosition, setSelectedNode, flowSelection, uiActions])

  return {
    nodes: selectedFlow?.data.nodes.map(getLangParsedNode) || [],
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
    updateLoading,
    onPaneClick,
    onNodeClick,
    onSelectionChange,
    onSelectionEnd,
  }
}

export default useFlowPageData
