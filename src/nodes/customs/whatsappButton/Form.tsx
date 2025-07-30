import { memo, useMemo } from 'react'
import { WhatsappButtonNodeData, WhatsappButtonNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import SuggestionField from '../../../components/Field'
import ListField from '../../../components/ListField'
import NodeHeaderForm from '../../../components/NodeHeaderForm'

interface Props {
  node?: WhatsappButtonNodeType
}

const Form = ({ node }: Props) => {
  const data = node?.data

  const initialValues: WhatsappButtonNodeData = useMemo(
    () => ({
      text: data?.text || '',
      buttons: data?.buttons || [''],
      footer: data?.footer || '',
      header: data?.header,
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappButtonNodeData> = (value) => {
    // Validation
    if (!value.text?.trim()) {
      throw new Error('Text is required')
    }

    if (!value.buttons?.length || value.buttons.every((btn) => !btn?.trim())) {
      throw new Error('At least one button is required')
    }

    if (value.buttons.some((btn) => !btn?.trim())) {
      throw new Error('All buttons must have text')
    }

    const uniqueButtons = new Set(value.buttons.filter((btn) => btn?.trim()))
    if (uniqueButtons.size !== value.buttons.length) {
      throw new Error('All buttons must be unique')
    }

    if (value.header?.type) {
      //validate if hader.type is text and header.text is not provided
      if (value.header?.type === 'text' && !value.header?.text) {
        throw new Error('Header text is required')
      }

      //validate if hader.type is not text and header.media.wa_media_url is not provided
      if (value.header?.type !== 'text' && (!value.header?.media?.wa_media_url || !value.header?.media?.wa_media_id)) {
        throw new Error('Header media URL and ID is required')
      }
    }

    return value
  }

  const Info = useMemo(() => {
    return (
      <div>
        <img src="/public/assets/wa_button_info.png" alt="whatsapp-button" />
      </div>
    )
  }, [])

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={Info}>
      {({ values, setFieldValue }) => (
        <div className="space-y-4">
          <NodeHeaderForm type={values.header?.type} setFieldValue={setFieldValue} />

          <div className="space-y-2">
            <SuggestionField name="text" placeholder="Enter button message text" as="textarea" label="Button message text" characterLimit={1024} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Buttons</label>
              <span className="text-xs text-gray-500">{values.buttons?.length || 0}/3 buttons</span>
            </div>
            <ListField
              name="buttons"
              labelGenerator={(index) => `Button ${index + 1}`}
              placeholderGenerator={(index) => `Enter button ${index + 1} text`}
              characterLimit={20}
              maxItems={3}
            />
          </div>

          <div className="space-y-2">
            <SuggestionField name="footer" placeholder="Enter footer text" as="input" label="Footer (optional)" characterLimit={60} />
          </div>
        </div>
      )}
    </NodeFormContainer>
  )
}

export default memo(Form)
