import { Node } from "@xyflow/react";

export const YOUTUBE_SORTS_NODE_KEY = "youtube-sorts";
export type YoutubeSortsNodeType = Node<{ links: string[] }, typeof YOUTUBE_SORTS_NODE_KEY>;
