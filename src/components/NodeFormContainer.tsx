import { memo } from 'react'
import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from 'formik'
import Button from './Button'
import { AppNode } from '../models/Node.model'
import useNodeFormContainerData from '../hooks/useNodeFormContainerData'
import NodeSubFlowForm from './NodeSubFlowForm'



interface FormProps<T extends FormikValues> {
  initialValues: T
  transFormNodeDataOrFail: TransFormNodeDataOrFail<T>
  children: React.ReactNode | ((props: FormikProps<T>) => React.ReactNode)
}

export type TransFormNodeDataOrFail<S extends FormikValues> = (values: S, formikHelpers: FormikHelpers<S>) => AppNode['data']

const FormContainer = <T extends FormikValues>({ transFormNodeDataOrFail, children, initialValues }: FormProps<T>) => {
  const { selectedNode, handleSubmit, type, slectedFlow, selectedNudge, setSelectedNudge } = useNodeFormContainerData(transFormNodeDataOrFail)

  if (!type) return <div>No node to add</div>

  return (
    <>
      <Formik<T> initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {(formikProps) => (
          <Form className="flex flex-col flex-1 max-h-full gap-3">
            <h2 className="text-xl font-bold">{type}</h2>

            <div className="flex-1 overflow-auto">{typeof children === 'function' ? children(formikProps) : children}</div>

            {slectedFlow?.type === 'level' && <NodeSubFlowForm selectedNudge={selectedNudge} setSelectedNudge={setSelectedNudge} />}

            <div>
              <Button type="submit" className="w-full" variant="secondary">
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
