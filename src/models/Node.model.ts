import { END_NODE_KEY, EndNodeType } from '../nodes/customs/end/type'
import { DELAY_NODE_KEY, DelayNodeType } from '../nodes/customs/delay/type'
import { START_NODE_KEY, StartNodeType } from '../nodes/customs/start/type'
import { WHATSAPP_MESSAGE_NODE_KEY, WhatsappMessageNodeType } from '../nodes/customs/whatsappMessage/type'
import { WHATSAPP_REACTION_NODE_KEY, WhatsappReactionNodeType } from '../nodes/customs/whatsappReaction/type'
import { WHATSAPP_STICKER_NODE_KEY, WhatsappStickerNodeType } from '../nodes/customs/whatsappSticker/type'
import { WHATSAPP_VIDEO_NODE_KEY, WhatsappVideoNodeType } from '../nodes/customs/whatsappVideo/type'
import { WHATSAPP_BUTTON_NODE_KEY, WhatsappButtonNodeType } from '../nodes/customs/whatsappButton/type'
import { WHATSAPP_LIST_NODE_KEY, WhatsappListNodeType } from '../nodes/customs/whatsappList/type'
import { WHATSAPP_IMAGE_NODE_KEY, WhatsappImageNodeType } from '../nodes/customs/whatsappImage/type'
import { WHATSAPP_DOCUMENT_NODE_KEY, WhatsappDocumentNodeType } from '../nodes/customs/whatsappDocument/type'
import { WHATSAPP_AUDIO_NODE_KEY, WhatsappAudioNodeType } from '../nodes/customs/whatsappAudio/type'
import { PROMPT_NODE_KEY, PromptNodeType } from '../nodes/customs/prompt/type'
import { IF_ELSE_NODE_KEY, IfElseNodeType } from '../nodes/customs/ifElse/type'
import PromptNode from '../nodes/customs/prompt/Node'
import WhatsappMessageNode from '../nodes/customs/whatsappMessage/Node'
import IfElseNode from '../nodes/customs/ifElse/Node'
import StartNode from '../nodes/customs/start/Node'
import WhatsappAudioNode from '../nodes/customs/whatsappAudio/Node'
import WhatsappDocumentNode from '../nodes/customs/whatsappDocument/Node'
import WhatsappImageNode from '../nodes/customs/whatsappImage/Node'
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
  IoMdGitBranch,
  IoMdMail,
  IoMdFlag,
  IoIosRadioButtonOn,
  IoMdTime,
  IoIosVideocam,
  IoMdSquare,
  IoMdPerson,
} from 'react-icons/io'
import { PiPathBold } from 'react-icons/pi'
import { NamedExoticComponent } from 'react'
import { WHATSAPP_USER_UPDATE_NODE_KEY, WhatsappUserUpdateNodeType } from '../nodes/customs/whatsappUserUpdate/type'
import WhatsappUserUpdateNode from '../nodes/customs/whatsappUserUpdate/Node'
import { WHATSAPP_ONBOARDING_LINK_PARSER_NODE_KEY, WhatsappOnboardingLinkParserNodeType } from '../nodes/customs/whatsappOnboardingLinkParser/type'
import WhatsappOnboardingLinkParserNode from '../nodes/customs/whatsappOnboardingLinkParser/Node'
import { WHATSAPP_VALIDATE_DISE_CODE_NODE_KEY, WhatsappValidateDiseCodeNodeType } from '../nodes/customs/whatsappValidateDiseCode/type'
import WhatsappValidateDiseCodeNode from '../nodes/customs/whatsappValidateDiseCode/Node'
import { WHATSAPP_CTA_URL_NODE_KEY, WhatsappCtaUrlNodeType } from '../nodes/customs/whatsappCtaUrl/type'
import WhatsappCtaUrlNode from '../nodes/customs/whatsappCtaUrl/Node'
import { GrValidate } from 'react-icons/gr'
import PromptForm from '../nodes/customs/prompt/Form'
import WhatsappMessageForm from '../nodes/customs/whatsappMessage/Form'
import IfElseForm from '../nodes/customs/ifElse/Form'
import StartForm from '../nodes/customs/start/Form'
import WhatsappAudioForm from '../nodes/customs/whatsappAudio/Form'
import WhatsappDocumentForm from '../nodes/customs/whatsappDocument/Form'
import WhatsappImageForm from '../nodes/customs/whatsappImage/Form'
import WhatsappListForm from '../nodes/customs/whatsappList/Form'
import WhatsappButtonForm from '../nodes/customs/whatsappButton/Form'
import WhatsappVideoForm from '../nodes/customs/whatsappVideo/Form'
import WhatsappReactionForm from '../nodes/customs/whatsappReaction/Form'
import DelayForm from '../nodes/customs/delay/Form'
import EndForm from '../nodes/customs/end/Form'
import WhatsappUserUpdateForm from '../nodes/customs/whatsappUserUpdate/Form'
import WhatsappOnboardingLinkParserForm from '../nodes/customs/whatsappOnboardingLinkParser/Form'
import WhatsappValidateDiseCodeForm from '../nodes/customs/whatsappValidateDiseCode/Form'
import WhatsappCtaUrlForm from '../nodes/customs/whatsappCtaUrl/Form'
import WhatsappStickerForm from '../nodes/customs/whatsappSticker/Form'
import { WHATSAPP_ASSIGNMENT_NODE_KEY, WhatsappAssignmentNodeType } from '../nodes/customs/whatsappAssignment/type'
import WhatsappAssignmentNode from '../nodes/customs/whatsappAssignment/Node'
import WhatsappAssignmentForm from '../nodes/customs/whatsappAssignment/Form'

