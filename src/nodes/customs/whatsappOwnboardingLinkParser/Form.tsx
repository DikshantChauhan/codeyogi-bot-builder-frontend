import { memo, useMemo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappOwnboardingLinkParserNodeData, WhatsappOwnboardingLinkParserNodePaths, WhatsappOwnboardingLinkParserNodeType } from './type'
import Field from '../../../components/Field'

interface Props {
  node?: WhatsappOwnboardingLinkParserNodeType
}

const info = `Parse the provided link and choose the path for Student, Teacher or Unknown.

For passing keys wrap them with '*' and for key/value pairs use ':'. 
Example: *District id: 123*
         *Dise code: 123*

For choosing Student provide: Dise code.
This will set the user's dise-code.

For choosing Teacher provide: District id.`

const Form: React.FC<Props> = ({ node }) => {
  const initialValues = useMemo(
    () => ({
      link: node?.data.link || '',
      paths: WhatsappOwnboardingLinkParserNodePaths,
    }),
    []
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappOwnboardingLinkParserNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={info}>
      <Field name="link" label="Link" as="textarea" rows={5} placeholder="${chat.input}" />
    </NodeFormContainer>
  )
}

export default memo(Form)
