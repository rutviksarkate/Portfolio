import { experience } from '../data/portfolio.js'
import Reveal from './Reveal.jsx'

export default function ExperienceTimeline() {
  return (
    <div className="relative">
      <div className="absolute bottom-2 left-[11px] top-2 w-px bg-line sm:left-[15px]" aria-hidden="true" />
      <div className="space-y-10">
        {experience.map((job, i) => (
          <Reveal key={job.id} delay={i * 0.05} className="relative pl-10 sm:pl-12">
            <span
              className={`absolute left-0 top-1.5 h-[23px] w-[23px] rounded-full border bg-canvas sm:h-[31px] sm:w-[31px] ${
                job.current ? 'border-accent' : 'border-line'
              }`}
              aria-hidden="true"
            >
              <span
                className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-2 sm:w-2 ${
                  job.current ? 'bg-accent' : 'bg-mute'
                }`}
              />
            </span>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold tracking-tight text-ink">{job.role}</h3>
              {job.current && (
                <span className="rounded-full bg-accent-dim px-2 py-0.5 text-[11px] font-medium text-accent">
                  Current
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-ink/80">{job.company}</p>
            <p className="mt-0.5 text-sm text-faint">{job.period}</p>

            <ul className="mt-4 space-y-2">
              {job.highlights.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-mute">
                  {item}
                </li>
              ))}
            </ul>

            {job.achievement && (
              <p className="mt-4 rounded-xl border border-accent/20 bg-accent-dim px-4 py-3 text-sm leading-relaxed text-ink">
                {job.achievement}
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  )
}
