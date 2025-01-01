import { Panel } from '@xyflow/react'
import useAppStore from '../store/store'
import IfElseForm from '../nodes/customs/ifelse/Form'
import MessageForm from '../nodes/customs/message/Form'
import NativeSortsForm from '../nodes/customs/nativeSorts/Form'
import PromptForm from '../nodes/customs/prompt/Form'
import QuizForm from '../nodes/customs/quiz/Form'
import YoutubeSortsForm from '../nodes/customs/youtubeSorts/Form'
import { useMemo } from 'react'
import { IfElseNodeType } from '../nodes/customs/ifelse/type'
import { MessageNodeType } from '../nodes/customs/message/type'
import { NativeSortsNodeType } from '../nodes/customs/nativeSorts/type'
import { PromptNodeType } from '../nodes/customs/prompt/type'
import { QuizNodeType } from '../nodes/customs/quiz/type'
import { YoutubeSortsNodeType } from '../nodes/customs/youtubeSorts/type'

const ToolSidePanel: React.FC = () => {
  const nodeToAdd = useAppStore((state) => state.nodeToAdd)
  const selectedNodeId = useAppStore((state) => state.selectedNodeId)
  const nodes = useAppStore((state) => state.nodes)

  const selectedNode = useMemo(() => {
    const node = selectedNodeId && nodes.find((node) => node.id === selectedNodeId)
    return node || undefined
  }, [selectedNodeId, nodes])

  const pickedTool = nodeToAdd || selectedNode?.type

  const ToolForm = useMemo(() => {
    switch (pickedTool) {
      case 'if-else':
        return <IfElseForm node={selectedNode as IfElseNodeType} />

      case 'message':
        return <MessageForm node={selectedNode as MessageNodeType} />

      case 'native-sorts':
        return <NativeSortsForm node={selectedNode as NativeSortsNodeType} />

      case 'prompt':
        return <PromptForm node={selectedNode as PromptNodeType} />

      case 'quiz':
        return <QuizForm node={selectedNode as QuizNodeType} />

      case 'youtube-sorts':
        return <YoutubeSortsForm node={selectedNode as YoutubeSortsNodeType} />
    }
  }, [pickedTool, selectedNode])

  return pickedTool ? (
    <Panel position="top-right" className="w-[300px] h-screen p-4 bg-white z-10 shadow-md drop-shadow rounded-md space-x-2 border">
      {ToolForm}
    </Panel>
  ) : (
    <></>
  )
}

export default ToolSidePanel
