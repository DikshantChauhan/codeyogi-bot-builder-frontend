import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react'

function CustomEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd = 'url(#arrow)' }: EdgeProps) {
  const [path] = getBezierPath({
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
      <BaseEdge path={path} markerEnd={markerEnd} />
    </>
  )
}

export default CustomEdge
