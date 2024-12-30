import { FaCode, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons";
import { LuMessageSquareMore } from "react-icons/lu";
import { RxInput } from "react-icons/rx";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GiArrowCursor } from "react-icons/gi";
import { Panel } from "@xyflow/react";
import { NodeTypeKeys } from "../nodes";
import useAppStore from "../store/store";

interface ToolbarProps {}

type keys = NodeTypeKeys | "";
const ICONS_MAP: { [key in keys]: IconType } = {
  "": GiArrowCursor,
  "if-else": FaCode,
  message: LuMessageSquareMore,
  prompt: RxInput,
  quiz: FaListCheck,
  "youtube-sorts": FaYoutube,
  "native-sorts": MdOutlineOndemandVideo,
};

const Toolbar: React.FC<ToolbarProps> = ({}) => {
  const pickedTool = useAppStore((state) => state.nodeToAdd);
  const setNodeToAdd = useAppStore((state) => state.setNodeToAdd);

  return (
    <Panel position="top-center" className="p-4 bg-white z-10 shadow-md drop-shadow rounded-md space-x-2">
      {Object.entries(ICONS_MAP).map(([key, Icon]) => (
        <button
          key={key}
          onClick={() => setNodeToAdd((key as keys) || null)}
          className={`bg-teal-500 text-white p-1.5 rounded ${(pickedTool || "") === key ? "bg-teal-600" : ""}`}
          title={key}
        >
          <Icon />
        </button>
      ))}
    </Panel>
  );
};

export default Toolbar;
