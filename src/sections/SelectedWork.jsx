import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { professionalProject } from '../data/portfolio.js'

export default function SelectedWork() {
  const project = professionalProject

  return (
    <section id="work" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          title="Selected Work"
          subtitle="Production experience, then independent product concepts."
        />

        <Reveal>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
            Professional Experience
          </p>
        </Reveal>

        <Reveal>
          <article className="overflow-hidden rounded-[16px] border border-line bg-surface">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/25 bg-accent-dim px-2.5 py-0.5 text-[11px] font-medium text-accent">
                  {project.label}
                </span>
                <span className="text-[12px] text-faint">{project.company}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute sm:text-base">
                {project.description}
              </p>

              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                    Problem
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-mute">
                    {project.caseStudy.problem}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                    Result
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
                    {project.highlight}
                  </dd>
                  <p className="mt-1 text-sm text-mute">{project.caseStudy.result}</p>
                </div>
              </dl>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                  What I worked on
                </p>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {project.caseStudy.workedOn.map((item) => (
                    <li key={item} className="text-sm text-mute">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line px-2 py-0.5 text-[11px] text-mute"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>

        <p className="mt-8 text-sm text-mute">
          Independent product concepts are further down.{' '}
          <a href="#builds" className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
            View independent builds
          </a>
        </p>
      </Container>
    </section>
  )
}
