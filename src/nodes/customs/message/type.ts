import { Node } from "@xyflow/react";

export const MESSAGE_NODE_KEY = "message";
export type MessageNodeType = Node<{ text: string; }, typeof MESSAGE_NODE_KEY>;