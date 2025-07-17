import { NodeProps } from '@xyflow/react'
import { WhatsappListNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappListNode: FC<NodeProps<WhatsappListNodeType>> = (node) => {
  const { data, id } = node
  const listOptions = (data.buttons || []).map((item) => ['', item] as [string, string])
  return (
    <NodeCard nodeId={id} nodeType="whatsapp-list" options={listOptions}>
      <div>
        {data.header && <h3 className="font-medium">{data.header}</h3>}
        <p className="text-gray-600">{data.text}</p>
        {data.footer && <p className="text-sm text-gray-500 mt-2">{data.footer}</p>}
        {data.buttonLabel && <p className="text-sm font-medium mt-2">{data.buttonLabel}</p>}
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappListNode)
