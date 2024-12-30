import { FC, memo, useCallback } from "react";
import NodeFormContiner from "../../../components/NodeFormContiner";
import { NativeSortsNodeData } from "./type";

const Form: FC = () => {
  const handleTransform = useCallback((_: { [k: string]: FormDataEntryValue }) => {
      return {} as NativeSortsNodeData;
    }, []);
  
    return (
      <NodeFormContiner type="native-sorts" transformData={handleTransform}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Native sort link</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter link"
        />
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter link"
        />
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter link"
        />
      </div>
    </NodeFormContiner>
  );
};

export default memo(Form);
