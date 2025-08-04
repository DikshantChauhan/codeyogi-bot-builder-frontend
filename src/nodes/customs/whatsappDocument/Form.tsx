import { memo, useMemo } from 'react'
import { WhatsappDocumentNodeData, WhatsappDocumentNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import Field from '../../../components/Field'
import MediaUploadField from '../../../components/MediaUploadField'

interface Props {
  node?: WhatsappDocumentNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data

  const initialValues: WhatsappDocumentNodeData = useMemo(
    () => ({
      media: data?.media || { wa_media_id: '', wa_media_url: '' },
      caption: data?.caption || undefined,
      filename: data?.filename || undefined,
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappDocumentNodeData> = (value) => {
    if (!value.media.wa_media_url || !value.media.wa_media_id) {
      throw new Error('Document URL and ID is required')
    }
    return value
  }

  const Info = useMemo(() => {
    return (
      <div>
        <img src="/public/assets/wa_document_info.png" alt="whatsapp-document" />
      </div>
    )
  }, [])

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={Info}>
      {({ values, setFieldValue }) => (
        <div className="space-y-4">
          <div className="space-y-2">
            <Field name="caption" placeholder="Enter document caption" as="textarea" label="Caption" />
          </div>
          <div className="space-y-2">
            <Field name="filename" disableSuggestion placeholder="Enter document filename" as="input" label="Filename" />
          </div>
          <MediaUploadField
            mediaType="document"
            mediaId={values.media?.wa_media_id || ''}
            mediaUrl={values.media?.wa_media_url || ''}
            onMediaChange={(mediaId, mediaUrl) => {
              setFieldValue('media.wa_media_id', mediaId)
              setFieldValue('media.wa_media_url', mediaUrl)
            }}
          />
        </div>
      )}
    </NodeFormContainer>
  )
}

export default memo(Form)
