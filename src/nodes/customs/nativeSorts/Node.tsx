import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { NativeSortsNodeData, NativeSortsNodeType } from './type'
import NodeCard from '../../../components/NodeCard'
import { MdOutlineOndemandVideo } from 'react-icons/md'
import SortsPlayer from '../../../components/SortsPlayer'

const Node: FC<NodeProps<NativeSortsNodeType>> = ({ data, id }) => {
  return (
    <NodeCard<NativeSortsNodeData> nodeId={id} Icon={MdOutlineOndemandVideo} iconBg="bg-pink-400" title="Native sorts">
      <SortsPlayer videoLinks={data.links} className="w-32 h-40" />
    </NodeCard>
  )
}

export default memo(Node)
