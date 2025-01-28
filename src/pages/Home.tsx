import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import AddFlowForm from '../components/AppFlowForm'
import useFlowStore, { Flow } from '../store/flow.store'
import { ROUTE_FLOW_EDITOR } from '../constants'
import { FiPlus } from 'react-icons/fi'
import { FiCalendar } from 'react-icons/fi'

export default function Home() {
  const { flows, initLoading } = useFlowStore((state) => ({
    flows: state.flows,
    initLoading: state.initLoading,
  }))
  const [isFlowFormOpen, setIsFlowFormOpen] = useState(false)
  const [editFlow, setEditFlow] = useState<Flow | undefined>(undefined)

  const flowTypes: Flow['type'][] = useMemo(() => {
    return ['campaign', 'nudge', 'validator']
  }, [])

  if (initLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Flow Dashboard</h1>
        <button
          onClick={() => {
            setIsFlowFormOpen(true)
            setEditFlow(undefined)
          }}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center sm:justify-start gap-2 shadow-sm"
        >
          <FiPlus className="h-5 w-5" />
          Add New Flow
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {flowTypes.map((type) => (
          <div key={type} className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 capitalize">{type}s</h2>
            <div className="space-y-3 sm:space-y-4">
              {flows
                .filter((flow) => flow.type === type)
                .map((flow) => (
                  <div className="flex gap-2">
                    <Link
                      key={flow.name}
                      to={ROUTE_FLOW_EDITOR(flow.name)}
                      className="flex-1 block p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200"
                    >
                      <div className="font-medium text-gray-900 mb-2 break-words">{flow.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FiCalendar className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{new Date(flow.createdAt).toLocaleDateString()}</span>
                      </div>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setEditFlow(flow);
                        setIsFlowFormOpen(true);
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              {flows.filter((flow) => flow.type === type).length === 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-500">No {type}s created yet</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <AddFlowForm
        initialData={editFlow}
        isOpen={isFlowFormOpen}
        onClose={() => {
          setIsFlowFormOpen(false)
        }}
      />
    </div>
  )
}
