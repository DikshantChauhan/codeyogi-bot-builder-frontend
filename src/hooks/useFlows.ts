import { useState, useEffect } from 'react'
import { FlowMeta } from '../models/FlowMeta'
import { flowsApi } from '../api/flows'

export function useFlows() {
  const [flowsMeta, setFlowsMeta] = useState<FlowMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadFlows()
  }, [])

  const loadFlows = async () => {
    try {
      const data = await flowsApi.listFlows()
      setFlowsMeta(data)
      setError(null)
    } catch (err) {
      setError('Failed to load flows')
    } finally {
      setLoading(false)
    }
  }

  const addFlow = async (newFlow: Omit<FlowMeta, 'createdAt'>) => {
    try {
      const flow = await flowsApi.addFlow(newFlow)
      setFlowsMeta((prevFlows) => [flow, ...prevFlows])
      return flow
    } catch (err) {
      setError('Failed to add flow')
      throw err
    }
  }

  const deleteFlow = async (name: string) => {
    try {
      await flowsApi.deleteFlow(name)
      setFlowsMeta((prevFlows) => prevFlows.filter((flow) => flow.name !== name))
    } catch (err) {
      setError('Failed to delete flow')
      throw err
    }
  }

  return {
    flowsMeta,
    loading,
    error,
    addFlow,
    deleteFlow,
    refreshFlows: loadFlows,
  }
}
