import { FC, memo, useCallback } from "react";
import NodeFormContiner from "../../../components/NodeFormContiner";
import { MessageNodeData } from "./type";

const MessageForm: FC = () => {
  const handleTransform = useCallback((_: { [k: string]: FormDataEntryValue }) => {
      return {} as MessageNodeData;
    }, []);
  
    return (
      <NodeFormContiner type="message" transformData={handleTransform}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter message..."
        />{" "}
      </div>
    </NodeFormContiner>
  );
};

export default memo(MessageForm);
