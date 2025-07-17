import { BaseEdge, getSmoothStepPath, type EdgeProps } from '@xyflow/react'
import { memo } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../../store/store'

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd = 'url(#arrow)',
  selectedNodeRef,
  selected,
}: EdgeProps & { selectedNodeRef: AppState['ui']['selectedNodeRef'] }) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })
  const isSelected = (selectedNodeRef && 'selection' in selectedNodeRef && selectedNodeRef.selection.edgesIds.includes(id)) || selected

  return (
    <>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="strokeWidth" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="blue" />
        </marker>
      </defs>
      <BaseEdge path={path} markerEnd={markerEnd} style={{ stroke: isSelected ? 'red' : 'blue' }} />
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  selectedNodeRef: state.ui.selectedNodeRef,
})

const mapDispatchToProps = {}

export default memo(connect(mapStateToProps, mapDispatchToProps)(CustomEdge))
