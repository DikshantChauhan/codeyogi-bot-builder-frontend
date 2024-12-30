import { FC, memo } from "react";
import NodeFormContiner from "../../../components/NodeFormContiner";

const MessageForm: FC = () => {
  return (
    <NodeFormContiner type="message">
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
