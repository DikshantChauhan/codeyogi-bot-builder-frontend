import { BaseEdge, getSmoothStepPath, type EdgeProps } from '@xyflow/react'
import { memo } from 'react'

function CustomEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd = 'url(#arrow)', selected }: EdgeProps) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="strokeWidth" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="blue" />
        </marker>
      </defs>
      <BaseEdge path={path} markerEnd={markerEnd} style={{ stroke: selected ? 'red' : 'blue' }} />
    </>
  )
}

export default memo(CustomEdge)
