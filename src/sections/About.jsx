import { FileDown, Github, Linkedin } from 'lucide-react'
import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/portfolio.js'

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-surface/40 py-20 lg:py-28">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal>
            <div
              className="grid h-24 w-24 place-items-center rounded-2xl border border-line bg-elevated text-3xl font-semibold text-ink sm:h-28 sm:w-28"
              aria-hidden="true"
            >
              {site.shortName}
            </div>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {site.about.heading}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              {site.about.body.map((p) => (
                <Reveal key={p.slice(0, 24)}>
                  <p className="text-base leading-relaxed text-mute">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap gap-4">
                {site.github && (
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ink"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
                {site.linkedin && (
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ink"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                )}
                {site.resume?.href && (
                  <a
                    href={site.resume.href}
                    download={site.resume.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ink"
                  >
                    <FileDown size={16} />
                    Resume
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
