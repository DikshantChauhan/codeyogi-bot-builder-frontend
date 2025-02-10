import { END_NODE_KEY, EndNodeType } from '../nodes/customs/end/type'
import { DELAY_NODE_KEY, DelayNodeType } from '../nodes/customs/delay/type'
import { START_NODE_KEY, StartNodeType } from '../nodes/customs/start/type'
import { MESSAGE_NODE_KEY, MessageNodeType } from '../nodes/customs/message/type'
import { WHATSAPP_REACTION_NODE_KEY, WhatsappReactionNodeType } from '../nodes/customs/whatsappReaction/type'
import { WHATSAPP_STICKER_NODE_KEY, WhatsappStickerNodeType } from '../nodes/customs/whatsappSticker/type'
import { WHATSAPP_VIDEO_NODE_KEY, WhatsappVideoNodeType } from '../nodes/customs/whatsappVideo/type'
import { WHATSAPP_BUTTON_NODE_KEY, WhatsappButtonNodeType } from '../nodes/customs/whatsappButton/type'
import { WHATSAPP_LIST_NODE_KEY, WhatsappListNodeType } from '../nodes/customs/whatsappList/type'
import { WHATSAPP_FORM_NODE_KEY, WhatsappFormNodeType } from '../nodes/customs/whatsappForm/type'
import { WHATSAPP_LINK_BUTTON_NODE_KEY, WhatsappLinkButtonNodeType } from '../nodes/customs/whatsappLinkButton/type'
import { WHATSAPP_IMAGE_NODE_KEY, WhatsappImageNodeType } from '../nodes/customs/whatsappImage/type'
import { WHATSAPP_DOCUMENT_NODE_KEY, WhatsappDocumentNodeType } from '../nodes/customs/whatsappDocument/type'
import { WHATSAPP_AUDIO_NODE_KEY, WhatsappAudioNodeType } from '../nodes/customs/whatsappAudio/type'
import { PROMPT_NODE_KEY, PromptNodeType } from '../nodes/customs/prompt/type'
import { NATIVE_SORTS_NODE_KEY, NativeSortsNodeType } from '../nodes/customs/nativeSorts/type'
import { YOUTUBE_SORTS_NODE_KEY, YoutubeSortsNodeType } from '../nodes/customs/youtubeSorts/type'
import { QUIZ_NODE_KEY, QuizNodeType } from '../nodes/customs/quiz/type'
import { IF_ELSE_NODE_KEY, IfElseNodeType } from '../nodes/customs/ifElse/type'
import PromptNode from '../nodes/customs/prompt/Node'
import MessageNode from '../nodes/customs/message/Node'
import IfElseNode from '../nodes/customs/ifElse/Node'
import QuizNode from '../nodes/customs/quiz/Node'
import YoutubeSortsNode from '../nodes/customs/youtubeSorts/Node'
import NativeSortsNode from '../nodes/customs/nativeSorts/Node'
import StartNode from '../nodes/customs/start/Node'
import WhatsappAudioNode from '../nodes/customs/whatsappAudio/Node'
import WhatsappDocumentNode from '../nodes/customs/whatsappDocument/Node'
import WhatsappImageNode from '../nodes/customs/whatsappImage/Node'
import WhatsappLinkButtonNode from '../nodes/customs/whatsappLinkButton/Node'
import WhatsappFormNode from '../nodes/customs/whatsappForm/Node'
import WhatsappListNode from '../nodes/customs/whatsappList/Node'
import WhatsappButtonNode from '../nodes/customs/whatsappButton/Node'
import WhatsappVideoNode from '../nodes/customs/whatsappVideo/Node'
import WhatsappReactionNode from '../nodes/customs/whatsappReaction/Node'
import WhatsappStickerNode from '../nodes/customs/whatsappSticker/Node'
import DelayNode from '../nodes/customs/delay/Node'
import EndNode from '../nodes/customs/end/Node'
import { IconType } from 'react-icons/lib'
import {
  IoIosHappy,
  IoIosImages,
  IoIosList,
  IoIosLink,
  IoIosImage,
  IoIosDocument,
  IoIosMusicalNotes,
  IoMdChatboxes,
  IoMdHelp,
  IoMdGitBranch,
  IoMdMail,
  IoLogoYoutube,
  IoMdFlag,
  IoMdCode,
  IoIosListBox,
  IoIosRadioButtonOn,
  IoMdTime,
  IoIosVideocam,
  IoMdSquare,
} from 'react-icons/io'
import { NamedExoticComponent } from 'react'

