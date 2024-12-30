import { FC, memo, useCallback } from "react";
import useAppStore from "../store/store";
import { useReactFlow } from "@xyflow/react";
import { AppNodeData, NodeTypeKeys } from "../nodes";

interface FormProps {
  type: NodeTypeKeys;
  children: React.ReactNode;
  transformData: (data: { [k: string]: FormDataEntryValue }) => AppNodeData;
}

const FormContainer: FC<FormProps> = ({ children, type, transformData }) => {
  const setNode = useAppStore((state) => state.setNodes);
  const { getViewport } = useReactFlow();

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData);

    const transformedData = transformData(formObject);

    setNode({
      type: type,
      id: Math.random().toString(36).substring(7),
      position: getViewport(),
      data: transformedData as any,
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
      <button type="submit" className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
};

export default memo(FormContainer);
