import { Node } from "@xyflow/react";

export const PROMPT_NODE_KEY = "prompt";

export type PromptNodeData = {
    text: string;
}

export type PromptNodeType = Node<PromptNodeData, typeof PROMPT_NODE_KEY>;
