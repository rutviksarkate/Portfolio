import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../components/Button.jsx'
import { site } from '../config/site.js'
import capabilities from '../data/capabilities.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const { hero } = site

  return (
    <section
      id="home"
      className="bg-grid relative flex min-h-[100dvh] items-center overflow-hidden pt-16"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={stagger}
          {...motionProps(reduced)}
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-block rounded-full border border-line bg-elevated px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.15]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg"
          >
            {hero.supporting}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm font-medium text-mute/70"
          >
            {hero.techLine.join(' • ')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
              <ArrowRight size={16} />
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          {site.availability && (
            <motion.p
              variants={fadeUp}
              className="mt-8 text-sm text-mute"
            >
              {site.availability}
            </motion.p>
          )}
        </motion.div>

        {/* Capability strip */}
        <motion.div
          className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-3 lg:mt-28"
          variants={stagger}
          {...motionProps(reduced)}
        >
          {capabilities.map((cap) => (
            <motion.span
              key={cap}
              variants={fadeUp}
              className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-mute sm:text-sm"
            >
              {cap}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas to-transparent" />
    </section>
  )
}
