import { Panel, useReactFlow } from "@xyflow/react";
import useAppStore from "./store/store";
import { nodeTypeKeys } from "./nodes";
import { FC } from "react";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, type: nodeTypeKeys) => void;
}

const IfElseForm: FC<FormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, "if-else")} className="space-y-4">
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
      <button type="submit" className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
};

const PromptForm: FC<FormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, "prompt")} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter prompt..."
        />{" "}
      </div>
      <button type="submit" className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
};

const MessageForm: FC<FormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, "message")} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter message..."
        />{" "}
      </div>
      <button type="submit" className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
};

const NativeSortsForm: FC<FormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, "native-sorts")} className="space-y-4">
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
    </form>
  );
};

const YoutubeSortsForm: FC<FormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, "youtube-sorts")} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Youtube sort link</label>
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
    </form>
  );
};

const QuizForm: FC<FormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, "quiz")} className="space-y-4">
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
    </form>
  );
};

const ToolSidePanel: React.FC = () => {
  const pickedTool = useAppStore((state) => state.nodeToAdd);
  const setNode = useAppStore((state) => state.setNodes);
  const { getViewport } = useReactFlow();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: nodeTypeKeys) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData);

    setNode({
      data: formObject as any,
      type: type,
      id: Math.random().toString(36).substring(7),
      position: getViewport(),
    });
  };

  const renderToolForm = () => {
    switch (pickedTool) {
      case "if-else":
        return <IfElseForm handleSubmit={handleSubmit} />;

      case "message":
        return <MessageForm handleSubmit={handleSubmit} />;

      case "native-sorts":
        return <NativeSortsForm handleSubmit={handleSubmit} />;

      case "prompt":
        return <PromptForm handleSubmit={handleSubmit} />;

      case "quiz":
        return <QuizForm handleSubmit={handleSubmit} />;

      case "youtube-sorts":
        return <YoutubeSortsForm handleSubmit={handleSubmit} />;
    }
  };

  return pickedTool ? (
    <Panel position="top-left" className="w-[300px] p-4 bg-white z-10 shadow-md drop-shadow rounded-md space-x-2">
      {renderToolForm()}
    </Panel>
  ) : (
    <></>
  );
};

export default ToolSidePanel;
