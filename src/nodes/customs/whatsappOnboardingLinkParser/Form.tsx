import { memo, useMemo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappOnboardingLinkParserNodeData, WhatsappOnboardingLinkParserNodePaths, WhatsappOnboardingLinkParserNodeType } from './type'
import Field from '../../../components/Field'

interface Props {
  node?: WhatsappOnboardingLinkParserNodeType
}

const info = `Parse the provided link and choose the path for Student, Teacher or Unknown.

For passing keys wrap them with '*' and for key/value pairs use ':'. 
Example: *District id: 123*
          *Dise code: 123*
          *Course: Coding*

For choosing Student you must provide 'Dise code'. Course is optional, which you can use further in flow building.
This will set the user's dise-code and course (if provided).

For choosing Teacher provide: District id.`

const Form: React.FC<Props> = ({ node }) => {
  const initialValues = useMemo(
    () => ({
      link: node?.data.link || '',
      paths: WhatsappOnboardingLinkParserNodePaths,
    }),
    []
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappOnboardingLinkParserNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={info}>
      <Field name="link" label="Link" as="textarea" rows={5} placeholder="${chat.input}" />
    </NodeFormContainer>
  )
}

export default memo(Form)
