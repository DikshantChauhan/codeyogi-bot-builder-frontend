import { memo, useMemo } from 'react'
import { WhatsappVideoNodeData, WhatsappVideoNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { Field } from 'formik'
import SuggestionField from '../../../components/Field'

interface Props {
  node?: WhatsappVideoNodeType
}

const Form: React.FC<Props> = ({ node }) => {
  const data = node?.data
  const initialValues: WhatsappVideoNodeData = useMemo(
    () => ({
      media: { wa_media_url: data?.media.wa_media_url || '', wa_media_id: data?.media.wa_media_id || '' },
      caption: data?.caption || '',
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappVideoNodeData> = (value) => {
    if (!value.media.wa_media_url) {
      throw new Error('Video media url is required')
    }
    return value
  }

  const Info = useMemo(() => {
    return (
      <div>
        <img src="/public/assets/wa_video_info.png" alt="whatsapp-video" />
        <p>Note: 16 mb limit for media id</p>
      </div>
    )
  }, [])

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={Info}>
      <div className="space-y-4">
        <Field name="media.wa_media_url" placeholder="Enter WhatsApp video URL" as="input" label="Video URL" disableSuggestion />
        <SuggestionField name="caption" placeholder="Enter video caption" as="textarea" label="Caption (optional)" />
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
