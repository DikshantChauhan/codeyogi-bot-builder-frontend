import { FC, memo } from 'react'
import { getRandomId } from '../../../utils'
import { NativeSortsNodeData, NativeSortsNodeType } from './type'
import NodeFormContiner, { TransFormToNode } from '../../../components/NodeFormContiner'
import ListField from '../../../components/ListField'

interface Props {
  node?: NativeSortsNodeType
}

const Form: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormToNode: TransFormToNode<NativeSortsNodeData> = (value) => {
    return {
      data: value,
      id: node?.id || getRandomId(),
      type: 'native-sorts',
      position: { x: 0, y: 0 },
    }
  }

  return (
    <NodeFormContiner data={data || { links: [''] }} transformToNode={transFormToNode} title="Native sorts" updating={!!node}>
      <ListField name="links" labelGenerator={(index) => `Link ${index + 1}`} placeholderGenerator={(index) => `Enter Native sort link ${index + 1}`} />
    </NodeFormContiner>
  )
}

export default memo(Form)
