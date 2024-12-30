import { Handle, NodeProps, Position } from "@xyflow/react";
import { FC, memo, useState } from "react";
import { PromptNodeType } from "./type";

// interface QuizNodeData {
//   question: string;
//   options: { id: string; text: string }[];
//   selectedOption?: string;
//   onQuestionChange: (question: string) => void;
//   onOptionChange: (optionId: string, text: string) => void;
//   onSelectOption: (optionId: string) => void;
// }

const Node: FC<NodeProps<PromptNodeType>> = ({}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
  };

  return (
    <div style={{ padding: 10, border: "1px solid #ddd", borderRadius: 5 }}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter numbers"
        style={{ width: "100%" }}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(Node);
