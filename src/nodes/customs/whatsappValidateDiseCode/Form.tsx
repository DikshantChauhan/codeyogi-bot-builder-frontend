import { memo, useMemo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappValidateDiseCodeNodeData, WhatsappValidateDiseCodeNodeType, WhatsappValidateDiseCodePaths } from './type'

interface Props {
  node?: WhatsappValidateDiseCodeNodeType
}

const Form: React.FC<Props> = ({}) => {
  const data = useMemo(
    () => ({
      diseCode: '${prompt.input}',
      paths: WhatsappValidateDiseCodePaths,
    }),
    []
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappValidateDiseCodeNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={data} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <p className="font-bold">Link</p>
      <p>{data.diseCode}</p>

      <div className="mt-4">
        <p className="font-bold">Paths</p>
        {data.paths.map((path) => (
          <p>{path}</p>
        ))}
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
