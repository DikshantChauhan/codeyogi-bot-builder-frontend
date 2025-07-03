import { memo, useMemo, useState } from 'react'
import { WhatsappDocumentNodeData, WhatsappDocumentNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import Field from '../../../components/Field'
import DropDown from '../../../components/DropDown'

interface Props {
  node?: WhatsappDocumentNodeType
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
      filename: data?.filename || undefined,
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappDocumentNodeData> = (value) => {
    if (!value.id && !value.link) {
      throw new Error('Either Document ID or Link is required')
    }
    return value
  }

  const documentTypeOptions = [
    { value: 'id', label: 'Document ID (recommended)' },
    { value: 'link', label: 'Document Link' },
  ]

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="space-y-4">
        <DropDown
          name="documentType"
          label="Document Type"
          options={documentTypeOptions}
          placeholder="Select document type"
          value={selectionType}
          onChange={(value) => setSelectionType(value as 'id' | 'link')}
        />

        {selectionType === 'id' && (
          <div className="space-y-2">
            <Field name="id" placeholder="Enter WhatsApp document ID" as="input" label="Document ID" disableSuggestion />
          </div>
        )}

        {selectionType === 'link' && (
          <div className="space-y-2">
            <Field name="link" placeholder="Enter WhatsApp document URL" as="input" label="Document Link" disableSuggestion />
          </div>
        )}

        <div className="space-y-2">
          <Field name="caption" placeholder="Enter document caption" as="textarea" label="Caption" />
        </div>
        <div className="space-y-2">
          <Field name="filename" disableSuggestion placeholder="Enter document filename" as="input" label="Filename" />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
