import { ArrowUp, FileDown, Github, Linkedin, Mail, Phone } from 'lucide-react'
import { site } from '../config/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between lg:px-8">
        <p className="text-sm text-mute">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="text-mute transition-colors hover:text-accent"
            >
              <Mail size={18} />
            </a>
          )}
          {site.phone && (
            <a
              href={site.phoneHref}
              aria-label="Phone"
              className="text-mute transition-colors hover:text-accent"
            >
              <Phone size={18} />
            </a>
          )}
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-mute transition-colors hover:text-accent"
            >
              <Github size={18} />
            </a>
          )}
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-mute transition-colors hover:text-accent"
            >
              <Linkedin size={18} />
            </a>
          )}
          {site.resume?.href && (
            <a
              href={site.resume.href}
              download={site.resume.filename}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={site.resume.label}
              className="text-mute transition-colors hover:text-accent"
            >
              <FileDown size={18} />
            </a>
          )}

          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-line text-mute transition-colors hover:border-accent/40 hover:text-accent"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
