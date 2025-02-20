import { memo } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Flow } from '../models/Flow.model'
import { Entity } from '../models/Entity.model'
import Loading from './Loading'
import Error from './Error'
import { AppState } from '../store/store'
import { connect } from 'react-redux'
import { flowActions } from '../store/slices/flow.slice'

export type FlowAddOrUpdateFormData = Omit<Flow, keyof Entity>

type Props = {
  isOpen: boolean
  onClose: () => void
  loading: boolean
  error: string | null
  addFlow: typeof flowActions.flowAddTry
} & ({ type: 'level'; campaignRef: { id: string } } | { type: 'nudge'; campaignRef?: undefined })

function FlowAddPopup({ isOpen, onClose, type, loading, error, addFlow, campaignRef }: Props) {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  })

  const initialValues = {
    name: '',
    level_number: 1,
  }

  const onSubmit = (values: typeof initialValues) => {
    const flow = {
      name: values.name,
      type,
      data: {
        nodes: [],
        edges: [],
      },
    }
    addFlow({ campaign_id: campaignRef!.id, flow_data: flow, level_number: values.level_number })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">Add New {type} Flow</h2>
        {loading && <Loading message="Loading..." />}
        {error && <Error message={error} />}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <Field name="name" type="text" className="w-full border rounded p-2" />
                {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>

              {type === 'level' && (
                <div>
                  <label className="block mb-1">Level Number</label>
                  <Field name="level_number" type="number" className="w-full border rounded p-2" />
                </div>
              )}

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Create Flow
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  loading: state.flow.flowAddLoading,
  error: state.flow.flowAddError,
})

const mapDispatchToProps = {
  addFlow: flowActions.flowAddTry,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(FlowAddPopup))
