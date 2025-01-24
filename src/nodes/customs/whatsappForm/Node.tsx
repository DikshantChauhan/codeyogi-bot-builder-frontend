import { NodeProps } from '@xyflow/react'
import { WhatsappFormNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappFormNode: FC<NodeProps<WhatsappFormNodeType>> = ({ data }) => {
  return (
    <NodeCard nodeType="whatsapp-form">
      <div className="space-y-2">
        <h3 className="font-medium">{data.title}</h3>
        <p className="text-sm text-gray-600">{data.description}</p>
        <div className="space-y-1">
          {data.fields.map((field, index) => (
            <div key={index} className="flex items-center gap-1 text-sm">
              <span className="text-gray-600">{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
              <span className="text-gray-400">({field.type})</span>
            </div>
          ))}
        </div>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappFormNode)
