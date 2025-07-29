import { FC, memo } from 'react'
import NodeFormContainer, { TransFormNodeDataOrFail } from '../../../components/NodeFormContainer'
import { EndNodeData, EndNodeType } from './type'
import SuggestionInput from '../../../components/Field'

interface Props {
  node?: EndNodeType
}

const info = `🔹 End Node Requirement
- The flow must include at least one \`end\` node.
- If no end node is found, throw error.

🔹 Path Completion Rule
- All possible paths in the flow must eventually lead to an \`end\` node.
- If any path doesn’t reach an end node, throw error.

🔹 End Node Behavior
- When a user reaches an \`end\` node:
  - Send the message defined in that end node.
  - Then:
    - If there is a next flow, automatically move to the start node of the next flow.
    - If this is the last level’s end node, keep sending the same end node’s message whenever the user triggers the bot again.
`

const EndForm: FC<Props> = ({ node }) => {
  const data = node?.data

  const transFormNodeDataOrFail: TransFormNodeDataOrFail<EndNodeData> = (value) => {
    return value
  }

  return (
    <NodeFormContainer initialValues={data || { text: '' }} transFormNodeDataOrFail={transFormNodeDataOrFail} info={info}>
      <SuggestionInput
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="text"
        placeholder="Enter end message..."
      />
    </NodeFormContainer>
  )
}

export default memo(EndForm)
