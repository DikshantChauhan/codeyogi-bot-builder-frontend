import type { BuiltInNode, NodeTypes } from '@xyflow/react'

import { IF_ELSE_NODE_KEY, IfElseNodeType } from './customs/ifElse/type'
import IfElseNode from './customs/ifElse/Node'
import { PROMPT_NODE_KEY, PromptNodeType } from './customs/prompt/type'
import { MESSAGE_NODE_KEY, MessageNodeType } from './customs/message/type'
import { QUIZ_NODE_KEY, QuizNodeType } from './customs/quiz/type'
import { YOUTUBE_SORTS_NODE_KEY, YoutubeSortsNodeType } from './customs/youtubeSorts/type'
import { NATIVE_SORTS_NODE_KEY, NativeSortsNodeType } from './customs/nativeSorts/type'
import PromptNode from './customs/prompt/Node'
import MessageNode from './customs/message/Node'
import QuizNode from './customs/quiz/Node'
import YoutubeSortsNode from './customs/youtubeSorts/Node'
import NativeSortsNode from './customs/nativeSorts/Node'
import { getFlowFromLocalStorage } from '../utils'
import { START_NODE_KEY, StartNodeType } from './customs/start/type'
import StartNode from './customs/start/Node'
import { IconType } from 'react-icons'
import { IoMdGitBranch, IoMdChatboxes, IoLogoYoutube, IoMdCode, IoMdFlag, IoMdHelp, IoMdMail } from 'react-icons/io'

export const initialNodes: AppNode[] = getFlowFromLocalStorage()?.nodes || [
  {
    id: '1',
    type: 'start',
    position: { x: 0, y: 0 },
    data: {},
  },
  {
    id: '2',
    type: 'prompt',
    position: { x: 300, y: 0 },
    data: { text: '' },
  },
]

export type AppNode =
  | BuiltInNode
  | IfElseNodeType
  | QuizNodeType
  | YoutubeSortsNodeType
  | NativeSortsNodeType
  | PromptNodeType
  | MessageNodeType
  | StartNodeType

export type AppNodeData = Pick<Exclude<AppNode, BuiltInNode>, 'data'>['data']

export const nodeTypes = {
  [PROMPT_NODE_KEY]: PromptNode,
  [MESSAGE_NODE_KEY]: MessageNode,
  [IF_ELSE_NODE_KEY]: IfElseNode,
  [QUIZ_NODE_KEY]: QuizNode,
  [YOUTUBE_SORTS_NODE_KEY]: YoutubeSortsNode,
  [NATIVE_SORTS_NODE_KEY]: NativeSortsNode,
  [START_NODE_KEY]: StartNode,
} satisfies NodeTypes

export const nodesUIMeta: Record<NodeTypeKeys, { color: `bg-${string}-${number}`; Icon: IconType; title: string }> = {
  'if-else': { color: 'bg-amber-500', Icon: IoMdGitBranch, title: 'If/Else' },
  'prompt': { color: 'bg-sky-500', Icon: IoMdChatboxes, title: 'Prompt' },
  'message': { color: 'bg-emerald-500', Icon: IoMdMail, title: 'Message' },
  'quiz': { color: 'bg-violet-500', Icon: IoMdHelp, title: 'Quiz' },
  'youtube-sorts': { color: 'bg-rose-500', Icon: IoLogoYoutube, title: 'Youtube Sorts' },
  'native-sorts': { color: 'bg-amber-400', Icon: IoMdCode, title: 'Native Sorts' },
  'start': { color: 'bg-slate-500', Icon: IoMdFlag, title: 'Start' },
}

export type NodeTypeKeys = keyof typeof nodeTypes
