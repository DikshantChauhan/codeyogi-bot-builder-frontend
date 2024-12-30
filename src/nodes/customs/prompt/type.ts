import { Node } from "@xyflow/react";

export const PROMPT_NODE_KEY = "prompt";

type PromptNodeData = {
    text: string;
}

export type PromptNodeType = Node<PromptNodeData, typeof PROMPT_NODE_KEY>;
