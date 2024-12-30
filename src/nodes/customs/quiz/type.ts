import { Node } from "@xyflow/react";

export const QUIZ_NODE_KEY = "quiz";

type QuizNodeData = {
    question: string;
    options: string[];
    rightAnswer: string;
}

export type QuizNodeType = Node<QuizNodeData, typeof QUIZ_NODE_KEY>;
