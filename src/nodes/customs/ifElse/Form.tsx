import { memo } from 'react'
import { IF_ELSE_NODE_KEY, IfElseNodeData } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { FieldArray, FormikProps, useFormikContext } from 'formik'
import Button from '../../../components/Button'
import { MdAdd } from 'react-icons/md'
import { NodeRegistryFormProps } from '../../../models/Node.model'

interface SelectorProps {
  index: number
}

const ConditionSelector: React.FC<SelectorProps> = ({ index }) => {
  const { values, setFieldValue } = useFormikContext<IfElseNodeData>()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newConditions = [...values.conditions]
    newConditions[index].condition = e.target.value as IfElseNodeData['conditions'][number]['condition']
    setFieldValue('conditions', newConditions)
  }

  return (
    <select onChange={handleChange} value={values.conditions[index].condition} className="w-full border rounded-md p-1">
      <option value="==">==</option>
      <option value="!=">!=</option>
      <option value=">">{'>'}</option>
      <option value="<">{'<'}</option>
      <option value=">=">{'>='}</option>
      <option value="<=">{'<='}</option>
    </select>
  )
}

const ValueSelector: React.FC<SelectorProps & { name: 'lhs' | 'rhs' }> = ({ index, name }) => {
  const { values, setFieldValue } = useFormikContext<IfElseNodeData>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newConditions = [...values.conditions]
    newConditions[index][name] = e.target.value
    setFieldValue('conditions', newConditions)
  }

  return <input className="w-full border rounded-md p-1" value={values.conditions[index][name]} onChange={handleChange} />
}

const Form: React.FC<NodeRegistryFormProps<typeof IF_ELSE_NODE_KEY>> = ({ node }) => {
  const data = node?.data

  const defaultCondition = {
    lhs: '',
    condition: '==',
    rhs: '',
  } as const

  const initialConditions = [...(data?.conditions || [defaultCondition])]

  const handleTransformNode: TransFormNodeDataOrFail<IfElseNodeData> = (value) => {
    const data = { ...value, conditions: value.conditions }

    //atleast one condition is required
    if (data.conditions.length === 0) {
      throw new Error('At least one condition is required')
    }

    return data
  }

  return (
    <NodeFormContainer initialValues={{ conditions: initialConditions }} transFormNodeDataOrFail={handleTransformNode}>
      <FieldArray name="conditions">
        {({ push, form }: { push: (value: IfElseNodeData['conditions'][number]) => void; form: FormikProps<IfElseNodeData> }) => (
          <div className="flex flex-col gap-6">
            {form.values.conditions.map((_, index) => (
              <div key={index}>
                <p className="text-sm font-medium mb-2 text-gray-500">{index === 0 ? 'If' : 'Else if'}</p>
                <div className="grid grid-cols-2 gap-2">
                  <ValueSelector index={index} name="lhs" />
                  <ConditionSelector index={index} />
                  <ValueSelector index={index} name="rhs" />
                </div>
              </div>
            ))}
            <Button className="w-full flex items-center justify-center" type="button" variant="tertiary" onClick={() => push(defaultCondition)}>
              <MdAdd />
            </Button>
          </div>
        )}
      </FieldArray>
    </NodeFormContainer>
  )
}

export default memo(Form)
