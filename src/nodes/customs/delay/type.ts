import { Node } from "@xyflow/react";

export const DELAY_NODE_KEY = "delay";

export type DelayNodeData = {
    message?: string;
    delayInSecs: number;
}

export type DelayNodeType = Node<DelayNodeData, typeof DELAY_NODE_KEY>; 