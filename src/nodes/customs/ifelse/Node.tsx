import { NodeProps } from "@xyflow/react";
import { IfElseNodeType } from "./type";
import { FC, memo, useMemo } from "react";
import NodeCard from "../../../components/NodeCard";
import { IoIosGitNetwork } from "react-icons/io";

const IfElseNode: FC<NodeProps<IfElseNodeType>> = ({ data }) => {
  const options = useMemo(
    () =>
      Object.entries(data).flatMap(([label, value]) =>
        Array.isArray(value) ? value.map((v) => [label, v] as [string, string]) : [[label, value] as [string, string]]
      ),
    [data]
  );

  return <NodeCard Icon={IoIosGitNetwork} title="If/Else" iconBg="bg-orange-600" options={options} />;
};

export default memo(IfElseNode)
