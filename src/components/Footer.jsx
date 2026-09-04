import { FileDown, Github, Linkedin, Mail } from 'lucide-react'
import { site } from '../data/portfolio.js'
import Container from './Container.jsx'
import HashLink from './HashLink.jsx'

const footerNav = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="text-base font-semibold tracking-tight text-ink">{site.name}</p>
            <p className="mt-1 text-sm text-mute">{site.title}</p>
            <p className="mt-4 text-sm leading-relaxed text-faint">{site.footer.line}</p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
                Navigate
              </p>
              <ul className="space-y-2">
                {footerNav.map((link) => (
                  <li key={link.href}>
                    <HashLink
                      to={link.href}
                      className="text-sm text-mute transition-colors hover:text-ink"
                    >
                      {link.label}
                    </HashLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
                Connect
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ink"
                  >
                    <Mail size={14} />
                    {site.email}
                  </a>
                </li>
                {site.github && (
                  <li>
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ink"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                  </li>
                )}
                {site.linkedin && (
                  <li>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ink"
                    >
                      <Linkedin size={14} />
                      LinkedIn
                    </a>
                  </li>
                )}
                {site.resume?.href && (
                  <li>
                    <a
                      href={site.resume.href}
                      download={site.resume.filename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ink"
                    >
                      <FileDown size={14} />
                      Resume
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-faint">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
