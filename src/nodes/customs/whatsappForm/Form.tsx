import { memo } from 'react'
import { FormField, WhatsappFormNodeData, WhatsappFormNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import SuggestionField from '../../../components/SuggestionField'
import ListField from '../../../components/ListField'
import { Field, useFormikContext } from 'formik'

interface Props {
  node?: WhatsappFormNodeType
}

const FIELD_TYPES = ['text', 'number', 'email', 'phone', 'date'] as const

const FieldControls = ({ index }: { index: number }) => {
  const { values } = useFormikContext<WhatsappFormNodeData>()
  const field = values.fields[index]

  return (
    <div className="flex gap-4 p-3 border rounded-md">
      <Field as="select" name={`fields.${index}.type`} className="rounded-md border px-3 py-2">
        {FIELD_TYPES.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </Field>
      <label className="flex items-center gap-2">
        <Field type="checkbox" name={`fields.${index}.required`} className="rounded border-gray-300" />
        <span className="text-sm">Required</span>
      </label>
    </div>
  )
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const initialValues: WhatsappFormNodeData = {
    title: data?.title || '',
    description: data?.description || '',
    fields: data?.fields || [{ label: '', type: 'text', required: false }],
  }

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappFormNodeData> = (value) => {
    if (!value.title || !value.description || value.fields.length === 0) {
      throw new Error('Title, description and at least one field are required')
    }
    if (value.fields.some((field) => !field.label)) {
      throw new Error('All fields must have a label')
    }
    return value
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      {({ values }) => (
        <div className="space-y-4">
          <SuggestionField name="title" placeholder="Enter form title" as="input" label="Form Title" />
          <SuggestionField name="description" placeholder="Enter form description" as="textarea" rows={3} label="Description" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Form Fields</label>
            </div>
            <ListField
              name="fields"
              labelGenerator={(index) => `Field ${index + 1}`}
              placeholderGenerator={(index) => `Enter field ${index + 1} label`}
            />
            {/* Field type and required controls */}
            <div className="space-y-2">
              {values.fields.map((_, index) => (
                <FieldControls key={index} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </NodeFormContainer>
  )
}

export default memo(Form)
