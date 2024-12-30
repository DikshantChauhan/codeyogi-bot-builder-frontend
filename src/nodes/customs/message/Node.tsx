import { Handle, NodeProps, Position } from "@xyflow/react";
import { MessageNodeType } from "./type";
import { FC, memo } from "react";

const Node: FC<NodeProps<MessageNodeType>> = ({ data }) => {
  return (
    <div style={{ padding: 10, border: "1px solid #ddd", borderRadius: 5 }}>
      <strong>Result: </strong> {data.text}
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default memo(Node);
