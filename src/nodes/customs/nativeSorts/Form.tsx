import { FC, memo, useCallback } from 'react';
import NodeFormContiner from '../../../components/NodeFormContiner';
import { NativeSortsNodeData } from './type';
import Input from '../../../components/Input';

const Form: FC = () => {
  const handleTransform = useCallback(
    (_: { [k: string]: FormDataEntryValue }) => {
      return {} as NativeSortsNodeData;
    },
    []
  );

  return (
    <NodeFormContiner type="native-sorts" transformData={handleTransform}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Native sort link
        </label>
        <Input type="text" placeholder="Enter link" />
        <Input type="text" placeholder="Enter link" />
        <Input type="text" placeholder="Enter link" />
      </div>
    </NodeFormContiner>
  );
};

export default memo(Form);
