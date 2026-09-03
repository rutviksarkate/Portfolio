import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projectHref } from '../data/projects.js'
import DemoPreview from './DemoPreview.jsx'

export default function ProjectCard({ project }) {
  const href = projectHref(project)

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-accent/20">
      <DemoPreview src={href} title={`${project.name} live preview`} />
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="mb-1.5 text-lg font-semibold text-ink">{project.name}</h3>
        <p className="mb-4 text-sm leading-relaxed text-mute">{project.description}</p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-md bg-accent-dim px-2 py-0.5 text-xs font-medium text-accent"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          <ExternalLink size={15} /> Open demo
        </span>
      </div>
      <Link
        to={href}
        className="absolute inset-0 z-10"
        aria-label={`Open ${project.name}`}
      />
    </div>
  )
}
