import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { site } from '../config/site.js'
import cn from '../lib/cn.js'
import { useActiveSection, useScrolled } from '../lib/useActiveSection.js'

export default function Navbar() {
  const scrolled = useScrolled(12)
  const active = useActiveSection()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  const goHome = useCallback(
    (e) => {
      e.preventDefault()
      close()
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (window.location.hash) navigate('/', { replace: true })
        return
      }
      navigate('/')
    },
    [close, navigate, pathname],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  const isActive = (to) => {
    if (to === '/demos') return pathname === '/demos' || pathname.startsWith('/work/')
    if (to === '/') return pathname === '/' && active === 'home'
    if (pathname !== '/') return false
    return active === to.replace('/#', '')
  }

  const onNavClick = (to) => (e) => {
    if (to === '/') {
      goHome(e)
      return
    }
    close()
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-line bg-canvas/80 backdrop-blur-lg'
          : 'bg-transparent',
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          onClick={goHome}
          className="cursor-pointer text-lg font-bold text-ink"
        >
          {site.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex" role="menubar">
          {site.nav.map((link) => (
            <li key={link.to} role="none">
              <Link
                to={link.to}
                role="menuitem"
                onClick={onNavClick(link.to)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive(link.to) ? 'text-accent' : 'text-mute hover:text-ink',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {site.resume?.href && (
            <a
              href={site.resume.href}
              download={site.resume.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-medium text-mute transition-colors hover:text-ink md:inline-flex"
            >
              Resume
            </a>
          )}
          <Link
            to={site.cta.href}
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-accent-strong md:inline-flex"
          >
            {site.cta.label}
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-mute transition-colors hover:text-ink md:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-canvas/95 backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {site.nav.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={onNavClick(link.to)}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive(link.to) ? 'text-accent' : 'text-mute hover:text-ink',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {site.resume?.href && (
              <li>
                <a
                  href={site.resume.href}
                  download={site.resume.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-mute transition-colors hover:text-ink"
                >
                  Resume
                </a>
              </li>
            )}
            <li className="pt-2">
              <Link
                to={site.cta.href}
                onClick={close}
                className="block rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-medium text-canvas transition-colors hover:bg-accent-strong"
              >
                {site.cta.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
