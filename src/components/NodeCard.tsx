import { FC, memo } from "react";
import { IconType } from "react-icons";
import Handle from "./Handle";
import { Position } from "@xyflow/react";

interface Props {
  title: string;
  Icon: IconType;
  iconBg: string;
  options?: [string, string][];
  children?: React.ReactNode;
}

const NodeCard: FC<Props> = ({ Icon, title, iconBg, options, children }) => {
  return (
    <div className="bg-gray-200 rounded text-xs pb-2 min-w-40">
      <div className="flex items-center mb-1 p-2 relative">
        <Icon className={`p-1 w-5 h-5 text-white rounded ${iconBg}`} />
        <p className="text-center ml-2">{title}</p>
        <Handle type="target" position={Position.Left} />
      </div>

      {children}

      {options ? (
        <div className="flex flex-col space-y-2">
          {options.map(([label, value]) => (
            <div key={value} className="flex items-center relative">
              <div className="bg-gray-50 flex-1 p-1 pl-2 rounded-sm mx-2 relative">
                <p className="text-gray-600 absolute top-0 left-0 -translate-y-1/2" style={{ fontSize: "0.5rem" }}>
                  {label}
                </p>
                <p>{value}</p>
              </div>

              <Handle id={value} type="source" position={Position.Right} />
            </div>
          ))}
        </div>
      ) : (
        <Handle type="source" position={Position.Right} />
      )}
    </div>
  );
};

export default memo(NodeCard);
