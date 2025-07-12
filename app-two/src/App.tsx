import { Route, Routes } from 'react-router'
import Home from './components/Home'
import Canvas from './components/canvas/Canvas'
import Playground from './components/playground/Playground'

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Playground />} />
      <Route path="/home" element={<Home />} />
      <Route path="/canvas" element={<Canvas />} />
    </Routes>
  )
}

export default App
