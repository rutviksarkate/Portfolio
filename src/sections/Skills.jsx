import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import SkillBadge from '../components/SkillBadge.jsx'
import skills from '../data/skills.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

export default function Skills() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="skills" className="border-t border-line py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading label="Skills" title="Technologies I work with." />

        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          {...motionProps(reduced)}
        >
          {skills.map((group) => (
            <motion.div key={group.category} variants={fadeUp}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <SkillBadge key={skill} label={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
