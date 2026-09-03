import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import demos, { projectHref } from '../data/projects.js'
import { fadeUp, motionProps, usePrefersReducedMotion } from '../lib/useMotion.js'
import { motion } from 'framer-motion'

export default function DemosRow() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="border-t border-line bg-canvas py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          className="mb-8 flex items-end justify-between gap-4"
          variants={fadeUp}
          {...motionProps(reduced)}
        >
          <div>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
              Demos
            </span>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Try a product walkthrough.</h2>
          </div>
          <Link
            to="/demos"
            className="mb-0.5 inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent hover:text-accent-strong"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="demo-row flex gap-4 overflow-x-auto px-5 pb-3 snap-x snap-mandatory lg:px-8">
          {demos.map((demo) => (
            <Link
              key={demo.name}
              to={projectHref(demo)}
              className="group w-56 shrink-0 cursor-pointer snap-start sm:w-64"
            >
              <div className="overflow-hidden rounded-xl border border-line bg-surface transition-colors group-hover:border-accent/30">
                <div className="aspect-[16/10] overflow-hidden bg-elevated">
                  <img
                    src={demo.image}
                    alt=""
                    className="image-zoom h-full w-full object-cover"
                  />
                </div>
                <div className="px-3 py-3">
                  <h3 className="truncate text-sm font-semibold text-ink">{demo.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mute">
                    {demo.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
