import { Node } from "@xyflow/react";

export const YOUTUBE_SORTS_NODE_KEY = "youtube-sorts";

type YoutubeSortsNodeData = {
  links: string[];
};

export type YoutubeSortsNodeType = Node<YoutubeSortsNodeData, typeof YOUTUBE_SORTS_NODE_KEY>;
