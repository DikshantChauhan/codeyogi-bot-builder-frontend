import { memo, useMemo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappOnboardingLinkParserNodeData, WhatsappOnboardingLinkParserNodePaths, WhatsappOnboardingLinkParserNodeType } from './type'
import Field from '../../../components/Field'

interface Props {
  node?: WhatsappOnboardingLinkParserNodeType
}

const info = `
🔹 Link Parser Node

- Parses the provided link and determines the path based on the user type: **Student**, **Teacher**, or **Unknown**.

🔹 Input Format
- To pass key/value pairs, wrap them in \`*\` and use \`:\` between key and value.
  Example:
    *District id: 123*
    *Dise code: 123*
    *Course: Coding*

🔹 Conditions
- To select the **Student** path:
  - You **must** provide \`Dise code\`.
  - \`Course\` is optional and can be used further in the flow.
  - This sets the user's \`dise-code\` and optionally the \`course\`.

- To select the **Teacher** path:
  - Provide \`District id\` only.

- If neither condition is met, the flow will follow the **Unknown** path.
`

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
