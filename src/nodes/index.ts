import type { BuiltInNode, NodeTypes } from '@xyflow/react'

import { IF_ELSE_NODE_KEY, IfElseNodeType } from './customs/ifelse/type'
import IfElseNode from './customs/ifelse/Node'
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

export const initialNodes: AppNode[] = []

export type AppNode = BuiltInNode | IfElseNodeType | QuizNodeType | YoutubeSortsNodeType | NativeSortsNodeType | PromptNodeType | MessageNodeType

export type AppNodeData = Pick<Exclude<AppNode, BuiltInNode>, 'data'>['data']

export const nodeTypes = {
  [PROMPT_NODE_KEY]: PromptNode,
  [MESSAGE_NODE_KEY]: MessageNode,
  [IF_ELSE_NODE_KEY]: IfElseNode,
  [QUIZ_NODE_KEY]: QuizNode,
  [YOUTUBE_SORTS_NODE_KEY]: YoutubeSortsNode,
  [NATIVE_SORTS_NODE_KEY]: NativeSortsNode,
} satisfies NodeTypes

export type NodeTypeKeys = keyof typeof nodeTypes
