import { memo, useState } from "react"
import { FlowMeta } from "../models/FlowMeta"
import { nodesUIMeta, NodeTypeKeys } from "../nodes"

interface AddFlowFormProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (flow: Omit<FlowMeta, 'createdAt'>) => void
}

function AddFlowForm({ isOpen, onClose, onAdd }: AddFlowFormProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState<'campaign' | 'nudge'>('campaign')
  const [selectedNodes, setSelectedNodes] = useState<NodeTypeKeys[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name,
      type,
      nodes: selectedNodes,
    })
    setName('')
    setType('campaign')
    setSelectedNodes([])
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">Add New Flow</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded p-2" required />
            </div>
            <div>
              <label className="block mb-1">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as 'campaign' | 'nudge')} className="w-full border rounded p-2">
                <option value="campaign">Campaign</option>
                <option value="nudge">Nudge</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Nodes</label>
              <div className="border rounded p-2 max-h-40 overflow-y-auto">
                {Object.entries(nodesUIMeta).map(([key, meta]) => (
                  <label key={key} className="flex items-center p-1">
                    <input
                      type="checkbox"
                      checked={selectedNodes.includes(key as NodeTypeKeys)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedNodes([...selectedNodes, key as NodeTypeKeys])
                        } else {
                          setSelectedNodes(selectedNodes.filter((n) => n !== key))
                        }
                      }}
                      className="mr-2"
                    />
                    {meta.title}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Create Flow
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(AddFlowForm)
