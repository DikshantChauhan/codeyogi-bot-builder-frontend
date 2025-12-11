import { memo, useMemo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import SuggestionField from '../../../components/Field'
import NodeHeaderForm from '../../../components/NodeHeaderForm'
import { WhatsappAssignmentNodeData, WhatsappAssignmentNodeType } from './type'

interface Props {
  node?: WhatsappAssignmentNodeType
}

const Form = ({ node }: Props) => {
  const data = node?.data

  const initialValues: WhatsappAssignmentNodeData = useMemo(
    () => ({
      assignmentId: data?.assignmentId || '',
      message: data?.message || '',
      header: data?.header,
    }),
    [data]
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappAssignmentNodeData> = (value) => {
    // Validation
    if (!value.assignmentId?.trim()) {
      throw new Error('Assignment ID is required')
    }

    if (!value.message?.trim()) {
      throw new Error('Message is required')
    }

    if (value.header?.type) {
      //validate if hader.type is text and header.text is not provided
      if (value.header?.type === 'text' && !value.header?.text) {
        throw new Error('Header text is required')
      }

      //validate if hader.type is not text and header.media.wa_media_url is not provided
      if (value.header?.type !== 'text' && (!value.header?.media?.wa_media_url || !value.header?.media?.wa_media_id)) {
        throw new Error('Header media URL and ID is required')
      }
    }

    return value
  }

  const Info = useMemo(() => {
    return (
      <div>
        <img src="/public/assets/wa_button_info.png" alt="whatsapp-button" />
      </div>
    )
  }, [])

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={Info}>
      {({ values, setFieldValue }) => (
        <div className="space-y-4">
          <NodeHeaderForm header={values.header} setFieldValue={setFieldValue} />

          <div className="space-y-2">
            <SuggestionField
              disableSuggestion
              name="assignmentId"
              placeholder="Enter assignment ID"
              as="input"
              label="Assignment ID"
              characterLimit={60}
            />
          </div>

          <div className="space-y-2">
            <SuggestionField name="message" placeholder="Enter message text" as="textarea" label="Message text" characterLimit={1024} />
          </div>
        </div>
      )}
    </NodeFormContainer>
  )
}

export default memo(Form)
