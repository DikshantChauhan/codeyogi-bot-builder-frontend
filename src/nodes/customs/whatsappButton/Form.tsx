import { memo, useMemo, useState } from 'react'
import { WhatsappButtonNodeData, WhatsappButtonNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { Field } from 'formik'
import SuggestionField from '../../../components/Field'
import ListField from '../../../components/ListField'
import DropDown from '../../../components/DropDown'
import { MessageHeader } from '../../../models/Node.model'

interface Props {
  node?: WhatsappButtonNodeType
}

type MediaType = keyof Pick<MessageHeader, 'image' | 'video' | 'document'>
type SelectionType = 'id' | 'link'

// Utility type for form state
type FormData = {
  text: string
  buttons: string[]
  footer: string
  header: {
    type: MessageHeader['type'] | ''
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
      text: data?.text || '',
      buttons: data?.buttons || [''],
      footer: data?.footer || '',
      header: {
        type: data?.header?.type || '',
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

    // Header validation - only validate if header type is selected and not 'text'
    if (value.header?.type && value.header.type !== 'text') {
      const mediaValidations: Record<MediaType, { idField: keyof FormData['header']; linkField: keyof FormData['header'] }> = {
        image: { idField: 'imageId', linkField: 'imageLink' },
        video: { idField: 'videoId', linkField: 'videoLink' },
        document: { idField: 'documentId', linkField: 'documentLink' },
      }

      const currentMediaType = value.header.type as MediaType
      const { idField, linkField } = mediaValidations[currentMediaType]
      const hasId = value.header[idField]?.trim()
      const hasLink = value.header[linkField]?.trim()

      if (!hasId && !hasLink) {
        throw new Error(`${currentMediaType.charAt(0).toUpperCase() + currentMediaType.slice(1)} ID or Link is required`)
      }
    }

    // Header validation for text type
    if (value.header?.type === 'text' && !value.header.text?.trim()) {
      throw new Error('Header text is required when header type is text')
    }

    // Transform to WhatsappButtonNodeData
    const result: WhatsappButtonNodeData = {
      text: value.text.trim(),
      buttons: value.buttons.map((btn) => btn.trim()).filter(Boolean),
      footer: value.footer?.trim() || undefined,
    }

    // Only add header if it has a valid type and content
    if (value.header?.type) {
      const header: MessageHeader = { type: value.header.type }

      if (value.header.type === 'text' && value.header.text?.trim()) {
        header.text = value.header.text.trim()
        result.header = header
      } else if (value.header.type !== 'text') {
        const mediaType = value.header.type as MediaType
        const mediaObject = createMediaObject(
          value.header[`${mediaType}Id` as keyof FormData['header']] as string,
          value.header[`${mediaType}Link` as keyof FormData['header']] as string
        )
        if (mediaObject) {
          header[mediaType] = mediaObject
          result.header = header
        }
      }
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
          <SuggestionField
            name={`header.${mediaType}Id`}
            placeholder={`Enter WhatsApp ${mediaType} ID`}
            as="input"
            label={`${label} ID`}
            disableSuggestion
          />
        )}

        {selection === 'link' && (
          <SuggestionField
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

  const Info = useMemo(() => {
    return (
      <div>
        <img src="/public/assets/wa_button_info.png" alt="whatsapp-button" />
      </div>
    )
  }, [])

  return (
    <NodeFormContainer<FormData> initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={Info}>
      {({ values }) => (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Header Type</label>
            <Field as="select" name="header.type" className="w-full rounded-md border px-3 py-2">
              <option value="">No Header</option>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </Field>

            {values.header?.type === 'text' && (
              <SuggestionField name="header.text" placeholder="Enter header text" as="input" label="Header Text" characterLimit={60} />
            )}
            {values.header?.type === 'image' && renderMediaField('image', 'Image')}
            {values.header?.type === 'video' && renderMediaField('video', 'Video')}
            {values.header?.type === 'document' && renderMediaField('document', 'Document')}
          </div>

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
