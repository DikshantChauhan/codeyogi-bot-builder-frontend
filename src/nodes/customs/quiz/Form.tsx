import { FC, memo, useCallback } from "react";
import NodeFormContiner from "../../../components/NodeFormContiner";
import { QuizNodeData } from "./type";

const Form: FC = () => {
  const handleTransform = useCallback((_: { [k: string]: FormDataEntryValue }) => {
    return {} as QuizNodeData;
  }, []);

  return (
    <NodeFormContiner type="quiz" transformData={handleTransform}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter question"
        />
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="option 1"
        />
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="option 2"
        />
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="option 2"
        />
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="option 2"
        />
      </div>
    </NodeFormContiner>
  );
};

export default memo(Form);
