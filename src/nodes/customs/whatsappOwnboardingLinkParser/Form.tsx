import { memo, useMemo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { WhatsappOwnboardingLinkParserNodeData, WhatsappOwnboardingLinkParserNodePaths, WhatsappOwnboardingLinkParserNodeType } from './type'

interface Props {
  node?: WhatsappOwnboardingLinkParserNodeType
}

const Form: React.FC<Props> = ({}) => {
  const data = useMemo(
    () => ({
      link: '${chat.input}',
      paths: WhatsappOwnboardingLinkParserNodePaths,
    }),
    []
  )

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<WhatsappOwnboardingLinkParserNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={data} transFormNodeDataOrFail={transFormNodeDataOrFail}>
      <p className="font-bold">Link</p>
      <p>{data.link}</p>

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
