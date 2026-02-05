import { FC, memo, useEffect, useState } from 'react'
import { CiSaveDown2 } from 'react-icons/ci'
import { FiAlertTriangle } from 'react-icons/fi'
import { fetchFlowAPI } from '../api/api'
import { AppNode } from '../models/Node.model'

interface RemovedNode {
  id: string
  type: string
}

interface FlowSavePopupProps {
  isOpen: boolean
  onClose: () => void
  onSave: (forceUpdateMedias: boolean) => void
  flowId: string
  currentNodes: AppNode[]
  loading?: boolean
}

const FlowSavePopup: FC<FlowSavePopupProps> = ({ isOpen, onClose, onSave, flowId, currentNodes, loading = false }) => {
  const [removedNodes, setRemovedNodes] = useState<RemovedNode[]>([])
  const [isComparing, setIsComparing] = useState(false)
  const [comparisonError, setComparisonError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setRemovedNodes([])
      setComparisonError(null)
      return
    }

    const compareFlows = async () => {
      setIsComparing(true)
      setComparisonError(null)

      try {
        const savedFlow = await fetchFlowAPI(flowId)
        const currentNodeIds = new Set(currentNodes.map((node) => node.id))

        const removed: RemovedNode[] = savedFlow.data.nodes
          .filter((node) => !currentNodeIds.has(node.id))
          .map((node) => ({
            id: node.id,
            type: node.type || 'unknown',
          }))

        setRemovedNodes(removed)
      } catch (error) {
        console.error('Failed to fetch saved flow:', error)
        setComparisonError('Failed to compare with saved flow')
      } finally {
        setIsComparing(false)
      }
    }

    compareFlows()
  }, [isOpen, flowId, currentNodes])

  if (!isOpen) return null

  const formatNodeType = (type: string) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <CiSaveDown2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-1">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Save Flow</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Do you want to force update all media files as well?</p>
                </div>

                {isComparing && (
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Comparing with saved flow...
                  </div>
                )}

                {comparisonError && <div className="mt-3 text-sm text-red-500">{comparisonError}</div>}

                {!isComparing && removedNodes.length > 0 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="flex items-start">
                      <FiAlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">
                          {removedNodes.length} node{removedNodes.length > 1 ? 's' : ''} will be removed
                        </p>
                        <p className="text-xs text-amber-700 mt-1">Users at these nodes will be moved to the start node:</p>
                        <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                          {removedNodes.map((node) => (
                            <li key={node.id} className="text-xs text-amber-700 flex items-center">
                              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                              <span className="font-mono bg-amber-100 px-1 rounded">{node.id}</span>
                              <span className="mx-1">-</span>
                              <span className="text-amber-600">{formatNodeType(node.type)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onSave(true)}
              disabled={loading || isComparing}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save & Update Medias'
              )}
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onSave(false)}
              disabled={loading || isComparing}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Only'
              )}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 sm:mt-0 sm:w-auto"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(FlowSavePopup)
