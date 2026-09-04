import { FileDown, Github, Linkedin, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { site } from '../data/portfolio.js'
import cn from '../lib/cn.js'
import { useActiveSection, useScrolled } from '../lib/useActiveSection.js'

const NAV_MAP = {
  '/#work': 'work',
  '/#experience': 'experience',
  '/#skills': 'skills',
  '/#about': 'about',
  '/#contact': 'contact',
}

export default function Navbar() {
  const scrolled = useScrolled(16)
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

  const isActive = (href) => {
    if (pathname !== '/') return false
    return active === NAV_MAP[href]
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={cn(
          'pointer-events-auto mx-auto flex h-[3.6rem] max-w-[1120px] items-center justify-between rounded-2xl px-3 transition-all duration-300 sm:px-4',
          scrolled
            ? 'border border-line bg-canvas/75 shadow-[0_8px_40px_rgb(0_0_0_/_0.35)] backdrop-blur-xl'
            : 'border border-transparent bg-transparent',
        )}
        aria-label="Main navigation"
      >
        <Link
          to="/"
          onClick={goHome}
          className="shrink-0 px-1 text-[15px] font-semibold tracking-tight text-ink"
        >
          {site.name}
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex" role="list">
          {site.nav.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors',
                  isActive(link.href) ? 'text-ink' : 'text-mute hover:text-ink',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden rounded-lg p-2 text-mute transition-colors hover:text-ink sm:inline-flex"
            >
              <Github size={16} />
            </a>
          )}
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden rounded-lg p-2 text-mute transition-colors hover:text-ink sm:inline-flex"
            >
              <Linkedin size={16} />
            </a>
          )}
          {site.resume?.href && (
            <a
              href={site.resume.href}
              download={site.resume.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg px-2 py-2 text-[13px] font-medium text-mute transition-colors hover:text-ink md:inline-flex"
            >
              <FileDown size={14} />
              Resume
            </a>
          )}
          <Link
            to={site.cta.href}
            className="hidden rounded-[10px] bg-cream px-3.5 py-2 text-[13px] font-semibold text-canvas transition-colors hover:bg-ink sm:inline-flex"
          >
            {site.cta.label}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-mute transition-colors hover:text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="pointer-events-auto lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="fixed inset-0 bg-canvas/60 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={close}
          />
          <div className="absolute inset-x-3 top-[4.4rem] rounded-2xl border border-line bg-surface/95 p-3 shadow-[0_20px_60px_rgb(0_0_0_/_0.45)] backdrop-blur-xl sm:inset-x-4">
            <ul className="flex flex-col">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={close}
                    className={cn(
                      'block rounded-xl px-3 py-3 text-sm font-medium',
                      isActive(link.href) ? 'bg-elevated text-ink' : 'text-mute hover:text-ink',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center gap-2 border-t border-line px-2 pt-3">
              {site.github && (
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-mute hover:text-ink"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-mute hover:text-ink"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {site.resume?.href && (
                <a
                  href={site.resume.href}
                  download={site.resume.filename}
                  className="rounded-lg px-2 py-2 text-sm text-mute hover:text-ink"
                >
                  Resume
                </a>
              )}
            </div>
            <Link
              to={site.cta.href}
              onClick={close}
              className="mt-3 block rounded-[10px] bg-cream px-4 py-3 text-center text-sm font-semibold text-canvas"
            >
              {site.cta.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
