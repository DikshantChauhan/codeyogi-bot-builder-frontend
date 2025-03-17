import { memo, useMemo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappValidateDiseCodeNodeData, WhatsappValidateDiseCodeNodeType, WhatsappValidateDiseCodePaths } from './type'
import SuggestionField from '../../../components/SuggestionField'

interface Props {
  node?: WhatsappValidateDiseCodeNodeType
}

const Form: React.FC<Props> = ({}) => {
  const data = useMemo(
    () => ({
      diseCode: '${user.prompt_input}',
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
      <SuggestionField name="diseCode" />

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
