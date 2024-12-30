import type { NodeTypes } from "@xyflow/react";

import {
  AppNode,
  IF_ELSE_NODE_KEY,
  NATIVE_SORTS_NODE_KEY,
  QUIZ_NODE_KEY,
  YOUTUBE_SORTS_NODE_KEY,
  MESSAGE_NODE_KEY,
  PROMPT_NODE_KEY,
} from "./types";
import PromptNode from "./customs/Prompt";
import MessageNode from "./customs/Message";
import IfElseNode from "./customs/IfElseNode";
import QuizNode from "./customs/QuizNode";
import YoutubeSortsNode from "./customs/YoutubeSortsNode";
import NativeSortsNode from "./customs/NativeSortsNode";

export const initialNodes: AppNode[] = [
  // {
  //   id: "1",
  //   type: "prompt",
  //   position: { x: 250, y: 0 },
  //   data: { value: "" },
  // },
  // {
  //   id: "2",
  //   type: "if-else",
  //   data: { value: "" },
  //   position: { x: 250, y: 150 },
  // },
  // {
  //   id: "3",
  //   type: "message",
  //   position: { x: 250, y: 300 },
  //   data: { value: "Result will appear here" },
  // },
  // {
  //   id: "4",
  //   type: "quiz",
  //   position: { x: 250, y: 450 },
  //   data: { question: "Result will appear here", options: [] },
  // },
  // {
  //   id: "5",
  //   type: "youtube-sorts",
  //   position: { x: 250, y: 600 },
  //   data: { question: "Result will appear here", options: [] },
  // },
  // {
  //   id: "6",
  //   type: "native-sorts",
  //   position: { x: 250, y: 750 },
  //   data: { question: "Result will appear here", options: [] },
  // },
];

export const nodeTypes = {
  [PROMPT_NODE_KEY]: PromptNode,
  [MESSAGE_NODE_KEY]: MessageNode,
  [IF_ELSE_NODE_KEY]: IfElseNode,
  [QUIZ_NODE_KEY]: QuizNode,
  [YOUTUBE_SORTS_NODE_KEY]: YoutubeSortsNode,
  [NATIVE_SORTS_NODE_KEY]: NativeSortsNode,
} satisfies NodeTypes;

export type nodeTypeKeys = keyof typeof nodeTypes;
