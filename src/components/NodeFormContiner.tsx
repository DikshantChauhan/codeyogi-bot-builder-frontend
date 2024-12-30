import { FC, memo, useCallback } from "react";
import useAppStore from "../store/store";
import { useReactFlow } from "@xyflow/react";
import { NodeTypeKeys } from "../nodes";

interface FormProps {
  children: React.ReactNode;
}

const FormContainer: FC<FormProps> = ({ children }) => {
  const setNode = useAppStore((state) => state.setNodes);
  const { getViewport } = useReactFlow();

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>, type: NodeTypeKeys) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData);

    setNode({
      data: formObject as any,
      type: type,
      id: Math.random().toString(36).substring(7),
      position: getViewport(),
    });
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e, "message")} className="space-y-4">
      {children}
      <button type="submit" className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
};

export default memo(FormContainer);
