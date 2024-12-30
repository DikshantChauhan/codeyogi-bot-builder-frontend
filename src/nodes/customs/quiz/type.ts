import { Node } from "@xyflow/react";

export const QUIZ_NODE_KEY = "quiz";
export type QuizNodeType = Node<{ question: string; options: string[]; rightAnswer: string }, typeof QUIZ_NODE_KEY>;
