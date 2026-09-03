import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import Button from '../components/Button.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import projects from '../data/projects.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

export default function Projects() {
  const reduced = usePrefersReducedMotion()
  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          label="Projects"
          title="Selected work."
          subtitle="Real products and systems I've designed, developed and shipped."
        />

        {/* Featured project */}
        {featured && (
          <motion.div
            className="mb-20"
            variants={fadeUp}
            {...motionProps(reduced)}
          >
            <div className="group overflow-hidden rounded-2xl border border-line bg-canvas">
              <div className="relative aspect-video overflow-hidden bg-elevated">
                <img
                  src={featured.image}
                  alt={`${featured.name} screenshot`}
                  loading="eager"
                  width={1200}
                  height={675}
                  className="image-zoom h-full w-full object-cover"
                />
              </div>
              <div className="p-6 lg:p-10">
                <h3 className="text-2xl font-bold text-ink lg:text-3xl">
                  {featured.name}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-mute">
                  {featured.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-accent-dim px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {featured.features && (
                  <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {featured.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-lg border border-line bg-surface px-3 py-2 text-xs text-mute"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  {featured.liveUrl && (
                    <Button
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </Button>
                  )}
                  {featured.githubUrl && (
                    <Button
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                    >
                      <Github size={15} /> GitHub
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other projects */}
        <h3 className="mb-8 text-xl font-semibold text-ink">Other Projects</h3>
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={stagger}
          {...motionProps(reduced)}
        >
          {others.map((project, i) => (
            <motion.div key={project.name || `placeholder-${i}`} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
