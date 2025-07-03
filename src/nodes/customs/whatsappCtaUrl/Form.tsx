import { memo, useMemo, useState } from 'react'
import { WhatsappCtaUrlNodeData, WhatsappCtaUrlNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import Field from '../../../components/Field'
import DropDown from '../../../components/DropDown'

interface Props {
  node?: WhatsappCtaUrlNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data

  const [headerType, setHeaderType] = useState<'text' | 'image' | 'video' | 'document' | 'none'>(data?.headerType || 'none')

  const initialValues = useMemo(
    () => ({
      headerType: data?.headerType || 'none',
      headerText: data?.headerText || '',
      headerImageLink: data?.headerImageLink || '',
      headerVideoLink: data?.headerVideoLink || '',
      headerDocumentLink: data?.headerDocumentLink || '',
      bodyText: data?.bodyText || '',
      buttonText: data?.buttonText || '',
      buttonUrl: data?.buttonUrl || '',
      footerText: data?.footerText || '',
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappCtaUrlNodeData> = (value) => {
    if (!value.bodyText?.trim()) {
      throw new Error('Body text is required')
    }
    if (!value.buttonText?.trim()) {
      throw new Error('Button text is required')
    }
    if (!value.buttonUrl?.trim()) {
      throw new Error('Button URL is required')
    }

    // Validate header requirements based on type
    if (headerType === 'text' && !value.headerText?.trim()) {
      throw new Error('Header text is required when using text header')
    }
    if (headerType === 'image' && !value.headerImageLink?.trim()) {
      throw new Error('Header image link is required when using image header')
    }
    if (headerType === 'video' && !value.headerVideoLink?.trim()) {
      throw new Error('Header video link is required when using video header')
    }
    if (headerType === 'document' && !value.headerDocumentLink?.trim()) {
      throw new Error('Header document link is required when using document header')
    }

    // Validate character limits
    if (value.bodyText.length > 1024) {
      throw new Error('Body text must be 1024 characters or less')
    }
    if (value.buttonText.length > 20) {
      throw new Error('Button text must be 20 characters or less')
    }
    if (value.headerText && value.headerText.length > 60) {
      throw new Error('Header text must be 60 characters or less')
    }
    if (value.footerText && value.footerText.length > 60) {
      throw new Error('Footer text must be 60 characters or less')
    }

    return value
  }

  const headerTypeOptions = [
    { value: 'none', label: 'No Header' },
    { value: 'text', label: 'Text Header' },
    { value: 'image', label: 'Image Header' },
    { value: 'video', label: 'Video Header' },
    { value: 'document', label: 'Document Header' },
  ]

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <DropDown
          name="headerType"
          label="Header Type"
          options={headerTypeOptions}
          placeholder="Select header type"
          value={headerType}
          onChange={(value) => setHeaderType(value as 'text' | 'image' | 'video' | 'document' | 'none')}
        />

        {headerType === 'text' && (
          <div className="space-y-2">
            <Field name="headerText" placeholder="Enter header text (max 60 characters)" as="input" label="Header Text" characterLimit={60} />
          </div>
        )}

        {headerType === 'image' && (
          <div className="space-y-2">
            <Field name="headerImageLink" placeholder="Enter image URL" as="input" label="Header Image Link" disableSuggestion />
          </div>
        )}

        {headerType === 'video' && (
          <div className="space-y-2">
            <Field name="headerVideoLink" placeholder="Enter video URL" as="input" label="Header Video Link" disableSuggestion />
          </div>
        )}

        {headerType === 'document' && (
          <div className="space-y-2">
            <Field name="headerDocumentLink" placeholder="Enter document URL" as="input" label="Header Document Link" disableSuggestion />
          </div>
        )}

        <div className="space-y-2">
          <Field name="bodyText" placeholder="Enter body text (max 1024 characters)" as="textarea" label="Body Text *" characterLimit={1024} />
        </div>

        <div className="space-y-2">
          <Field name="buttonText" placeholder="Enter button text (max 20 characters)" as="input" label="Button Text *" characterLimit={20} />
        </div>

        <div className="space-y-2">
          <Field name="buttonUrl" placeholder="Enter button URL" as="input" label="Button URL *" disableSuggestion characterLimit={20} />
        </div>

        <div className="space-y-2">
          <Field name="footerText" placeholder="Enter footer text (max 60 characters)" as="input" label="Footer Text" characterLimit={60} />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
