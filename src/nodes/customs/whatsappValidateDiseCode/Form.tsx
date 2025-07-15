import { memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappValidateDiseCodeNodeData, WhatsappValidateDiseCodeNodeType, WhatsappValidateDiseCodePaths } from './type'
import Field from '../../../components/Field'

interface Props {
  node?: WhatsappValidateDiseCodeNodeType
}

const info = `Validate the provided dise code and choose the path for Valid or Invalid.

If valid, it will set the user's school name.`

const Form: React.FC<Props> = ({ node }) => {
  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappValidateDiseCodeNodeData> = (value) => {
    return value
  }

  const initialValues: WhatsappValidateDiseCodeNodeData = {
    dise_code: node?.data.dise_code || '',
    paths: WhatsappValidateDiseCodePaths,
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={info}>
      <div className="mt-4">
        <Field name="dise_code" label="Dise Code" as="input" placeholder="${chat.input}" />
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
