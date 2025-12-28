import { memo, useMemo } from 'react'
import { WHATSAPP_IMAGE_NODE_KEY, WhatsappImageNodeData } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import Field from '../../../components/Field'
import MediaUploadField from '../../../components/MediaUploadField'
import { NodeRegistryFormProps } from '../../../models/Node.model'

const Form: React.FC<NodeRegistryFormProps<typeof WHATSAPP_IMAGE_NODE_KEY>> = ({ node }) => {
  const data = node?.data

  const initialValues: WhatsappImageNodeData = useMemo(
    () => ({
      media: data?.media || { wa_media_id: '', wa_media_url: '' },
      caption: data?.caption || undefined,
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappImageNodeData> = (value) => {
    if (!value.media.wa_media_url || !value.media.wa_media_id) {
      throw new Error('Image URL and ID is required')
    }
    return value
  }

  const Info = useMemo(() => {
    return (
      <div>
        <img src="/public/assets/wa_image_info.png" alt="whatsapp-image" />
      </div>
    )
  }, [])

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={Info}>
      {({ values, setFieldValue }) => (
        <div className="space-y-4">
          <div className="space-y-2">
            <Field name="caption" placeholder="Enter image caption" as="textarea" label="Caption" />
          </div>
          <MediaUploadField
            mediaType="image"
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
