import { Node } from "@xyflow/react";

export const NATIVE_SORTS_NODE_KEY = "native-sorts";
export type NativeSortsNodeType = Node<{ links: string[] }, typeof NATIVE_SORTS_NODE_KEY>;