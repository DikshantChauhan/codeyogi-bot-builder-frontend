import { FC, memo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import Popup from './Popup'
import { FiEdit2, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import Button from './Button'
import {
  selectMetaDeleteLoading,
  selectMetaError,
  selectMetaList,
  selectMetaLoading,
  selectMetaSaveError,
  selectMetaSaveLoading,
} from '../store/selectors/meta.selector'
import { metaActions } from '../store/slices/meta.slice'
import { Meta } from '../models/Meta.model'
import Loading from './Loading'
import Error from './Error'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Field from './Field'

interface MetaPopupProps {
  isOpen: boolean
  onClose: () => void

  metaList: Meta[]
  metaLoading: boolean
  metaError: string | null

  metaSaveLoading: boolean
  metaSaveError: string | null

  metaDeleteLoading: { [id: string]: boolean }

  fetchMeta: typeof metaActions.fetchMetaTry
  createMeta: typeof metaActions.createMetaTry
  updateMeta: typeof metaActions.updateMetaTry
  deleteMeta: typeof metaActions.deleteMetaTry
}

const MetaPopup: FC<MetaPopupProps> = ({
  isOpen,
  onClose,
  metaList,
  metaLoading,
  metaError,
  metaSaveLoading,
  metaDeleteLoading,
  fetchMeta,
  createMeta,
  updateMeta,
  deleteMeta,
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      fetchMeta()
    }
  }, [isOpen, fetchMeta])

  useEffect(() => {
    if (!metaSaveLoading) {
      setIsAdding(false)
      setEditingId(null)
    }
  }, [metaSaveLoading])

  if (!isOpen) return null

  const validationSchema = Yup.object({
    key_name: Yup.string().required('Key is required'),
    value: Yup.string().required('Value is required'),
  })

  return (
    <Popup isOpen={isOpen} onClose={onClose} size="2xl">
      <div className="flex flex-col h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Manage Metas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {metaLoading && <Loading message="Loading metas..." />}
          {metaError && <Error message={metaError} />}

          {
            <div className="space-y-4">
              <div className="flex justify-end">
                {!isAdding && (
                  <Button variant="primary" Icon={FiPlus} onClick={() => setIsAdding(true)}>
                    Add New Meta
                  </Button>
                )}
              </div>

              {isAdding && (
                <div className="border rounded p-4 bg-gray-50">
                  <Formik
                    initialValues={{ key_name: '', value: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      createMeta(values)
                    }}
                  >
                    {({ isValid, dirty }) => (
                      <Form className="flex gap-4 items-start">
                        <div className="flex-1">
                          <Field name="key_name" placeholder="Key" disableSuggestion />
                        </div>
                        <div className="flex-1">
                          <Field name="value" placeholder="Value" disableSuggestion />
                        </div>
                        <div className="flex gap-2 mt-1">
                          <Button type="submit" variant="primary" disabled={!isValid || !dirty || metaSaveLoading}>
                            {metaSaveLoading ? 'Saving...' : 'Save'}
                          </Button>
                          <Button type="button" variant="secondary" onClick={() => setIsAdding(false)} disabled={metaSaveLoading}>
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}

              <div className="bg-white border rounded">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-3 font-medium text-gray-600">Key</th>
                      <th className="p-3 font-medium text-gray-600">Value</th>
                      <th className="p-3 font-medium text-gray-600 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {metaList.map((meta) => (
                      <tr key={meta.key_name}>
                        {editingId === meta.key_name ? (
                          <td colSpan={3} className="p-3 bg-gray-50">
                            <Formik
                              initialValues={{ key_name: meta.key_name, value: meta.value }}
                              validationSchema={validationSchema}
                              onSubmit={(values) => {
                                updateMeta(values)
                              }}
                            >
                              {({ isValid, dirty }) => (
                                <Form className="flex gap-4 items-start w-full">
                                  <div className="flex-1">
                                    <Field name="key_name" placeholder="Key" />
                                  </div>
                                  <div className="flex-1">
                                    <Field name="value" placeholder="Value" />
                                  </div>
                                  <div className="flex gap-2 mt-1">
                                    <Button type="submit" variant="primary" disabled={!isValid || !dirty || metaSaveLoading}>
                                      {metaSaveLoading ? 'Saving...' : 'Save'}
                                    </Button>
                                    <Button type="button" variant="secondary" onClick={() => setEditingId(null)} disabled={metaSaveLoading}>
                                      Cancel
                                    </Button>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </td>
                        ) : (
                          <>
                            <td className="p-3">{meta.key_name}</td>
                            <td className="p-3">{meta.value}</td>
                            <td className="p-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                                  onClick={() => setEditingId(meta.key_name)}
                                  disabled={metaDeleteLoading[meta.key_name]}
                                >
                                  <FiEdit2 size={18} />
                                </button>
                                <button
                                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                                  onClick={() => {
                                    if (confirm('Are you sure you want to delete this meta?')) {
                                      deleteMeta(meta.key_name)
                                    }
                                  }}
                                  disabled={metaDeleteLoading[meta.key_name]}
                                >
                                  {metaDeleteLoading[meta.key_name] ? (
                                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <FiTrash2 size={18} />
                                  )}
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {metaList.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-gray-500">
                          No metas found. Click "Add New Meta" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>
      </div>
    </Popup>
  )
}

const mapStateToProps = (state: AppState) => ({
  metaList: selectMetaList(state),
  metaLoading: selectMetaLoading(state),
  metaError: selectMetaError(state),
  metaSaveLoading: selectMetaSaveLoading(state),
  metaSaveError: selectMetaSaveError(state),
  metaDeleteLoading: selectMetaDeleteLoading(state),
})

const mapDispatchToProps = {
  fetchMeta: metaActions.fetchMetaTry,
  createMeta: metaActions.createMetaTry,
  updateMeta: metaActions.updateMetaTry,
  deleteMeta: metaActions.deleteMetaTry,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(MetaPopup))
