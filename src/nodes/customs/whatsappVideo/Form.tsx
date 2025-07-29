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
  const initialValues = useMemo(
    () => ({
      media: data?.media || '',
      mediaType: data?.mediaType || 'id',
      caption: data?.caption || '',
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappVideoNodeData> = (value) => {
    if (!value.media) {
      throw new Error('Video media is required')
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
        <div className="space-y-2">
          <label className="text-sm font-medium">Media Type</label>
          <Field as="select" name="mediaType" className="w-full rounded-md border px-3 py-2">
            <option value="id">Video ID</option>
            <option value="link">Video URL</option>
          </Field>
        </div>
        <SuggestionField name="media" placeholder="Enter WhatsApp video ID or URL" as="input" label="Media" />
        <SuggestionField name="caption" placeholder="Enter video caption" as="textarea" label="Caption (optional)" />
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
