import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Demos from './pages/Demos.jsx'
import Home from './pages/Home.jsx'
import WorkDemo from './pages/WorkDemo.jsx'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const node = document.querySelector(hash)
      if (node) {
        const jump = () => node.scrollIntoView()
        jump()
        requestAnimationFrame(jump)
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demos" element={<Demos />} />
        <Route path="/work/:slug/:itemId" element={<WorkDemo />} />
        <Route path="/work/:slug" element={<WorkDemo />} />
      </Routes>
    </BrowserRouter>
  )
}
