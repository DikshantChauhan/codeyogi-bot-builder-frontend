import { Node } from "@xyflow/react";

export const NATIVE_SORTS_NODE_KEY = "native-sorts";

type NativeSortsNodeData = {
    links: string[];
};

export type NativeSortsNodeType = Node<NativeSortsNodeData, typeof NATIVE_SORTS_NODE_KEY>;
