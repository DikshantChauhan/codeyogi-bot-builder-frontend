import { Node } from "@xyflow/react";

export const MESSAGE_NODE_KEY = "message";

export type MessageNodeData = {
    text: string;
};

export type MessageNodeType = Node<MessageNodeData, typeof MESSAGE_NODE_KEY>;
