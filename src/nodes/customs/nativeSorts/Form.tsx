import { FC, memo } from 'react'
import { NativeSortsNodeData, NativeSortsNodeType } from './type'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import ListField from '../../../components/ListField'

interface Props {
  node?: NativeSortsNodeType
}

const Form: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<NativeSortsNodeData> = (value) => {
    // TODO: validate links
    return value
  }

  return (
    <NodeFormContainer initialValues={data || { links: [''] }} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <ListField
        name="links"
        labelGenerator={(index) => `Link ${index + 1}`}
        placeholderGenerator={(index) => `Enter Native sort link ${index + 1}`}
      />
    </NodeFormContainer>
  )
}

export default memo(Form)
