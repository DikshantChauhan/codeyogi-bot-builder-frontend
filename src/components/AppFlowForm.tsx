import { memo, useMemo } from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { nodesUIMeta, NodeTypeKeys } from '../nodes'
import useFlowStore, { Flow } from '../store/flow.store'
import { toast } from 'react-toastify'
import { useShallow } from 'zustand/react/shallow'

interface FlowFormProps {
  isOpen: boolean
  onClose: () => void
  initialData?: Flow
}

interface FormValues {
  name: string
  type: Flow['type']
  nodes: NodeTypeKeys[]
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  nodes: Yup.array().of(Yup.string()).min(1, 'Select at least one node'),
})

function FlowForm({ isOpen, onClose, initialData }: FlowFormProps) {
  const { flows, addFlow, updateFlow } = useFlowStore(
    useShallow((state) => ({
      flows: state.flows,
      addFlow: state.addFlow,
      updateFlow: state.updateFlow,
    }))
  )

  const initialValues: FormValues = {
    name: initialData?.name || '',
    type: initialData?.type || 'campaign',
    nodes: initialData?.nodes || [],
  }

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    // Check for duplicate names, excluding the current flow being edited
    if (flows.some((flow) => flow.name === values.name && flow.name !== initialData?.name)) {
      toast.error('Flow name must be unique')
      return
    }

    const flowData = {
      name: values.name,
      type: values.type,
      nodes: values.nodes,
      data: initialData?.data || {
        nodes: [],
        edges: [],
      },
      subFlowsMap: initialData?.subFlowsMap || {},
    }

    if (initialData) {
      updateFlow({ ...flowData, createdAt: initialData.createdAt })
    } else {
      addFlow(flowData)
    }

    resetForm()
    onClose()
  }

  const typesOptions = useMemo(() => {
    return ['campaign', 'nudge', 'validator'].map((type) => ({
      value: type,
      label: type,
    }))
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit Flow' : 'Add New Flow'}</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <Field name="name" type="text" className="w-full border rounded p-2" />
                {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>

              <div>
                <label className="block mb-1">Type</label>
                <Field as="select" name="type" className="w-full border rounded p-2">
                  {typesOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                {errors.type && touched.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
              </div>

              <div>
                <label className="block mb-1">Nodes</label>
                <div className="border rounded p-2 max-h-40 overflow-y-auto">
                  {Object.entries(nodesUIMeta).map(([key, meta]) => (
                    <label key={key} className="flex items-center p-1">
                      <input
                        type="checkbox"
                        checked={values.nodes.includes(key as NodeTypeKeys)}
                        onChange={(e) => {
                          const newNodes = e.target.checked ? [...values.nodes, key as NodeTypeKeys] : values.nodes.filter((n) => n !== key)
                          setFieldValue('nodes', newNodes)
                        }}
                        className="mr-2"
                      />
                      {meta.title}
                    </label>
                  ))}
                </div>
                {errors.nodes && touched.nodes && <div className="text-red-500 text-sm mt-1">{errors.nodes}</div>}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  {initialData ? 'Update Flow' : 'Create Flow'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default memo(FlowForm)
