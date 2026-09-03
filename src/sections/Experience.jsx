import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import experience from '../data/experience.js'
import { fadeUp, motionProps, stagger, usePrefersReducedMotion } from '../lib/useMotion.js'

export default function Experience() {
  const reduced = usePrefersReducedMotion()
  const visible = experience.filter((e) => e.show)

  return (
    <section id="experience" className="border-t border-line py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading label="Experience" title="Professional experience." />

        <motion.div
          className="relative ml-4 border-l border-line pl-8 lg:ml-8 lg:pl-12"
          variants={stagger}
          {...motionProps(reduced)}
        >
          {visible.map((exp) => (
            <motion.div
              key={exp.id}
              variants={fadeUp}
              className="relative mb-14 last:mb-0"
            >
              <div className="absolute -left-[calc(2rem+7px)] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-accent bg-canvas lg:-left-[calc(3rem+7px)]">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                <h3 className="text-lg font-semibold text-ink">{exp.role}</h3>
                {exp.current && (
                  <span className="w-fit rounded-full bg-accent-dim px-2.5 py-0.5 text-xs font-medium text-accent">
                    Current
                  </span>
                )}
              </div>
              {exp.company && (
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-mute">
                  <Briefcase size={14} className="shrink-0" />
                  {exp.company}
                </p>
              )}
              {exp.period && (
                <p className="mt-0.5 text-sm text-mute/60">{exp.period}</p>
              )}

              <ul className="mt-4 space-y-2">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="text-sm leading-relaxed text-mute">
                    <span className="mr-2 text-accent/60">—</span>
                    {h}
                  </li>
                ))}
              </ul>

              {exp.achievement && (
                <div className="mt-4 rounded-lg border border-accent/15 bg-accent-dim p-4 text-sm leading-relaxed text-ink/80">
                  {exp.achievement}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
