import { FC, memo } from "react";
import NodeFormContiner from "../../../components/NodeFormContiner";

const IfElseForm: FC = () => {
  return (
    <NodeFormContiner type="if-else">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="if">
          If Condition
        </label>
        <input
          type="text"
          name="if"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter if condition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="else">
          Else Statement
        </label>
        
        <input
          type="text"
          name="else"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter else condition"
        />
      </div>
    </NodeFormContiner>
  );
};

export default memo(IfElseForm);
