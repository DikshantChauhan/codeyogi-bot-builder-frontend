import { memo, useMemo } from 'react'
import { WhatsappListNodeData, WhatsappListNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import SuggestionField from '../../../components/SuggestionField'
import ListField from '../../../components/ListField'

interface Props {
  node?: WhatsappListNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const initialValues = useMemo(
    () => ({
      text: data?.text || '',
      buttons: data?.buttons || [''],
      footer: data?.footer || '',
      header: data?.header || '',
      buttonLabel: data?.buttonLabel || '',
      correctIndex: data?.correctIndex || 0,
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappListNodeData> = (value) => {
    if (!value.text || !value.buttons.length || !value.buttonLabel) {
      throw new Error('Text, button label and at least one button are required')
    }
    if (value.buttons.some((button) => !button.trim())) {
      throw new Error('All buttons must have text')
    }
    return value
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      {({ setFieldValue, values }) => (
        <div className="space-y-4">
          <div className="space-y-2">
            <SuggestionField name="header" placeholder="Enter list header" as="input" label="Header (Optional)" />
          </div>
          <div className="space-y-2">
            <SuggestionField name="text" placeholder="Enter list text" as="textarea" label="Text" />
          </div>
          <div className="space-y-2">
            <SuggestionField name="buttonLabel" placeholder="Enter button label" as="input" label="Button Label" />
          </div>
          <div className="space-y-2">
            <SuggestionField name="footer" placeholder="Enter footer text" as="input" label="Footer (Optional)" />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium">Buttons</label>
            <ListField
              name="buttons"
              labelGenerator={(index) => `Button ${index + 1}`}
              placeholderGenerator={(index) => `Enter button ${index + 1} text`}
              characterLimit={24}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="correctIndex" className="text-sm font-medium">
              Correct option
            </label>
            <select
              id="correctIndex"
              name="correctIndex"
              onChange={(e) => setFieldValue('correctIndex', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={values.correctIndex}
            >
              {values.buttons.map((_, index) => (
                <option key={index} value={index}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </NodeFormContainer>
  )
}

export default memo(Form)
