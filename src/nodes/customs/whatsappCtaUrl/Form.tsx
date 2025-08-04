import { memo, useMemo } from 'react'
import { WhatsappCtaUrlNodeData, WhatsappCtaUrlNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import Field from '../../../components/Field'
import NodeHeaderForm from '../../../components/NodeHeaderForm'

interface Props {
  node?: WhatsappCtaUrlNodeType
}

const Form = ({ node }: Props) => {
  const data = node?.data

  const initialValues: WhatsappCtaUrlNodeData = useMemo(
    () => ({
      bodyText: data?.bodyText || '',
      buttonText: data?.buttonText || '',
      buttonUrl: data?.buttonUrl || '',
      footerText: data?.footerText || '',
      header: data?.header,
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappCtaUrlNodeData> = (value) => {
    // Validation
    if (!value.bodyText?.trim()) {
      throw new Error('Body text is required')
    }

    if (!value.buttonText?.trim()) {
      throw new Error('Button text is required')
    }

    if (!value.buttonUrl?.trim()) {
      throw new Error('Button URL is required')
    }

    if (value.header?.type) {
      //validate if hader.type is text and header.text is not provided
      if (value.header?.type === 'text' && !value.header?.text) {
        throw new Error('Header text is required')
      }

      //validate if hader.type is not text and header.media.wa_media_url is not provided
      if (value.header?.type !== 'text' && !value.header?.media?.wa_media_url) {
        throw new Error('Header media URL is required')
      }
    }

    return value
  }

  const Info = useMemo(() => {
    return (
      <div>
        <img src="/public/assets/wa_cta_url_info.png" alt="whatsapp-cta-url" />
      </div>
    )
  }, [])

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={Info}>
      {({ values, setFieldValue }) => (
        <div className="space-y-4">
          <NodeHeaderForm setFieldValue={setFieldValue} header={values.header} />

          <div className="space-y-2">
            <Field name="bodyText" placeholder="Enter body text (max 1024 characters)" as="textarea" label="Body Text *" characterLimit={1024} />
          </div>

          <div className="space-y-2">
            <Field name="buttonText" placeholder="Enter button text (max 20 characters)" as="input" label="Button Text *" characterLimit={20} />
          </div>

          <div className="space-y-2">
            <Field name="buttonUrl" placeholder="Enter button URL" as="input" label="Button URL *" disableSuggestion />
          </div>

          <div className="space-y-2">
            <Field name="footerText" placeholder="Enter footer text (max 60 characters)" as="input" label="Footer Text" characterLimit={60} />
          </div>
        </div>
      )}
    </NodeFormContainer>
  )
}

export default memo(Form)