export type SubFlowValue = 'inherit' | 'none' | (string & object)

export type WhatsappMedia = { wa_media_id: string; wa_media_url: string }

export const MEDIA_TYPES = ['image', 'video', 'document', 'audio', 'text'] as const
export type MediaTypes = (typeof MEDIA_TYPES)[number]

export interface MessageHeader {
  type: MediaTypes
  text?: string
  media?: WhatsappMedia
}

export type NodeOrientation = 'vertical' | 'horizontal'

export type AppNode =
  | (
      | IfElseNodeType
      | PromptNodeType
      | WhatsappMessageNodeType
      | StartNodeType
      | WhatsappAudioNodeType
      | WhatsappDocumentNodeType
      | WhatsappImageNodeType
      | WhatsappListNodeType
      | WhatsappButtonNodeType
      | WhatsappVideoNodeType
      | WhatsappReactionNodeType
      | WhatsappStickerNodeType
      | DelayNodeType
      | EndNodeType
      | WhatsappUserUpdateNodeType
      | WhatsappOnboardingLinkParserNodeType
      | WhatsappValidateDiseCodeNodeType
      | WhatsappCtaUrlNodeType
      | WhatsappAssignmentNodeType
    ) & { nudge: SubFlowValue; validator: SubFlowValue; orientation?: NodeOrientation }

export type AppNodeKeys = Exclude<AppNode['type'], undefined>

export type AppNodeData = Pick<AppNode, 'data'>['data']

export type NodeRegistryNodeProps<T extends AppNodeKeys> = AppNode & { type: T }
export type NodeRegistryFormProps<T extends AppNodeKeys> = {
  node?: AppNode & { type: T }
}

type NodeRegistryEntry<T extends AppNodeKeys> = {
  node: NamedExoticComponent<NodeRegistryNodeProps<T>>
  Form: NamedExoticComponent<NodeRegistryFormProps<T>>
  color: `bg-${string}-${number}`
  Icon: IconType
}

export const nodesRegistry: Record<AppNodeKeys, NodeRegistryEntry<AppNodeKeys>> = {
  [PROMPT_NODE_KEY]: {
    node: PromptNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: PromptForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-sky-500',
    Icon: IoMdChatboxes,
  },
  [WHATSAPP_MESSAGE_NODE_KEY]: {
    node: WhatsappMessageNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappMessageForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-emerald-500',
    Icon: IoMdMail,
  },
  [IF_ELSE_NODE_KEY]: {
    node: IfElseNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: IfElseForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-amber-500',
    Icon: IoMdGitBranch,
  },
  [START_NODE_KEY]: {
    node: StartNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: StartForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-slate-500',
    Icon: IoMdFlag,
  },
  [WHATSAPP_AUDIO_NODE_KEY]: {
    node: WhatsappAudioNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappAudioForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-blue-500',
    Icon: IoIosMusicalNotes,
  },
  [WHATSAPP_DOCUMENT_NODE_KEY]: {
    node: WhatsappDocumentNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappDocumentForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-purple-500',
    Icon: IoIosDocument,
  },
  [WHATSAPP_IMAGE_NODE_KEY]: {
    node: WhatsappImageNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappImageForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-pink-500',
    Icon: IoIosImage,
  },
  [WHATSAPP_LIST_NODE_KEY]: {
    node: WhatsappListNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappListForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-orange-500',
    Icon: IoIosList,
  },
  [WHATSAPP_BUTTON_NODE_KEY]: {
    node: WhatsappButtonNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappButtonForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-teal-500',
    Icon: IoIosRadioButtonOn,
  },
  [WHATSAPP_VIDEO_NODE_KEY]: {
    node: WhatsappVideoNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappVideoForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-red-500',
    Icon: IoIosVideocam,
  },
  [WHATSAPP_REACTION_NODE_KEY]: {
    node: WhatsappReactionNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappReactionForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-yellow-500',
    Icon: IoIosHappy,
  },
  [WHATSAPP_STICKER_NODE_KEY]: {
    node: WhatsappStickerNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappStickerForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-cyan-500',
    Icon: IoIosImages,
  },
  [DELAY_NODE_KEY]: {
    node: DelayNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: DelayForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-gray-500',
    Icon: IoMdTime,
  },
  [END_NODE_KEY]: {
    node: EndNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: EndForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-slate-700',
    Icon: IoMdSquare,
  },
  [WHATSAPP_USER_UPDATE_NODE_KEY]: {
    node: WhatsappUserUpdateNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappUserUpdateForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-blue-600',
    Icon: IoMdPerson,
  },
  [WHATSAPP_ONBOARDING_LINK_PARSER_NODE_KEY]: {
    node: WhatsappOnboardingLinkParserNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappOnboardingLinkParserForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-pink-600',
    Icon: PiPathBold,
  },
  [WHATSAPP_VALIDATE_DISE_CODE_NODE_KEY]: {
    node: WhatsappValidateDiseCodeNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappValidateDiseCodeForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-yellow-600',
    Icon: GrValidate,
  },
  [WHATSAPP_CTA_URL_NODE_KEY]: {
    node: WhatsappCtaUrlNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappCtaUrlForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-lime-500',
    Icon: IoIosLink,
  },
  [WHATSAPP_ASSIGNMENT_NODE_KEY]: {
    node: WhatsappAssignmentNode as NamedExoticComponent<NodeRegistryNodeProps<AppNodeKeys>>,
    Form: WhatsappAssignmentForm as NamedExoticComponent<NodeRegistryFormProps<AppNodeKeys>>,
    color: 'bg-lime-500',
    Icon: IoIosLink,
  },
}
