import { memo, useMemo, useState } from 'react'
import { WhatsappButtonNodeData, WhatsappButtonNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { Field } from 'formik'
import SuggestionField from '../../../components/Field'
import ListField from '../../../components/ListField'
import DropDown from '../../../components/DropDown'

interface Props {
  node?: WhatsappButtonNodeType
}

type MediaType = 'image' | 'video' | 'document'

type SelectionType = 'id' | 'link'

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data

  // Helper to get initial selection for a media type
  const getInitialSelectionType = (mediaType: MediaType) => {
    const media = data?.header?.[mediaType]
    if (media?.id) return 'id'
    if (media?.link) return 'link'
    return 'id'
  }

  const [imageSelection, setImageSelection] = useState<SelectionType>(getInitialSelectionType('image'))
  const [videoSelection, setVideoSelection] = useState<SelectionType>(getInitialSelectionType('video'))
  const [documentSelection, setDocumentSelection] = useState<SelectionType>(getInitialSelectionType('document'))

  const initialValues = useMemo(
    () => ({
      text: data?.text || '',
      buttons: data?.buttons || [''],
      footer: data?.footer || '',
      header: {
        type: data?.header?.type || 'text',
        text: data?.header?.text || '',
        image: data?.header?.image || { id: undefined, link: undefined },
        video: data?.header?.video || { id: undefined, link: undefined },
        document: data?.header?.document || { id: undefined, link: undefined },
      },
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
    if (value.buttons.some((button, index) => value.buttons.indexOf(button) !== index)) {
      throw new Error('All buttons must be unique')
    }
    if (value.header?.type === 'text' && !value.header.text) {
      throw new Error('Header text is required when header type is text')
    }
    if (value.header?.type === 'image' && !value.header.image?.id && !value.header.image?.link) {
      throw new Error('Image ID or Link is required when header type is image')
    }
    if (value.header?.type === 'video' && !value.header.video?.id && !value.header.video?.link) {
      throw new Error('Video ID or Link is required when header type is video')
    }
    if (value.header?.type === 'document' && !value.header.document?.id && !value.header.document?.link) {
      throw new Error('Document ID or Link is required when header type is document')
    }

    // Create clean header data with only the required fields
    if (value.header) {
      const cleanHeader: any = { type: value.header.type }

      if (value.header.type === 'text') {
        cleanHeader.text = value.header.text
      } else {
        const mediaData = value.header[value.header.type]
        if (mediaData?.id) {
          cleanHeader[value.header.type] = { id: mediaData.id }
        } else if (mediaData?.link) {
          cleanHeader[value.header.type] = { link: mediaData.link }
        }
      }

      value.header = cleanHeader
    }

    return value
  }

  const renderMediaField = (mediaType: MediaType, selection: SelectionType, setSelection: (val: SelectionType) => void, label: string) => {
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
          onChange={(value) => setSelection(value as SelectionType)}
        />

        {selection === 'id' && (
          <SuggestionField
            name={`header.${mediaType}.id`}
            placeholder={`Enter WhatsApp ${mediaType} ID`}
            as="input"
            label={`${label} ID`}
            disableSuggestion
          />
        )}

        {selection === 'link' && (
          <SuggestionField
            name={`header.${mediaType}.link`}
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

            {values.header?.type === 'text' && (
              <SuggestionField name="header.text" placeholder="Enter header text" as="input" label="Header Text" characterLimit={60} />
            )}
            {values.header?.type === 'image' && renderMediaField('image', imageSelection, setImageSelection, 'Image')}
            {values.header?.type === 'video' && renderMediaField('video', videoSelection, setVideoSelection, 'Video')}
            {values.header?.type === 'document' && renderMediaField('document', documentSelection, setDocumentSelection, 'Document')}
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
