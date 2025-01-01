import { FC, memo } from 'react'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import { getRandomId } from '../../../utils'
import { YoutubeSortsNodeData, YoutubeSortsNodeType } from './type'
import ListField from '../../../components/ListField'

interface Props {
  node?: YoutubeSortsNodeType
}

const Form: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormToNode: TransFormToNode<YoutubeSortsNodeData> = (value) => {
    return {
      data: value,
      id: node?.id || getRandomId(),
      type: 'youtube-sorts',
      position: { x: 0, y: 0 },
    }
  }

  return (
    <NodeFormContiner data={data || { links: [""] }} transformToNode={transFormToNode} title="Youtube sorts" updating={!!node}>
      <ListField name="links" labelGenerator={(index) => `Link ${index + 1}`} placeholderGenerator={(index) => `Enter youtube link ${index + 1}`} />
    </NodeFormContiner>
  )
}

export default memo(Form)
