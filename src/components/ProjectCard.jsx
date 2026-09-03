import { ExternalLink, Github } from 'lucide-react'

export default function ProjectCard({ project }) {
  const isEmpty = !project.name

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-accent/20">
      <div className="relative aspect-video overflow-hidden bg-elevated">
        <img
          src={project.image}
          alt={project.name ? `${project.name} screenshot` : 'Project placeholder'}
          loading="lazy"
          width={1200}
          height={675}
          className="image-zoom h-full w-full object-cover"
        />
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center bg-elevated/80">
            <span className="text-sm text-mute">More projects coming soon</span>
          </div>
        )}
      </div>

      {!isEmpty && (
        <div className="flex flex-1 flex-col p-5 lg:p-6">
          <h3 className="mb-1.5 text-lg font-semibold text-ink">{project.name}</h3>
          <p className="mb-4 text-sm leading-relaxed text-mute">
            {project.description}
          </p>
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
          <div className="mt-auto flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-mute transition-colors hover:text-ink"
              >
                <Github size={15} /> GitHub
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
