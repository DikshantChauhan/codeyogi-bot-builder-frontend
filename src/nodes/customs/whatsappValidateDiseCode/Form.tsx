import { memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappValidateDiseCodeNodeData, WhatsappValidateDiseCodeNodeType, WhatsappValidateDiseCodePaths } from './type'

interface Props {
  node?: WhatsappValidateDiseCodeNodeType
}

const Form: React.FC<Props> = ({}) => {
  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappValidateDiseCodeNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={{ paths: WhatsappValidateDiseCodePaths }} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <div className="mt-4">...........</div>
    </NodeFormContainer>
  )
}

export default memo(Form)
