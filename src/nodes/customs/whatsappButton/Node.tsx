import { NodeProps } from '@xyflow/react'
import { WhatsappButtonNodeType } from './type'
import { FC, memo } from 'react'
import NodeCard from '../../../components/NodeCard'

const WhatsappButtonNode: FC<NodeProps<WhatsappButtonNodeType>> = ({ data }) => {
  return (
    <NodeCard nodeType="whatsapp-button">
      <div className="space-y-3">
        <p className="text-sm">{data.text}</p>
        <div className="space-y-2">
          {data.buttons.map((button, index) => (
            <button key={index} className="w-full text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
              {button}
            </button>
          ))}
        </div>
      </div>
    </NodeCard>
  )
}

export default memo(WhatsappButtonNode)
