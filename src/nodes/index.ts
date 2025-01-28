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
import { START_NODE_KEY, StartNodeType } from './customs/start/type'
import StartNode from './customs/start/Node'
import { IconType } from 'react-icons'
import { IoMdGitBranch, IoMdChatboxes, IoLogoYoutube, IoMdCode, IoMdFlag, IoMdHelp, IoMdMail } from 'react-icons/io'
import { WHATSAPP_AUDIO_NODE_KEY, WhatsappAudioNodeType } from './customs/whatsappAudio/type'
import WhatsappAudioNode from './customs/whatsappAudio/Node'
import { IoIosMusicalNotes } from 'react-icons/io'
import { WHATSAPP_DOCUMENT_NODE_KEY, WhatsappDocumentNodeType } from './customs/whatsappDocument/type'
import WhatsappDocumentNode from './customs/whatsappDocument/Node'
import { IoIosDocument } from 'react-icons/io'
import { WHATSAPP_IMAGE_NODE_KEY, WhatsappImageNodeType } from './customs/whatsappImage/type'
import WhatsappImageNode from './customs/whatsappImage/Node'
import { IoIosImage } from 'react-icons/io'
import { WHATSAPP_LINK_BUTTON_NODE_KEY, WhatsappLinkButtonNodeType } from './customs/whatsappLinkButton/type'
import WhatsappLinkButtonNode from './customs/whatsappLinkButton/Node'
import { IoIosLink } from 'react-icons/io'
import { WHATSAPP_FORM_NODE_KEY, WhatsappFormNodeType } from './customs/whatsappForm/type'
import WhatsappFormNode from './customs/whatsappForm/Node'
import { IoIosListBox } from 'react-icons/io'
import { WHATSAPP_LIST_NODE_KEY, WhatsappListNodeType } from './customs/whatsappList/type'
import WhatsappListNode from './customs/whatsappList/Node'
import { IoIosList } from 'react-icons/io'
import { WHATSAPP_BUTTON_NODE_KEY, WhatsappButtonNodeType } from './customs/whatsappButton/type'
import WhatsappButtonNode from './customs/whatsappButton/Node'
import { IoIosRadioButtonOn } from 'react-icons/io'
import { WHATSAPP_VIDEO_NODE_KEY, WhatsappVideoNodeType } from './customs/whatsappVideo/type'
import WhatsappVideoNode from './customs/whatsappVideo/Node'
import { IoIosVideocam } from 'react-icons/io'
import { WHATSAPP_REACTION_NODE_KEY, WhatsappReactionNodeType } from './customs/whatsappReaction/type'
import WhatsappReactionNode from './customs/whatsappReaction/Node'
import { IoIosHappy } from 'react-icons/io'
import { WHATSAPP_STICKER_NODE_KEY, WhatsappStickerNodeType } from './customs/whatsappSticker/type'
import WhatsappStickerNode from './customs/whatsappSticker/Node'
import { IoIosImages } from 'react-icons/io'
import { DELAY_NODE_KEY, DelayNodeType } from './customs/delay/type'
import DelayNode from './customs/delay/Node'
import { IoMdTime } from 'react-icons/io'

export const initialNodes: AppNode[] = []

export type AppNode =
  | BuiltInNode
  | IfElseNodeType
  | QuizNodeType
  | YoutubeSortsNodeType
  | NativeSortsNodeType
  | PromptNodeType
  | MessageNodeType
  | StartNodeType
  | WhatsappAudioNodeType
  | WhatsappDocumentNodeType
  | WhatsappImageNodeType
  | WhatsappLinkButtonNodeType
  | WhatsappFormNodeType
  | WhatsappListNodeType
  | WhatsappButtonNodeType
  | WhatsappVideoNodeType
  | WhatsappReactionNodeType
  | WhatsappStickerNodeType
  | DelayNodeType

export type AppNodeData = Pick<Exclude<AppNode, BuiltInNode>, 'data'>['data']

