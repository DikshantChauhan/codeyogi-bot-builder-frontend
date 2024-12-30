import { Node } from "@xyflow/react";

export const PROMPT_NODE_KEY = "prompt";
export type PromptNodeType = Node<{ text: string }, typeof PROMPT_NODE_KEY>;
