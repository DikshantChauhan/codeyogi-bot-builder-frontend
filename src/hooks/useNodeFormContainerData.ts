import { nodeToAddSelector } from '../store/selectors/ui.selector'
import { useDispatch, useSelector } from 'react-redux'
import { selectedNodeSelector } from '../store/selectors/ui.selector'
import { uiActions } from '../store/slices/UI.slice'
import { AppNode, SubFlowValue } from '../models/Node.model'
import { useCallback, useMemo, useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { FormikHelpers, FormikValues } from 'formik'
import { getRandomId } from '../utils'
import { toast } from 'react-toastify'
import { selectedFlowSelector } from '../store/selectors/flow.selector'
import { flowActions } from '../store/slices/flow.slice'
import { Flow } from '../models/Flow.model'

const useNodeFormContainerData = <T extends FormikValues>(
  transFormNodeDataOrFail: (values: T, formikHelpers: FormikHelpers<T>) => AppNode['data']
) => {
  const selectedNode = useSelector(selectedNodeSelector)
  const nodeToAdd = useSelector(nodeToAddSelector)
  const slectedFlow = useSelector(selectedFlowSelector)
  const dispatch = useDispatch()
  const [selectedNudge, setSelectedNudge] = useState<SubFlowValue>('inherit')

  const closeSideBar = useCallback(() => {
    dispatch(uiActions.setSelectedNodeId(null))
    dispatch(uiActions.setNodeToAdd(null))
  }, [dispatch])

  const setFlow = useCallback(
    (flow: Flow) => {
      dispatch(flowActions.setFlow({ flow }))
    },
    [dispatch]
  )

  const { getViewport } = useReactFlow()
  const centerPosition = useMemo(() => {
    const viewport = getViewport()
    return {
      x: (viewport.x * -1 + window.innerWidth / 2 - 150) / viewport.zoom,
      y: (viewport.y * -1 + window.innerHeight / 2 - 50) / viewport.zoom,
    }
  }, [getViewport])

  const type = selectedNode?.type || nodeToAdd

  const handleSubmit = useCallback(
    (values: T, formikHelpers: FormikHelpers<T>) => {
      try {
        const data = transFormNodeDataOrFail(values, formikHelpers)
        const id = selectedNode?.id || getRandomId()

        const nodes = [...(slectedFlow?.data.nodes || [])]
        const nodeIndex = nodes.findIndex((node) => node.id === id)
        const oldNode = nodeIndex !== -1 ? nodes[nodeIndex] : null

        const node = {
          id,
          data: data,
          type,
          position: oldNode?.position || centerPosition,
          dragHandle: '.drag-handle__custom',
          nudge: selectedNudge,
        } as AppNode

        if (!oldNode) {
          nodes.push(node)
        } else {
          nodes[nodeIndex] = node
        }
        console.log(nodes)
        setFlow({ ...slectedFlow!, data: { ...slectedFlow!.data, nodes } })
        closeSideBar()
      } catch (error) {
        toast.error(String(error))
      }
    },
    [centerPosition, selectedNode, slectedFlow, transFormNodeDataOrFail, type, selectedNudge]
  )

  return { selectedNode, handleSubmit, type, slectedFlow, selectedNudge, setSelectedNudge }
}

export default useNodeFormContainerData
