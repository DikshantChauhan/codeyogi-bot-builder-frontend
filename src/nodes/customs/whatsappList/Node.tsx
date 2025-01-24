import { NodeProps } from '@xyflow/react'
import { WhatsappListNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappListNode: FC<NodeProps<WhatsappListNodeType>> = ({ data }) => {
  return (
    <NodeCard nodeType="whatsapp-list">
      <div className="space-y-2">
        <h3 className="font-medium">{data.header}</h3>
        <p className="text-sm text-gray-600">{data.body}</p>
        <div className="space-y-2">
          {data.items.map((item, index) => (
            <div key={index} className="text-sm">
              <div className="font-medium">{item.title}</div>
              {item.description && <div className="text-gray-500">{item.description}</div>}
            </div>
          ))}
        </div>
        <button className="w-full text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">{data.buttonText}</button>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappListNode)
