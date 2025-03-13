import { NodeProps } from '@xyflow/react'
import { WHATSAPP_CONFIRM_SCHOOL_NODE_KEY, WhatsappConfirmSchoolNodeType } from './type'
import { FC, memo, useMemo } from 'react'
import NodeCard from '../../../components/NodeCard'

const Node: FC<NodeProps<WhatsappConfirmSchoolNodeType>> = ({ id, data }) => {
  const options = useMemo(() => data.paths.map((value) => ['', value] as [string, string]), [])
  return (
    <NodeCard nodeId={id} nodeType={WHATSAPP_CONFIRM_SCHOOL_NODE_KEY} options={options}>
      <p>{data.text}</p>
    </NodeCard>
  )
}

export default memo(Node)
