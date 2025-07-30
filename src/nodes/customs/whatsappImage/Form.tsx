import { memo, useMemo } from 'react'
import { WhatsappImageNodeData, WhatsappImageNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import Field from '../../../components/Field'

interface Props {
  node?: WhatsappImageNodeType
}

const Form: React.FC<Props> = ({ node }) => {
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
      <div className="space-y-4">
        <Field name="media.wa_media_id" placeholder="Enter WhatsApp image ID" as="input" label="Image ID" disableSuggestion />
        <Field name="media.wa_media_url" placeholder="Enter WhatsApp image URL" as="input" label="Image URL" disableSuggestion />

        <div className="space-y-2">
          <Field name="caption" placeholder="Enter image caption" as="textarea" label="Caption" />
        </div>
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