export const nodeTypes = {
  [PROMPT_NODE_KEY]: PromptNode,
  [MESSAGE_NODE_KEY]: MessageNode,
  [IF_ELSE_NODE_KEY]: IfElseNode,
  [QUIZ_NODE_KEY]: QuizNode,
  [YOUTUBE_SORTS_NODE_KEY]: YoutubeSortsNode,
  [NATIVE_SORTS_NODE_KEY]: NativeSortsNode,
  [START_NODE_KEY]: StartNode,
  [WHATSAPP_AUDIO_NODE_KEY]: WhatsappAudioNode,
  [WHATSAPP_DOCUMENT_NODE_KEY]: WhatsappDocumentNode,
  [WHATSAPP_IMAGE_NODE_KEY]: WhatsappImageNode,
  [WHATSAPP_LINK_BUTTON_NODE_KEY]: WhatsappLinkButtonNode,
  [WHATSAPP_FORM_NODE_KEY]: WhatsappFormNode,
  [WHATSAPP_LIST_NODE_KEY]: WhatsappListNode,
  [WHATSAPP_BUTTON_NODE_KEY]: WhatsappButtonNode,
  [WHATSAPP_VIDEO_NODE_KEY]: WhatsappVideoNode,
  [WHATSAPP_REACTION_NODE_KEY]: WhatsappReactionNode,
  [WHATSAPP_STICKER_NODE_KEY]: WhatsappStickerNode,
  [DELAY_NODE_KEY]: DelayNode,
} satisfies NodeTypes

export const nodesUIMeta: Record<NodeTypeKeys, { color: `bg-${string}-${number}`; Icon: IconType; title: string }> = {
  'if-else': { color: 'bg-amber-500', Icon: IoMdGitBranch, title: 'If/Else' },
  'prompt': { color: 'bg-sky-500', Icon: IoMdChatboxes, title: 'Prompt' },
  'message': { color: 'bg-emerald-500', Icon: IoMdMail, title: 'Message' },
  'quiz': { color: 'bg-violet-500', Icon: IoMdHelp, title: 'Quiz' },
  'youtube-sorts': { color: 'bg-rose-500', Icon: IoLogoYoutube, title: 'Youtube Sorts' },
  'native-sorts': { color: 'bg-amber-400', Icon: IoMdCode, title: 'Native Sorts' },
  'start': { color: 'bg-slate-500', Icon: IoMdFlag, title: 'Start' },
  'whatsapp-audio': { color: 'bg-blue-500', Icon: IoIosMusicalNotes, title: 'WhatsApp Audio' },
  'whatsapp-document': { color: 'bg-purple-500', Icon: IoIosDocument, title: 'WhatsApp Document' },
  'whatsapp-image': { color: 'bg-pink-500', Icon: IoIosImage, title: 'WhatsApp Image' },
  'whatsapp-link-button': { color: 'bg-green-500', Icon: IoIosLink, title: 'WhatsApp Link Button' },
  'whatsapp-form': { color: 'bg-indigo-500', Icon: IoIosListBox, title: 'WhatsApp Form' },
  'whatsapp-list': { color: 'bg-orange-500', Icon: IoIosList, title: 'WhatsApp List' },
  'whatsapp-button': { color: 'bg-teal-500', Icon: IoIosRadioButtonOn, title: 'WhatsApp Button' },
  'whatsapp-video': { color: 'bg-red-500', Icon: IoIosVideocam, title: 'WhatsApp Video' },
  'whatsapp-reaction': { color: 'bg-yellow-500', Icon: IoIosHappy, title: 'WhatsApp Reaction' },
  'whatsapp-sticker': { color: 'bg-cyan-500', Icon: IoIosImages, title: 'WhatsApp Sticker' },
  'delay': { color: 'bg-gray-500', Icon: IoMdTime, title: 'Delay' },
}

export type NodeTypeKeys = keyof typeof nodeTypes
