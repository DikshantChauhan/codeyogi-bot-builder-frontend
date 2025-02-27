import { memo, useMemo } from 'react'
import { WhatsappButtonNodeData, WhatsappButtonNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { Field } from 'formik'
import SuggestionField from '../../../components/SuggestionField'
import ListField from '../../../components/ListField'

interface Props {
  node?: WhatsappButtonNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const initialValues = useMemo(
    () => ({
      text: data?.text || '',
      buttons: data?.buttons || [''],
      footer: data?.footer || '',
      header: data?.header || { type: 'text' as const },
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappButtonNodeData> = (value) => {
    if (!value.text || value.buttons.length === 0) {
      throw new Error('Text and at least one button are required')
    }
    if (value.buttons.some((button) => !button)) {
      throw new Error('All buttons must have text')
    }
    return value
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      {({ values }) => (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Header Type</label>
            <Field as="select" name="header.type" className="w-full rounded-md border px-3 py-2">
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </Field>

            {values.header?.type === 'text' && <SuggestionField name="text" placeholder="Enter header text" as="input" />}
          </div>
          <div className="space-y-2">
            <SuggestionField name="text" placeholder="Enter button message text" as="textarea" label="Button message text" />
          </div>

          <ListField
            name="buttons"
            labelGenerator={(index) => `Button ${index + 1}`}
            placeholderGenerator={(index) => `Enter button ${index + 1} text`}
          />

          <div className="space-y-2">
            <SuggestionField name="footer" placeholder="Enter footer text" as="input" label="Footer (optional)" />
          </div>
        </div>
      )}
    </NodeFormContainer>
  )
}

export default memo(Form)
