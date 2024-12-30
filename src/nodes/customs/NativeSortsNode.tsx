import { Handle, NodeProps, Position } from '@xyflow/react';
import React, { ChangeEvent } from 'react';
import { NativeSortsNode } from '../types';

// interface YouTubeShortsNodeData {
//   title: string;
//   url: string;
//   duration: number; // in seconds
//   onTitleChange: (title: string) => void;
//   onUrlChange: (url: string) => void;
//   onDurationChange: (duration: number) => void;
// }

export default ({ data }:NodeProps<NativeSortsNode>) => {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // data.onTitleChange(e.target.value);
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    // data.onUrlChange(e.target.value);
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
    //   data.onDurationChange(value);
    }
  };

  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid black',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        width: '250px',
      }}
    >
      <strong>Native Shorts Node</strong>
      <div style={{ margin: '10px 0' }}>
        <input
          type="text"
          placeholder="Title"
        //   value={data.title}
          onChange={handleTitleChange}
          style={{ width: '100%', marginBottom: '5px' }}
        />
        <input
          type="text"
          placeholder="URL"
        //   value={data.url}
          onChange={handleUrlChange}
          style={{ width: '100%', marginBottom: '5px' }}
        />
        <input
          type="number"
          placeholder="Duration (secs)"
        //   value={data.duration}
          onChange={handleDurationChange}
          style={{ width: '100%', marginBottom: '5px' }}
        />
      </div>
      {/* Input handle */}
      <Handle type="target" position={Position.Top} id="input" />
      {/* Output handle */}
      <Handle type="source" position={Position.Bottom} id="output" />
    </div>
  );
};

