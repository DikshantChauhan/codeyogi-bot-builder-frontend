import { memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { SyncPlatformNodeData, SyncPlatformNodeType, SyncPlatformPaths } from './type'
import Field from '../../../components/Field'

interface Props {
  node?: SyncPlatformNodeType
}

const info = `Makes a GET request to the specified API route and branches based on the response.

On success (token received): follows the "then" path.
On failure (error or missing token): follows the "catch" path.`

const Form: React.FC<Props> = ({ node }) => {
  const transFormNodeDataOrFail: TransFormNodeDataOrFail<SyncPlatformNodeData> = (value) => {
    return value
  }

  const initialValues: SyncPlatformNodeData = {
    api_route: node?.data.api_route || '',
    api_secret_code: node?.data.api_secret_code || '',
    paths: SyncPlatformPaths,
  }

  return (
    <NodeFormContainer initialValues={initialValues} transFormNodeDataOrFail={transFormNodeDataOrFail} info={info}>
      <div className="mt-4">
        <Field name="api_route" label="API Route" as="input" placeholder="https://..." />
      </div>
      <div className="mt-4">
        <Field name="api_secret_code" label="API Secret Code" as="input" placeholder="Enter secret code" />
      </div>
    </NodeFormContainer>
  )
}

export default memo(Form)
