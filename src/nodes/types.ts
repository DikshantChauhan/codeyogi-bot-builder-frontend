import type { Node, BuiltInNode } from "@xyflow/react";

export const PROMPT_NODE_KEY = "prompt";
export type PromptNode = Node<{ text: string }, typeof PROMPT_NODE_KEY>;

export const MESSAGE_NODE_KEY = "message";
export type MessageNode = Node<{ text: string; }, typeof MESSAGE_NODE_KEY>;

export const IF_ELSE_NODE_KEY = "if-else";
export type IfElseNode = Node<{}, typeof IF_ELSE_NODE_KEY>;

export const QUIZ_NODE_KEY = "quiz";
export type QuizNode = Node<{ question: string; options: string[]; rightAnswer: string }, typeof QUIZ_NODE_KEY>;

export const YOUTUBE_SORTS_NODE_KEY = "youtube-sorts";
export type YoutubeSortsNode = Node<{ links: string[] }, typeof YOUTUBE_SORTS_NODE_KEY>;

export const NATIVE_SORTS_NODE_KEY = "native-sorts";
export type NativeSortsNode = Node<{ links: string[] }, typeof NATIVE_SORTS_NODE_KEY>;

export type AppNode =
  | BuiltInNode
  | IfElseNode
  | QuizNode
  | YoutubeSortsNode
  | NativeSortsNode
  | PromptNode
  | MessageNode;
