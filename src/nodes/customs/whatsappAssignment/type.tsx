import { Node } from '@xyflow/react'
import { MessageHeader } from '../../../models/Node.model'

export const WHATSAPP_ASSIGNMENT_NODE_KEY = 'whatsapp-assignment'

export type WhatsappAssignmentNodeData = {
  assignmentId: string
  header?: MessageHeader
  message: string
}

export type WhatsappAssignmentNodeType = Node<WhatsappAssignmentNodeData, typeof WHATSAPP_ASSIGNMENT_NODE_KEY>
