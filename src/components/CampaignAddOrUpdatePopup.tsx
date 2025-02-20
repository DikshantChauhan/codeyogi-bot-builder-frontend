import { memo, useMemo } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { AppNodeKeys, nodesRegistry } from '../models/Node.model'
import Loading from './Loading'
import Error from './Error'
import Button from './Button'

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
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-[500px] shadow-xl transform transition-all">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">{initialData ? 'Edit Campaign' : 'Add New Campaign'}</h2>

        {loading && <Loading message="Loading..." />}
        {error && <Error message={error} />}

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 
                    bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    dark:text-white transition-colors"
                />
                {errors.name && touched.name && <div className="text-red-500 text-sm mt-2">{errors.name}</div>}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Allowed Nodes</label>
                <div
                  className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 
                  max-h-56 overflow-y-auto bg-white dark:bg-gray-700"
                >
                  {nodesOptions.map((key) => (
                    <label
                      key={key}
                      className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-600 
                      rounded transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={values.allowed_nodes.includes(key as AppNodeKeys)}
                        onChange={(e) => {
                          const newNodes = e.target.checked
                            ? [...values.allowed_nodes, key as AppNodeKeys]
                            : values.allowed_nodes.filter((n) => n !== (key as AppNodeKeys))
                          setFieldValue('allowed_nodes', newNodes)
                        }}
                        className="w-4 h-4 mr-3 text-blue-500 border-gray-300 rounded 
                          focus:ring-blue-500 dark:border-gray-600"
                      />
                      <span className="dark:text-white">{key}</span>
                    </label>
                  ))}
                </div>
                {errors.allowed_nodes && touched.allowed_nodes && <div className="text-red-500 text-sm mt-2">{errors.allowed_nodes}</div>}
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="secondary">
                  {initialData ? 'Update Campaign' : 'Create Campaign'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default memo(CampaignAddOrUpdatePopup)
