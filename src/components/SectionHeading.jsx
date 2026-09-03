import { motion } from 'framer-motion'
import { fadeUp, motionProps, usePrefersReducedMotion } from '../lib/useMotion.js'

export default function SectionHeading({ label, title, subtitle }) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      className="mb-14 max-w-2xl lg:mb-20"
      variants={fadeUp}
      {...motionProps(reduced)}
    >
      {label && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          {label}
        </span>
      )}
      <h2 className="text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-mute lg:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
