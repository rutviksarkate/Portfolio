import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import processSteps from '../data/process.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

export default function Process() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="border-t border-line py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading label="Process" title="How I work." />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          {...motionProps(reduced)}
        >
          {processSteps.map((step) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              className="rounded-xl border border-line bg-surface p-6 lg:p-8"
            >
              <span className="text-3xl font-bold text-accent/30">{step.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