export type SubFlowValue = 'inherit' | 'none' | (string & {})

export type AppNode =
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
  | (EndNodeType & { nudge: SubFlowValue; validator: SubFlowValue })

export type AppNodeKeys = Exclude<AppNode['type'], undefined>

export type AppNodeData = Pick<AppNode, 'data'>['data']

export const nodesRegistry = {
  [PROMPT_NODE_KEY]: { node: PromptNode, color: 'bg-sky-500', Icon: IoMdChatboxes },
  [MESSAGE_NODE_KEY]: { node: MessageNode, color: 'bg-emerald-500', Icon: IoMdMail },
  [IF_ELSE_NODE_KEY]: { node: IfElseNode, color: 'bg-amber-500', Icon: IoMdGitBranch },
  [QUIZ_NODE_KEY]: { node: QuizNode, color: 'bg-violet-500', Icon: IoMdHelp },
  [YOUTUBE_SORTS_NODE_KEY]: { node: YoutubeSortsNode, color: 'bg-rose-500', Icon: IoLogoYoutube },
  [NATIVE_SORTS_NODE_KEY]: { node: NativeSortsNode, color: 'bg-amber-400', Icon: IoMdCode },
  [START_NODE_KEY]: { node: StartNode, color: 'bg-slate-500', Icon: IoMdFlag },
  [WHATSAPP_AUDIO_NODE_KEY]: { node: WhatsappAudioNode, color: 'bg-blue-500', Icon: IoIosMusicalNotes },
  [WHATSAPP_DOCUMENT_NODE_KEY]: { node: WhatsappDocumentNode, color: 'bg-purple-500', Icon: IoIosDocument },
  [WHATSAPP_IMAGE_NODE_KEY]: { node: WhatsappImageNode, color: 'bg-pink-500', Icon: IoIosImage },
  [WHATSAPP_LINK_BUTTON_NODE_KEY]: { node: WhatsappLinkButtonNode, color: 'bg-green-500', Icon: IoIosLink },
  [WHATSAPP_FORM_NODE_KEY]: { node: WhatsappFormNode, color: 'bg-indigo-500', Icon: IoIosListBox },
  [WHATSAPP_LIST_NODE_KEY]: { node: WhatsappListNode, color: 'bg-orange-500', Icon: IoIosList },
  [WHATSAPP_BUTTON_NODE_KEY]: { node: WhatsappButtonNode, color: 'bg-teal-500', Icon: IoIosRadioButtonOn },
  [WHATSAPP_VIDEO_NODE_KEY]: { node: WhatsappVideoNode, color: 'bg-red-500', Icon: IoIosVideocam },
  [WHATSAPP_REACTION_NODE_KEY]: { node: WhatsappReactionNode, color: 'bg-yellow-500', Icon: IoIosHappy },
  [WHATSAPP_STICKER_NODE_KEY]: { node: WhatsappStickerNode, color: 'bg-cyan-500', Icon: IoIosImages },
  [DELAY_NODE_KEY]: { node: DelayNode, color: 'bg-gray-500', Icon: IoMdTime },
  [END_NODE_KEY]: { node: EndNode, color: 'bg-slate-700', Icon: IoMdSquare },
} satisfies Record<AppNodeKeys, { node: NamedExoticComponent<any>; color: `bg-${string}-${number}`; Icon: IconType }>
