import { FC, memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { YoutubeSortsNodeData, YoutubeSortsNodeType } from './type'
import ListField from '../../../components/ListField'

interface Props {
  node?: YoutubeSortsNodeType
}

const Form: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<YoutubeSortsNodeData> = (value) => {
    if (!value.links || value.links.length === 0) {
      throw new Error('Links are required')
    }
    return value
  }

  return (
    <NodeFormContainer initialValues={data || { links: [''] }} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <ListField name="links" labelGenerator={(index) => `Link ${index + 1}`} placeholderGenerator={(index) => `Enter youtube link ${index + 1}`} />
    </NodeFormContainer>
  )
}

export default memo(Form)
