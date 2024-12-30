import { Handle, NodeProps, Position } from "@xyflow/react";
import { ChangeEvent, FC, memo } from "react";
import { QuizNodeType } from "./type";

// interface QuizNodeData {
//   question: string;
//   options: { id: string; text: string }[];
//   selectedOption?: string;
//   onQuestionChange: (question: string) => void;
//   onOptionChange: (optionId: string, text: string) => void;
//   onSelectOption: (optionId: string) => void;
// }

const Node: FC<NodeProps<QuizNodeType>> = ({ data }) => {
  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    // data.onQuestionChange(e.target.value);
  };

  const handleOptionChange = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
    // data.onOptionChange(id, e.target.value);
  };

  const handleOptionSelect = (id: string) => () => {
    // data.onSelectOption(id);
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid black",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
        width: "200px",
      }}
    >
      <strong>Quiz Node</strong>
      <div style={{ margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Enter question"
          value={data.question}
          onChange={handleQuestionChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {data.options.map((option) => (
          <div key={option} style={{ marginBottom: "5px" }}>
            <input
              type="text"
              placeholder={`Option ${option}`}
              value={option}
              onChange={handleOptionChange(option)}
              style={{ width: "70%" }}
            />
            <input
              type="radio"
              name="quiz-option"
              checked={data.rightAnswer === option}
              onChange={handleOptionSelect(option)}
            />
          </div>
        ))}
      </div>
      {/* Input handle */}
      <Handle type="target" position={Position.Top} id="input" />
      {/* Output handles */}
      {data.options.map((option, index) => (
        <Handle
          key={option}
          type="source"
          position={Position.Bottom}
          id={option}
          style={{ left: `${(index + 1) * (100 / (data.options.length + 1))}%` }}
        />
      ))}
    </div>
  );
};

export default memo(Node);
