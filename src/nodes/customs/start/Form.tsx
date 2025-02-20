import { memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { StartNodeData } from './type'

interface Props {}

const Form: React.FC<Props> = ({}) => {
  const transFormNodeDataOrFail: TransFormNodeDataOrFail<StartNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={{}} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <p>------</p>
    </NodeFormContainer>
  )
}

export default memo(Form)
