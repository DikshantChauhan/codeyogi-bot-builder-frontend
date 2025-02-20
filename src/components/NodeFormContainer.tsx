import { memo } from 'react'
import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from 'formik'
import Button from './Button'
import { AppNode } from '../models/Node.model'
import useNodeFormContainerData from '../hooks/useNodeFormContainerData'
import NodeSubFlowForm from './NodeSubFlowForm'

export type TransFormNodeDataOrFail<S extends FormikValues> = (values: S, formikHelpers: FormikHelpers<S>) => AppNode['data']

interface FormProps<T extends FormikValues> {
  initialValues: T
  transFormNodeDataOrFail: TransFormNodeDataOrFail<T>
  children: React.ReactNode | ((props: FormikProps<T>) => React.ReactNode)
}

const FormContainer = <T extends FormikValues>({ transFormNodeDataOrFail, children, initialValues }: FormProps<T>) => {
  const { selectedNode, handleSubmit, type, slectedFlow } = useNodeFormContainerData(transFormNodeDataOrFail)

  if (!type) return <div>No node to add</div>

  return (
    <>
      <Formik<T> initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {(formikProps) => (
          <Form className="space-y-4 max-h-full overflow-y-auto">
            <h2 className="text-xl font-bold">{type}</h2>

            {typeof children === 'function' ? children(formikProps) : children}

            {slectedFlow?.type === 'level' && <NodeSubFlowForm nudgeSelectorName="nudge" />}

            <div>
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                {selectedNode ? 'Update' : 'Add'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default memo(FormContainer) as typeof FormContainer
