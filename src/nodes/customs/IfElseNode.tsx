import { IfElseNode } from "../types";
import { Handle, NodeProps, Position } from "@xyflow/react";

export default ({}: NodeProps<IfElseNode>) => {    
      return (
        <div
          style={{
            padding: '10px',
            border: '1px solid black',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
            width: '150px',
          }}
        >
          <strong>If-Else Node</strong>
          <div style={{ margin: '10px 0' }}>
            Condition: <br />
            <input
              type="text"
              placeholder="Enter condition"
              style={{ width: '100%' }}
            />
          </div>
          {/* Input handle */}
          <Handle type="target" position={Position.Top} id="input" />
          {/* Output handles */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Handle type="source" position={Position.Bottom} id="true" style={{ left: '30%' }} />
            <span style={{ position: 'absolute', bottom: '-15px', left: '20%' }}>True</span>
            <Handle type="source" position={Position.Bottom} id="false" style={{ right: '30%' }} />
            <span style={{ position: 'absolute', bottom: '-15px', right: '20%' }}>False</span>
          </div>
        </div>
      );
};
