import { memo, useCallback } from 'react'
import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from 'formik'
import { AppNode } from '../nodes'
import useNodeChange from '../hooks/useAddNode'
import Button from './Button'
import { toast } from 'react-toastify'

export type TransFormToNode<S> = (values: S, formikHelpers: FormikHelpers<S>) => Omit<AppNode, 'position' | 'dragHandle'> | string

interface FormProps<T extends FormikValues> {
  data: T
  transformToNode: TransFormToNode<T>
  title: string
  children: React.ReactNode | ((props: FormikProps<T>) => React.ReactNode)
  updating: boolean
}

const FormContainer = <T extends FormikValues>({ data, transformToNode, title, children, updating }: FormProps<T>) => {
  const { changeNode } = useNodeChange()

  const handleSubmit = useCallback(
    (values: T, formikHelpers: FormikHelpers<T>) => {
      const node = transformToNode(values, formikHelpers)
      if (typeof node === 'string') {
        toast.error(node)
      } else {
        changeNode(node, updating ? 'edit' : 'add', true)
      }
    },
    [updating, transformToNode, changeNode]
  )
  return (
    <Formik<T> initialValues={data} onSubmit={handleSubmit} enableReinitialize>
      {(formikProps) => (
        <Form className="space-y-4">
          <h2 className="text-xl font-bold">{title}</h2>

          {typeof children === 'function' ? children(formikProps) : children}

          <div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
              {updating ? 'Update' : 'Add'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default memo(FormContainer) as typeof FormContainer
