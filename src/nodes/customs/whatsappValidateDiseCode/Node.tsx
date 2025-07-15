import { NodeProps } from '@xyflow/react'
import { WhatsappValidateDiseCodeNodeType, WHATSAPP_VALIDATE_DISE_CODE_NODE_KEY } from './type'
import { FC, memo, useMemo } from 'react'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<WhatsappValidateDiseCodeNodeType>> = ({ id, data }) => {
  const options = useMemo(() => data.paths.map((value) => ['', value] as [string, string]), [])
  return (
    <NodeCard nodeId={id} nodeType={WHATSAPP_VALIDATE_DISE_CODE_NODE_KEY} options={options}>
      <div className="mt-4">
        <p>{data.dise_code}</p>
      </div>
    </NodeCard>
  )
}

export default memo(Node)
