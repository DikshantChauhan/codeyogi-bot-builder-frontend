import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { YoutubeSortsNodeType } from './type'
import NodeCard from '../../../components/NodeCard'
import SortsPlayer from '../../../components/SortsPlayer'
import { FaYoutube } from 'react-icons/fa6'

const Node: FC<NodeProps<YoutubeSortsNodeType>> = ({ data }) => {
  return (
    <NodeCard Icon={FaYoutube} iconBg="bg-red-400" title="Youtube sorts">
      <SortsPlayer videoLinks={data.links} className="w-32 h-40" />
    </NodeCard>
  )
}

export default memo(Node)
