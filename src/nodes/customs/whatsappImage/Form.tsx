import { memo, useMemo, useState } from 'react'
import { WhatsappImageNodeData, WhatsappImageNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import Field from '../../../components/Field'
import DropDown from '../../../components/DropDown'

interface Props {
  node?: WhatsappImageNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data

  // Determine initial selection type based on existing data
  const getInitialSelectionType = () => {
    if (data?.id) return 'id'
    if (data?.link) return 'link'
    return 'id' // default to id
  }

  const [selectionType, setSelectionType] = useState<'id' | 'link'>(getInitialSelectionType())

  const initialValues = useMemo(
    () => ({
      id: data?.id || undefined,
      link: data?.link || undefined,
      caption: data?.caption || undefined,
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappImageNodeData> = (value) => {
    if (!value.id && !value.link) {
      throw new Error('Either Image ID or Link is required')
    }
    return value
  }

  const imageTypeOptions = [
    { value: 'id', label: 'Image ID (recommended)' },
    { value: 'link', label: 'Image Link' },
  ]

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <DropDown
          name="imageType"
          label="Image Type"
          options={imageTypeOptions}
          placeholder="Select image type"
          value={selectionType}
          onChange={(value) => setSelectionType(value as 'id' | 'link')}
        />

        {selectionType === 'id' && (
          <div className="space-y-2">
            <Field name="id" placeholder="Enter WhatsApp image ID" as="input" label="Image ID" disableSuggestion />
          </div>
        )}

        {selectionType === 'link' && (
          <div className="space-y-2">
            <Field name="link" placeholder="Enter WhatsApp image URL" as="input" label="Image Link" disableSuggestion />
          </div>
        )}

        <div className="space-y-2">
          <Field name="caption" placeholder="Enter image caption" as="textarea" label="Caption" />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
