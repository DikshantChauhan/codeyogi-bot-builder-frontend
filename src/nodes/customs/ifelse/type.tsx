import { Node } from "@xyflow/react";

export const IF_ELSE_NODE_KEY = "if-else";

export type IfElseNodeData = {
  if: string;
  elseIf: string[];
  else: string;
};

export type IfElseNodeType = Node<IfElseNodeData, typeof IF_ELSE_NODE_KEY>;
