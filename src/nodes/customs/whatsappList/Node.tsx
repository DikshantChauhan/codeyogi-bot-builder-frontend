import { NodeProps } from '@xyflow/react'
import { WhatsappListNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappListNode: FC<NodeProps<WhatsappListNodeType>> = ({ data }) => {
  const listOptions = data.items.map((item) => ['', item.title] as [string, string])
  return (
    <NodeCard nodeType="whatsapp-list" options={listOptions}>
      <div>
        <h3 className="font-medium">{data.header}</h3>
        <p className="text-gray-600">{data.body}</p>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappListNode)
