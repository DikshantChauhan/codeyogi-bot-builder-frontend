import { memo } from 'react'
import { IfElseNodeData, IfElseNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { FieldArray, FormikProps, useFormikContext } from 'formik'
import Button from '../../../components/Button'
import { VARIABLE_NAMES } from '../../../constants'
import { MdAdd } from 'react-icons/md'

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

const VariableSelector: React.FC<SelectorProps & { name: 'variable' | 'value' }> = ({ index, name }) => {
  const { values, setFieldValue } = useFormikContext<IfElseNodeData>()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newConditions = [...values.conditions]
    newConditions[index][name] = e.target.value
    setFieldValue('conditions', newConditions)
  }

  return (
    <select onChange={handleChange} value={values.conditions[index][name]} className="w-full border rounded-md p-1">
      {VARIABLE_NAMES.map((variable) => (
        <option key={variable} value={variable}>
          {variable}
        </option>
      ))}
    </select>
  )
}

const TypeSelector: React.FC<SelectorProps> = ({ index }) => {
  const { values, setFieldValue } = useFormikContext<IfElseNodeData>()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newConditions = [...values.conditions]
    newConditions[index].type = e.target.value as IfElseNodeData['conditions'][number]['type']
    setFieldValue('conditions', newConditions)
  }
  return (
    <select onChange={handleChange} value={values.conditions[index].type} className="w-full border rounded-md p-1">
      <option value="string">String</option>
      <option value="number">Number</option>
      <option value="boolean">Boolean</option>
      <option value="variable">Variable</option>
      <option value="null">Null</option>
    </select>
  )
}

const ValueSelector: React.FC<SelectorProps> = ({ index }) => {
  const { values, setFieldValue } = useFormikContext<IfElseNodeData>()
  const type = values.conditions[index].type

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newConditions = [...values.conditions]
    newConditions[index].value = e.target.value
    setFieldValue('conditions', newConditions)
  }

  if (type === 'variable') {
    return <VariableSelector index={index} name="value" />
  }

  if (type === 'string' || type === 'number') {
    return (
      <input
        className="w-full border rounded-md p-1"
        type={type === 'number' ? 'number' : 'text'}
        value={values.conditions[index].value}
        onChange={handleChange}
      />
    )
  }

  if (type === 'boolean') {
    return (
      <select onChange={handleChange} value={values.conditions[index].value} className="w-full border rounded-md p-1">
        <option value="">Select</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    )
  }

  if (type === 'null') {
    return <></>
  }
}

interface Props {
  node?: IfElseNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data

  const defaultCondition = {
    variable: VARIABLE_NAMES[0],
    condition: '==',
    type: 'string',
    value: '',
  } as const

  const initialConditions = [...(data?.conditions || [defaultCondition])]

  const handleTransformNode: TransFormNodeDataOrFail<IfElseNodeData> = (value) => {
    const data = { ...value, conditions: value.conditions }

    // TODO: validate conditions

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
                  <VariableSelector index={index} name="variable" />
                  <ConditionSelector index={index} />
                  <TypeSelector index={index} />
                  <ValueSelector index={index} />
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
