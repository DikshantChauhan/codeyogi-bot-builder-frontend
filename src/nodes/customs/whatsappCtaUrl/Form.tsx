import { memo, useMemo, useState } from 'react'
import { WhatsappCtaUrlNodeData, WhatsappCtaUrlNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import Field from '../../../components/Field'
import DropDown from '../../../components/DropDown'
import { MessageHeader } from '../../../models/Node.model'

interface Props {
  node?: WhatsappCtaUrlNodeType
}

type MediaType = keyof Pick<MessageHeader, 'image' | 'video' | 'document'>
type SelectionType = 'id' | 'link'

// Utility type for form state
type FormData = {
  bodyText: string
  buttonText: string
  buttonUrl: string
  footerText: string
  header: {
    type: MessageHeader['type']
    text: string
    imageId: string
    imageLink: string
    videoId: string
    videoLink: string
    documentId: string
    documentLink: string
  }
}

// Utility functions
const getMediaValue = (media: { id: string } | { link: string } | undefined, type: 'id' | 'link'): string => {
  if (!media) return ''
  if (type === 'id' && 'id' in media) return media.id
  if (type === 'link' && 'link' in media) return media.link
  return ''
}

const getInitialSelectionType = (media: { id: string } | { link: string } | undefined): SelectionType => {
  if (media && 'id' in media && media.id) return 'id'
  if (media && 'link' in media && media.link) return 'link'
  return 'id'
}

const createMediaObject = (id: string, link: string): { id: string } | { link: string } | undefined => {
  if (id) return { id }
  if (link) return { link }
  return undefined
}

const Form = ({ node }: Props) => {
  const data = node?.data

  // Initialize selection states
  const [selections, setSelections] = useState<Record<MediaType, SelectionType>>({
    image: getInitialSelectionType(data?.header?.image),
    video: getInitialSelectionType(data?.header?.video),
    document: getInitialSelectionType(data?.header?.document),
  })

  const updateSelection = (mediaType: MediaType, selection: SelectionType) => {
    setSelections((prev) => ({ ...prev, [mediaType]: selection }))
  }

  const initialValues = useMemo(
    (): FormData => ({
      bodyText: data?.bodyText || '',
      buttonText: data?.buttonText || '',
      buttonUrl: data?.buttonUrl || '',
      footerText: data?.footerText || '',
      header: {
        type: data?.header?.type || 'text',
        text: data?.header?.text || '',
        imageId: getMediaValue(data?.header?.image, 'id'),
        imageLink: getMediaValue(data?.header?.image, 'link'),
        videoId: getMediaValue(data?.header?.video, 'id'),
        videoLink: getMediaValue(data?.header?.video, 'link'),
        documentId: getMediaValue(data?.header?.document, 'id'),
        documentLink: getMediaValue(data?.header?.document, 'link'),
      },
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<FormData> = (value) => {
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

    // Character limit validations
    if (value.bodyText.length > 1024) {
      throw new Error('Body text must be 1024 characters or less')
    }
    if (value.buttonText.length > 20) {
      throw new Error('Button text must be 20 characters or less')
    }
    if (value.footerText && value.footerText.length > 60) {
      throw new Error('Footer text must be 60 characters or less')
    }

    // Header validation
    if (value.header?.type === 'text' && !value.header.text?.trim()) {
      throw new Error('Header text is required when header type is text')
    }

    const mediaValidations: Record<MediaType, { idField: keyof FormData['header']; linkField: keyof FormData['header'] }> = {
      image: { idField: 'imageId', linkField: 'imageLink' },
      video: { idField: 'videoId', linkField: 'videoLink' },
      document: { idField: 'documentId', linkField: 'documentLink' },
    }

    const currentMediaType = value.header?.type
    if (currentMediaType && currentMediaType !== 'text') {
      const mediaType = currentMediaType as MediaType
      const { idField, linkField } = mediaValidations[mediaType]
      const hasId = value.header[idField]?.trim()
      const hasLink = value.header[linkField]?.trim()

      if (!hasId && !hasLink) {
        throw new Error(`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} ID or Link is required`)
      }
    }

    // Transform to WhatsappCtaUrlNodeData
    const header: MessageHeader = { type: value.header?.type || 'text' }

    if (value.header?.type === 'text') {
      header.text = value.header.text.trim()
    } else if (value.header?.type) {
      const mediaType = currentMediaType as MediaType
      const mediaObject = createMediaObject(
        value.header[`${mediaType}Id` as keyof FormData['header']] as string,
        value.header[`${mediaType}Link` as keyof FormData['header']] as string
      )
      if (mediaObject) {
        header[mediaType] = mediaObject
      }
    }

    const result: WhatsappCtaUrlNodeData = {
      header,
      bodyText: value.bodyText.trim(),
      buttonText: value.buttonText.trim(),
      buttonUrl: value.buttonUrl.trim(),
      footerText: value.footerText?.trim() || undefined,
    }

    return result
  }

  const renderMediaField = (mediaType: MediaType, label: string) => {
    const selection = selections[mediaType]
    const options = [
      { value: 'id', label: `${label} ID (recommended)` },
      { value: 'link', label: `${label} Link` },
    ]

    return (
      <div className="space-y-4">
        <DropDown
          name={`${mediaType}Type`}
          label={`${label} Type`}
          options={options}
          placeholder="Select type"
          value={selection}
          onChange={(value) => updateSelection(mediaType, value as SelectionType)}
        />

        {selection === 'id' && (
          <Field name={`header.${mediaType}Id`} placeholder={`Enter WhatsApp ${mediaType} ID`} as="input" label={`${label} ID`} disableSuggestion />
        )}

        {selection === 'link' && (
          <Field
            name={`header.${mediaType}Link`}
            placeholder={`Enter WhatsApp ${mediaType} URL`}
            as="input"
            label={`${label} Link`}
            disableSuggestion
          />
        )}
      </div>
    )
  }

  return (
    <NodeFormContainer<FormData> initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      {({ values }) => (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Header Type</label>
            <DropDown
              name="header.type"
              label="Header Type"
              options={[
                { value: 'text', label: 'Text' },
                { value: 'image', label: 'Image' },
                { value: 'video', label: 'Video' },
                { value: 'document', label: 'Document' },
              ]}
              placeholder="Select header type"
              value={values.header?.type || 'text'}
              onChange={() => {}}
            />

            {values.header?.type === 'text' && (
              <Field name="header.text" placeholder="Enter header text" as="input" label="Header Text" characterLimit={60} />
            )}
            {values.header?.type === 'image' && renderMediaField('image', 'Image')}
            {values.header?.type === 'video' && renderMediaField('video', 'Video')}
            {values.header?.type === 'document' && renderMediaField('document', 'Document')}
          </div>

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
