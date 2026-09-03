import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import DemoPreview from '../components/DemoPreview.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import demos, { projectHref } from '../data/projects.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

export default function Demos() {
  const reduced = usePrefersReducedMotion()
  const featured = demos.find((p) => p.featured)
  const others = demos.filter((p) => !p.featured)
  const featuredHref = featured ? projectHref(featured) : ''

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <main className="border-t border-line pt-16">
        <section className="bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              label="Demos"
              title="Products you can walk through end to end."
              subtitle="These are standalone UI demos built into this site. They are not client work or personal GitHub projects."
            />

            {featured && (
              <motion.div className="mb-20" variants={fadeUp} {...motionProps(reduced)}>
                <div className="group relative overflow-hidden rounded-2xl border border-line bg-canvas transition-colors hover:border-accent/20">
                  <DemoPreview
                    src={featuredHref}
                    title={`${featured.name} live preview`}
                    eager
                  />
                  <div className="p-6 lg:p-10">
                    <h3 className="text-2xl font-bold text-ink lg:text-3xl">{featured.name}</h3>
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
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      <ExternalLink size={15} /> Open demo
                    </span>
                  </div>
                  <Link
                    to={featuredHref}
                    className="absolute inset-0 z-10"
                    aria-label={`Open ${featured.name}`}
                  />
                </div>
              </motion.div>
            )}

            <h3 className="mb-8 text-xl font-semibold text-ink">More demos</h3>
            <motion.div
              className="grid gap-6 sm:grid-cols-2"
              variants={stagger}
              {...motionProps(reduced)}
            >
              {others.map((demo) => (
                <motion.div key={demo.name} variants={fadeUp}>
                  <ProjectCard project={demo} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
