import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { WhatsappUserUpdateNodeType } from './type'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<WhatsappUserUpdateNodeType>> = ({ data }) => {
  return (
    <NodeCard nodeType="whatsapp-user-update">
      <div className="flex flex-col gap-2">
        {Object.entries(data)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => (
            <div key={key} className="flex gap-1">
              <span>{key}:</span>
              <span>{value}</span>
            </div>
          ))}
      </div>
    </NodeCard>
  )
}

export default memo(Node)
