import { NodeProps } from '@xyflow/react'
import { FC, memo } from 'react'
import { PromptNodeType } from './type'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<PromptNodeType>> = ({ id, data }) => {
  return (
    <NodeCard nodeId={id} nodeType="prompt">
      <div>
        <p>Type: {data.type}</p>
        {data.min !== undefined && <p>Min: {data.min}</p>}
        {data.max !== undefined && <p>Max: {data.max}</p>}
      </div>
    </NodeCard>
  )
}

export default memo(Node)
