import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FlowEditor from './pages/FlowEditor'
import { ROUTE_FLOW_EDITOR, ROUTE_HOME } from './constants'
import useFlowStore from './store/flow.store'
import { useEffect } from 'react'

export default function App() {
  const { initFlows, initLoading } = useFlowStore()

  useEffect(() => {
    initFlows()
  }, [])

  if (initLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index path={ROUTE_HOME} element={<Home />} />
        <Route path={ROUTE_FLOW_EDITOR()} element={<FlowEditor />} />
      </Routes>
    </BrowserRouter>
  )
}
