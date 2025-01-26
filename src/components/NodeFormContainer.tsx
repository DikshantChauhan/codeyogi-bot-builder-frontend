import { memo, useCallback, useMemo } from 'react'
import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from 'formik'
import { AppNode } from '../nodes'
import useUpdateOrAddNode from '../hooks/useUpdateOrAddNode'
import Button from './Button'
import { toast } from 'react-toastify'
import useFlowStore from '../store/flow.store'
import useReactFlowStore from '../store/reactFlow.store'
import { getRandomId } from '../utils'
import { useShallow } from 'zustand/react/shallow'
import { useReactFlow } from '@xyflow/react'

export type TransFormNodeDataOrFail<S extends FormikValues> = (values: S, formikHelpers: FormikHelpers<S>) => AppNode['data']

interface FormProps<T extends FormikValues> {
  initialValues: T
  transFormNodeDataOrFail: TransFormNodeDataOrFail<T>
  children: React.ReactNode | ((props: FormikProps<T>) => React.ReactNode)
}

const FormContainer = <T extends FormikValues>({ transFormNodeDataOrFail, children, initialValues }: FormProps<T>) => {
  const { updateOrAddNode } = useUpdateOrAddNode()
  const getSelectedFlow = useFlowStore((state) => state.getSelectedFlow)
  const { selectedNode, nodeToAdd } = useReactFlowStore(
    useShallow(
      (state) =>
        ({
          selectedNode: state.getSelectedNode(),
          nodeToAdd: state.nodeToAdd,
        } as const)
    )
  )
  const { getViewport } = useReactFlow()

  const flow = getSelectedFlow()
  const id = useMemo(() => selectedNode?.id || getRandomId(), [selectedNode])
  const type = selectedNode?.type || nodeToAdd

  const centerPosition = useMemo(() => {
    const viewport = getViewport()
    return {
      x: (viewport.x * -1 + window.innerWidth / 2 - 150) / viewport.zoom,
      y: (viewport.y * -1 + window.innerHeight / 2 - 50) / viewport.zoom,
    }
  }, [getViewport])

  if (!flow) return <div>No flow found</div>
  if (!type) return <div>No node to add</div>

  const handleSubmit = useCallback(
    (values: T, formikHelpers: FormikHelpers<T>) => {
      try {
        const data = transFormNodeDataOrFail(values, formikHelpers)
        const node = {
          id,
          data: data,
          type,
          position: centerPosition,
          dragHandle: '.drag-handle__custom',
        } as AppNode

        updateOrAddNode(node, selectedNode ? 'edit' : 'add', true)
      } catch (error) {
        toast.error(String(error))
      }
    },
    [transFormNodeDataOrFail, updateOrAddNode]
  )

  return (
    <Formik<T> initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
      {(formikProps) => (
        <Form className="space-y-4">
          <h2 className="text-xl font-bold">{type}</h2>

          {typeof children === 'function' ? children(formikProps) : children}

          <div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
              {selectedNode ? 'Update' : 'Add'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default memo(FormContainer) as typeof FormContainer
