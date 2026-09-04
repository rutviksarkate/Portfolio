import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { scrollToHash } from './lib/hashNav.js'
import Home from './pages/Home.jsx'

const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()
  const didInit = useRef(false)
  const prevPath = useRef(pathname)

  useEffect(() => {
    const pathChanged = prevPath.current !== pathname
    prevPath.current = pathname
    const isFirst = !didInit.current
    didInit.current = true

    if (!isFirst && !pathChanged && navType !== 'POP') return

    const jump = () => {
      if (hash) scrollToHash(hash, 'auto')
      else window.scrollTo(0, 0)
    }
    jump()
    requestAnimationFrame(jump)
  }, [pathname, hash, navType])

  return null
}

function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas text-sm text-mute">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
