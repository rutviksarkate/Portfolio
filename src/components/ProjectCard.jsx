function Shot({ src, alt, url }) {
  return (
    <figure className="overflow-hidden bg-canvas">
      <div className="flex items-center gap-2 border-b border-line bg-elevated/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden="true" />
        <span className="ml-2 min-w-0 truncate rounded-md bg-canvas px-2 py-0.5 text-[11px] text-faint">
          {url}
        </span>
      </div>
      <div className="overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </figure>
  )
}

function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-md border border-line bg-canvas/40 px-2 py-0.5 text-[11px] text-mute"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

export default function ProjectCard({ project, reversed = false }) {
  const copy = (
    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-faint">{project.number}</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
          {project.badge}
        </span>
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-faint">{project.category}</p>
      <h3 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mute sm:text-[15px]">{project.description}</p>
      <div className="mt-5">
        <Chips items={project.technologies} />
      </div>
    </div>
  )

  return (
    <article className="group overflow-hidden rounded-[16px] border border-line bg-surface">
      <div className="grid lg:grid-cols-2">
        <div className={reversed ? 'lg:order-2' : undefined}>
          <Shot
            src={project.image}
            url={project.urlLabel}
            alt={`${project.title} interface, independent product concept`}
          />
        </div>
        <div className={reversed ? 'lg:order-1' : ''}>{copy}</div>
      </div>
    </article>
  )
}

export function ProjectGrid({ projects }) {
  return (
    <div className="grid gap-6">
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} reversed={i % 2 === 1} />
      ))}
    </div>
  )
}
