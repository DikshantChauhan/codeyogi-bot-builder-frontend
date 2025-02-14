import { memo, useMemo } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { AppNodeKeys, nodesRegistry } from '../models/Node.model'
import Loading from './Loading'
import Error from './Error'

export type CampaignAddOrUpdateFormData = {
  allowed_nodes: AppNodeKeys[]
  name: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  initialData?: CampaignAddOrUpdateFormData
  onSubmit: (values: CampaignAddOrUpdateFormData) => void
  loading: boolean
  error: string | null
}

interface FormValues {
  name: string
  allowed_nodes: AppNodeKeys[]
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  allowed_nodes: Yup.array().of(Yup.string()).min(1, 'Select at least one node'),
})

function CampaignAddOrUpdatePopup({ isOpen, onClose, initialData, onSubmit, loading, error }: Props) {
  const initialValues: FormValues = {
    name: initialData?.name || '',
    allowed_nodes: initialData?.allowed_nodes || [],
  }

  const nodesOptions = useMemo(() => Object.keys(nodesRegistry), [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit Campaign' : 'Add New Campaign'}</h2>
        {loading && <Loading message="Loading..." />}
        {error && <Error message={error} />}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <Field name="name" type="text" className="w-full border rounded p-2" />
                {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>

              <div>
                <label className="block mb-1">Allowed Nodes</label>
                <div className="border rounded p-2 max-h-56 overflow-y-auto">
                  {nodesOptions.map((key) => (
                    <label key={key} className="flex items-center p-1">
                      <input
                        type="checkbox"
                        checked={values.allowed_nodes.includes(key as AppNodeKeys)}
                        onChange={(e) => {
                          const newNodes = e.target.checked
                            ? [...values.allowed_nodes, key as AppNodeKeys]
                            : values.allowed_nodes.filter((n) => n !== (key as AppNodeKeys))
                          setFieldValue('allowed_nodes', newNodes)
                        }}
                        className="mr-2"
                      />
                      {key}
                    </label>
                  ))}
                </div>
                {errors.allowed_nodes && touched.allowed_nodes && <div className="text-red-500 text-sm mt-1">{errors.allowed_nodes}</div>}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  {initialData ? 'Update Campaign' : 'Create Campaign'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default memo(CampaignAddOrUpdatePopup)
