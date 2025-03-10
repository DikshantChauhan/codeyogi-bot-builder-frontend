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
import { selectedNodeIdSelector } from '../store/selectors/ui.selector'

const useFlowPageData = () => {
  const selectedFlow = useSelector(selectedFlowSelector)
  const selectedFlowLoading = useSelector(selectedFlowLoadingSelector)
  const selectedFlowError = useSelector(selectedFlowErrorSelector)
  const updateLoading = useSelector(flowUpdateLoadingSeletor)
  const selectedNodeId = useSelector(selectedNodeIdSelector)

  const [reconnectingEdge, setReconnectingEdge] = useState<AppEdge | null>(null)

  const dispatch = useDispatch()
  const { nodes: selectedNodes, edges: selectedEdges } = selectedFlow?.data || { nodes: [], edges: [] }

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
    },
    [setNodes, selectedNodes]
  )

  const onEdgesChange: OnEdgesChange<AppEdge> = useCallback(
    (changes) => {
      const edges = applyEdgeChanges(changes, selectedEdges)
      setEdges(edges)
    },
    [setEdges, selectedEdges]
  )

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const edges = addEdge(connection, selectedEdges)
      setEdges(edges)
    },
    [setEdges, selectedEdges]
  )

  const onReconnect: OnReconnect<AppEdge> = useCallback(
    (edge, connection) => {
      const newEdges = reconnectEdge(edge, connection, selectedEdges)
      setEdges(newEdges)
    },
    [setEdges, selectedEdges]
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
        dispatch(uiActions.setSelectedNodeId(node.id))
      } else {
        dispatch(uiActions.setSelectedNodeId(node.id))
      }
    },
    [dispatch]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //ctrl + d
      if ((e.ctrlKey && e.key === 'd') || (e.ctrlKey && e.key === 'D')) {
        e.preventDefault()
        const selectedNode = selectedNodeId && selectedNodes.find((node) => node.id === selectedNodeId)
        if (selectedNode) {
          const newNode = { ...selectedNode, id: getRandomId(), position: { x: selectedNode.position.x + 20, y: selectedNode.position.y + 20 } }
          dispatch(
            flowActions.setFlow({
              flow: {
                ...selectedFlow!,
                data: { ...selectedFlow!.data, nodes: [...selectedFlow!.data.nodes, newNode] },
              },
            })
          )
          dispatch(uiActions.setSelectedNodeId(newNode.id))
        }
      }

      //escape
      if (e.key === 'Escape') {
        dispatch(uiActions.setSelectedNodeId(null))
        dispatch(uiActions.setNodeToAdd(null))
      }

      //backspace
      if (
        (e.key === 'Backspace' || e.key === 'Delete') &&
        selectedNodeId &&
        !(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault()
        const selectedNode = selectedNodeId && selectedNodes.find((node) => node.id === selectedNodeId)
        if (selectedNode) {
          dispatch(
            flowActions.setFlow({
              flow: {
                ...selectedFlow!,
                data: {
                  ...selectedFlow!.data,
                  nodes: selectedNodes.filter((node) => node.id !== selectedNodeId),
                  edges: selectedEdges.filter((edge) => edge.source !== selectedNodeId || edge.target !== selectedNodeId),
                },
              },
            })
          )
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedNodeId, selectedNodes, selectedFlow])

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
  }
}

export default useFlowPageData
