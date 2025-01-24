import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FlowEditor from './pages/FlowEditor'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flow/:flowId" element={<FlowEditor />} />
      </Routes>
    </BrowserRouter>
  )
}
