import { useState } from "react";
import { type PromptNode } from "../types";
import { Handle, NodeProps, Position } from "@xyflow/react";

export default ({}: NodeProps<PromptNode>) => {
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
