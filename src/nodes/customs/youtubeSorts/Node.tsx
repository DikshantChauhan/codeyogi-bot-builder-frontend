import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { YoutubeSortsNodeType } from './type'
import NodeCard from '../../../components/NodeCard'
import SortsPlayer from '../../../components/SortsPlayer'

const Node: FC<NodeProps<YoutubeSortsNodeType>> = ({ id, data }) => {
  return (
    <NodeCard nodeId={id} nodeType="youtube-sorts">
      <SortsPlayer videoLinks={data.links} className="w-32 h-40" />
    </NodeCard>
  )
}

export default memo(Node)
