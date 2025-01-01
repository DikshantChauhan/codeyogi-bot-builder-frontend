import { Node } from "@xyflow/react";

export const QUIZ_NODE_KEY = "quiz";

export type QuizNodeData = {
    question: string;
    options: string[];
    rightIndex: number;
}

export type QuizNodeType = Node<QuizNodeData, typeof QUIZ_NODE_KEY>;
