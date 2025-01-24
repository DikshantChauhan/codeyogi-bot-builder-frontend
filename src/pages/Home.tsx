import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FlowMeta } from '../models/FlowMeta'
import AddFlowForm from '../components/AppFlowForm'
import { useFlows } from '../hooks/useFlows'

export default function Home() {
  const { flowsMeta, loading, error, addFlow } = useFlows()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddFlow = async (newFlow: Omit<FlowMeta, 'createdAt'>) => {
    await addFlow(newFlow)
    setIsModalOpen(false)
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Flow Dashboard</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add New Flow
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Campaigns</h2>
          <div className="space-y-4">
            {flowsMeta
              .filter((flow) => flow.type === 'campaign')
              .map((flow) => (
                <Link key={flow.name} to={`/flow/${flow.name}`} className="block p-4 border rounded-lg hover:bg-gray-50">
                  <div className="font-medium">{flow.name}</div>
                  <div className="text-sm text-gray-500">Created: {new Date(flow.createdAt).toLocaleDateString()}</div>
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Nudges</h2>
          <div className="space-y-4">
            {flowsMeta
              .filter((flow) => flow.type === 'nudge')
              .map((flow) => (
                <Link key={flow.name} to={`/flow/${flow.name}`} className="block p-4 border rounded-lg hover:bg-gray-50">
                  <div className="font-medium">{flow.name}</div>
                  <div className="text-sm text-gray-500">Created: {new Date(flow.createdAt).toLocaleDateString()}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <AddFlowForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddFlow} />
    </div>
  )
}
