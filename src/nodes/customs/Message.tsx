import { type MessageNode } from "../types";
import { Handle, NodeProps, Position } from "@xyflow/react";

export default ({ data }: NodeProps<MessageNode>) => {
  return (
    <div style={{ padding: 10, border: "1px solid #ddd", borderRadius: 5 }}>
      <strong>Result: </strong> {data.value}
      <Handle type="target" position={Position.Top} />
    </div>
  );
};
