import { FC, memo, useCallback } from "react";
import NodeFormContiner from "../../../components/NodeFormContiner";
import { PromptNodeData } from "./type";

const PromptForm: FC = () => {
  const handleTransform = useCallback((_: { [k: string]: FormDataEntryValue }) => {
    return {} as PromptNodeData;
  }, []);

  return (
    <NodeFormContiner type="prompt" transformData={handleTransform}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter prompt..."
        />{" "}
      </div>
    </NodeFormContiner>
  );
};

export default memo(PromptForm);
