import { memo } from 'react'
import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from 'formik'
import Button from './Button'
import { AppNode } from '../models/Node.model'
import useNodeFormContainerData from '../hooks/useNodeFormContainerData'
import NodeSubFlowForm from './NodeSubFlowForm'
import InfoCard from './InfoCard'
import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa'

interface FormProps<T extends FormikValues> {
  initialValues: T
  transFormNodeDataOrFail: TransFormNodeDataOrFail<T>
  children: React.ReactNode | ((props: FormikProps<T>) => React.ReactNode)
  info?: string
}

export type TransFormNodeDataOrFail<S extends FormikValues> = (values: S, formikHelpers: FormikHelpers<S>) => AppNode['data']

const FormContainer = <T extends FormikValues>({ transFormNodeDataOrFail, children, initialValues, info }: FormProps<T>) => {
  const { selectedNode, handleSubmit, type, slectedFlow, selectedNudge, setSelectedNudge, orientaion, setOrientation } =
    useNodeFormContainerData(transFormNodeDataOrFail)

  if (!type) return <div>No node to add</div>

  return (
    <>
      <Formik<T> initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {(formikProps) => (
          <Form className="flex flex-col flex-1 max-h-full gap-3 p-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{type}</h2>
              {info && <InfoCard position="bottom" info={info} />}
              {true && (
                <button
                  type="button"
                  onClick={() => {
                    setOrientation(orientaion === 'horizontal' ? 'vertical' : 'horizontal')
                  }}
                  className="text-primary-500"
                >
                  {orientaion === 'horizontal' ? <FaArrowsAltH /> : <FaArrowsAltV />}
                </button>
              )}
            </div>
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
