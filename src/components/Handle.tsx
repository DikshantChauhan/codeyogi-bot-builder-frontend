import { FC, memo } from "react";
import { Handle, HandleProps } from "@xyflow/react";

interface Props extends HandleProps {}

const CustomHandle: FC<Props> = ({ type, position, ...rest }) => {
  return <Handle type={type} position={position} className="border-none h-3 w-0 bg-blue-700 rounded-sm" {...rest} />;
};

export default memo(CustomHandle);
