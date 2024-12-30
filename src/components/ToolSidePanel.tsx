import { Panel } from "@xyflow/react";
import useAppStore from "../store/store";
import IfElseForm from "../nodes/customs/ifelse/Form";
import MessageForm from "../nodes/customs/message/Form";
import NativeSortsForm from "../nodes/customs/nativeSorts/Form";
import PromptForm from "../nodes/customs/prompt/Form";
import QuizForm from "../nodes/customs/quiz/Form";
import YoutubeSortsForm from "../nodes/customs/youtubeSorts/Form";
import { useMemo } from "react";

const ToolSidePanel: React.FC = () => {
  const pickedTool = useAppStore((state) => state.nodeToAdd);

  const ToolForm = useMemo(() => {
    switch (pickedTool) {
      case "if-else":
        return <IfElseForm />;

      case "message":
        return <MessageForm />;

      case "native-sorts":
        return <NativeSortsForm />;

      case "prompt":
        return <PromptForm />;

      case "quiz":
        return <QuizForm />;

      case "youtube-sorts":
        return <YoutubeSortsForm />;
    }
  }, [pickedTool]);

  return pickedTool ? (
    <Panel position="top-right" className="w-[300px] h-screen p-4 bg-white z-10 shadow-md drop-shadow rounded-md space-x-2 border">
      {ToolForm}
    </Panel>
  ) : (
    <></>
  );
};

export default ToolSidePanel;
