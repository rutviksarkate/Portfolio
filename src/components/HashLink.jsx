import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getHash, scrollToHash } from '../lib/hashNav.js'

function isModifiedClick(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0
}

export default function HashLink({ to, onClick, children, ...rest }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const hash = getHash(to)

  return (
    <Link
      to={to}
      {...rest}
      preventScrollReset
      onClick={(e) => {
        onClick?.(e)
        if (!hash || e.defaultPrevented || isModifiedClick(e)) return
        e.preventDefault()
        if (pathname !== '/') {
          navigate(to)
          return
        }
        scrollToHash(hash)
        if (window.location.hash !== hash) {
          navigate(to, { preventScrollReset: true })
        }
      }}
    >
      {children}
    </Link>
  )
}
